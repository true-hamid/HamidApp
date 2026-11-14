import React, {useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthProvider, useAuth} from './AuthContext';
import PreLoginStack from './PreLoginStack';
import PostLoginStack from './PostLoginStack';
import {loadFeatures} from '@registry/registry';
import type {FeatureLoader} from '@registry/featureTypes';

type Props = {
  featureLoaders: FeatureLoader[];
};

function Navigation({featureLoaders}: Props): React.JSX.Element {
  const {isLoggedIn} = useAuth();

  // Manifests are evaluated once so each feature can declare its screens; the
  // screens they point to stay lazy.
  useMemo(() => loadFeatures(featureLoaders), [featureLoaders]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <PostLoginStack /> : <PreLoginStack />}
    </NavigationContainer>
  );
}

function RootNavigator({featureLoaders}: Props): React.JSX.Element {
  return (
    <AuthProvider>
      <Navigation featureLoaders={featureLoaders} />
    </AuthProvider>
  );
}

export default RootNavigator;
