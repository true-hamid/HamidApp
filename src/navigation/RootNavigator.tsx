import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthProvider, useAuth} from './AuthContext';
import PreLoginStack from './PreLoginStack';
import PostLoginTabs from './PostLoginTabs';

function Navigation(): React.JSX.Element {
  const {isLoggedIn} = useAuth();

  return (
    <NavigationContainer>
      {isLoggedIn ? <PostLoginTabs /> : <PreLoginStack />}
    </NavigationContainer>
  );
}

function RootNavigator(): React.JSX.Element {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default RootNavigator;
