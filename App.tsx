/**
 * @format
 */

import React from 'react';

import '@i18n';
import {featureLoaders} from '@registry/featureLoaders';
import RootNavigator from '@navigation/RootNavigator';

function App(): React.JSX.Element {
  return <RootNavigator featureLoaders={featureLoaders} />;
}

export default App;
