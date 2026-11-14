import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {ParamListBase} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {getTabScreens} from '@registry/registry';

const Tab = createBottomTabNavigator<ParamListBase>();

// Tabs not yet migrated to a manifest; their icon and label live here.
type LegacyTab = 'About' | 'Skills' | 'Experience' | 'Contact';

const TAB_ICONS: Record<LegacyTab, string> = {
  About: 'person',
  Skills: 'construct',
  Experience: 'briefcase',
  Contact: 'mail',
};

const TAB_LABEL_KEYS: Record<LegacyTab, string> = {
  About: 'nav.about',
  Skills: 'nav.skills',
  Experience: 'nav.experience',
  Contact: 'nav.contact',
};

// Defined outside the component so the render function isn't created in render.
const tabIcon =
  (iconName: string) =>
  ({color, size, focused}: {color: string; size: number; focused: boolean}) => (
    <Icon
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={size}
    />
  );

function PostLoginTabs(): React.JSX.Element {
  const {t} = useTranslation();
  // Tabs contributed by features for this navigator, sorted by `tab.index`.
  const featureTabs = getTabScreens('mainDashboard.tabs');

  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        const routeName = route.name as LegacyTab;
        const featureTab = featureTabs.find(s => s.name === route.name)?.tab;
        return {
          headerTitleAlign: 'center',
          title: t(featureTab?.labelKey ?? TAB_LABEL_KEYS[routeName]),
          tabBarIcon: tabIcon(featureTab?.icon ?? TAB_ICONS[routeName]),
        };
      }}>
      {/* Migrated features (from features.json via the registry). */}
      {featureTabs.map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          getComponent={screen.getComponent}
        />
      ))}
      {/* Not yet migrated: still hardcoded. */}
      <Tab.Screen
        name="About"
        getComponent={() => require('../features/about/AboutScreen').default}
      />
      <Tab.Screen
        name="Skills"
        getComponent={() => require('../features/skills/SkillsScreen').default}
      />
      <Tab.Screen
        name="Experience"
        getComponent={() => require('../features/experience/ExperienceScreen').default}
      />
      <Tab.Screen
        name="Contact"
        getComponent={() => require('../features/contact/ContactScreen').default}
      />
    </Tab.Navigator>
  );
}

export default PostLoginTabs;
