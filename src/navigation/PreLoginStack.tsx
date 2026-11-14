import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../features/login/LoginScreen';
import type {PreLoginStackParamList} from './types';

const Stack = createNativeStackNavigator<PreLoginStackParamList>();

function PreLoginStack(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default PreLoginStack;
