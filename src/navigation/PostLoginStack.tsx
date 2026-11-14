import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {ParamListBase} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import PostLoginTabs from './PostLoginTabs';
import {getStackScreens} from '@registry/registry';

const Stack = createNativeStackNavigator<ParamListBase>();

/**
 * Post-login root: the tab navigator plus every feature screen attached to
 * `postLogin.stack` (pushed on top of the tabs).
 */
function PostLoginStack(): React.JSX.Element {
  const {t} = useTranslation();
  const pushedScreens = getStackScreens('postLogin.stack');

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={PostLoginTabs}
        options={{headerShown: false}}
      />
      {pushedScreens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          getComponent={screen.getComponent}
          options={{
            title: screen.titleKey ? t(screen.titleKey) : screen.name,
            headerTitleAlign: 'center',
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

export default PostLoginStack;
