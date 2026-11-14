import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import HomeScreen from '../features/home/HomeScreen';
import AboutScreen from '../features/about/AboutScreen';
import SkillsScreen from '../features/skills/SkillsScreen';
import ExperienceScreen from '../features/experience/ExperienceScreen';
import ContactScreen from '../features/contact/ContactScreen';
import type {PostLoginTabParamList} from './types';

const Tab = createBottomTabNavigator<PostLoginTabParamList>();

const TAB_ICONS: Record<keyof PostLoginTabParamList, string> = {
  Home: 'home',
  About: 'person',
  Skills: 'construct',
  Experience: 'briefcase',
  Contact: 'mail',
};

const TAB_LABEL_KEYS: Record<keyof PostLoginTabParamList, string> = {
  Home: 'nav.home',
  About: 'nav.about',
  Skills: 'nav.skills',
  Experience: 'nav.experience',
  Contact: 'nav.contact',
};

function PostLoginTabs(): React.JSX.Element {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        const routeName = route.name as keyof PostLoginTabParamList;
        return {
          headerTitleAlign: 'center',
          title: t(TAB_LABEL_KEYS[routeName]),
          tabBarIcon: ({color, size, focused}) => {
            const iconName = TAB_ICONS[routeName];
            return (
              <Icon
                name={focused ? iconName : `${iconName}-outline`}
                color={color}
                size={size}
              />
            );
          },
        };
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="Experience" component={ExperienceScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
}

export default PostLoginTabs;
