import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import common from '@shared/i18n';
import login from '../features/login/i18n';
import about from '../features/about/i18n';
import skills from '../features/skills/i18n';
import experience from '../features/experience/i18n';
import contact from '../features/contact/i18n';

export const SUPPORTED_LANGUAGES = [
  {code: 'en', labelKey: 'languages.en'},
  {code: 'ar', labelKey: 'languages.ar'},
] as const;

const features = {common, login, about, skills, experience, contact};
const languages = ['en', 'ar'] as const;

const resources = Object.fromEntries(
  languages.map(lng => [
    lng,
    Object.fromEntries(
      Object.entries(features).map(([ns, bundles]) => [ns, bundles[lng]]),
    ),
  ]),
);

i18n.use(initReactI18next).init({
  resources,
  // The native RTL flag survives restarts, so it doubles as the stored language.
  lng: I18nManager.isRTL ? 'ar' : 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: Object.keys(features),
  interpolation: {
    escapeValue: false,
  },
});

console.log('i18n initialized with language:', i18n.store.data);

/**
 * Switches language. RTL is a native layout setting that only applies after a
 * restart, so when the direction changes we force it and restart the app.
 */
export function changeLanguage(code: string): void {
  if (code === i18n.language) {
    return;
  }
  const shouldBeRTL = code === 'ar';
  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
    RNRestart.restart();
    return;
  }
  i18n.changeLanguage(code);
}

export default i18n;
