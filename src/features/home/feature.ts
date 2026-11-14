import type {FeatureModule} from '@registry/featureTypes';

const home: FeatureModule = {
  i18n: () => require('./i18n').default,
  screens: [
    {
      name: 'Home',
      navigator: 'mainDashboard.tabs',
      tab: {index: 0, icon: 'home', labelKey: 'nav.home'},
      getComponent: () => require('./HomeScreen').default,
    },
    {
      name: 'Showcase',
      navigator: 'postLogin.stack',
      titleKey: 'nav.showcase',
      getComponent: () => require('./ShowcaseScreen').default,
    },
  ],
};

export default home;
