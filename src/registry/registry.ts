import i18next from 'i18next';

import type {
  FeatureLoader,
  FeatureModule,
  FeatureScreen,
  StackScreen,
  TabScreen,
} from './featureTypes';
import type {StackNavigatorId, TabNavigatorId} from '@navigation/navigators';

const registry = new Map<string, FeatureModule>();
const registeredNamespaces = new Set<string>();

/**
 * Wraps every screen loader so the feature's lazy resources (currently its
 * translations, registered as a namespace) are set up right before the first
 * of its screens is required.
 */
function withLazyLoad(id: string, feature: FeatureModule): FeatureModule {
  const {i18n} = feature;
  if (!i18n) {
    return feature;
  }
  const ensureNamespace = () => {
    if (!registeredNamespaces.has(id)) {
      Object.entries(i18n()).forEach(([lng, resources]) => {
        i18next.addResourceBundle(lng, id, resources, true, true);
      });
      registeredNamespaces.add(id);
    }
  };
  return {
    ...feature,
    screens: feature.screens.map(screen => ({
      ...screen,
      getComponent: () => {
        ensureNamespace();
        return screen.getComponent();
      },
    })),
  } as FeatureModule;
}

/**
 * Evaluates the given loaders and registers their manifests. Idempotent per
 * feature id (folder name); registration order follows the loader order.
 */
export function loadFeatures(loaders: FeatureLoader[]): void {
  loaders.forEach(({id, load}) => {
    registry.set(id, withLazyLoad(id, load()));
  });
}

function allScreens(): FeatureScreen[] {
  return [...registry.values()].flatMap(feature => feature.screens);
}

/** Tab screens of a tab navigator, sorted by `tab.index`. Throws on duplicate indexes. */
export function getTabScreens(id: TabNavigatorId): TabScreen[] {
  const screens = allScreens()
    .filter((s): s is TabScreen => s.navigator === id)
    .sort((a, b) => a.tab.index - b.tab.index);
  screens.forEach((screen, i) => {
    const prev = screens[i - 1];
    if (prev && prev.tab.index === screen.tab.index) {
      throw new Error(
        `"${id}": screens "${prev.name}" and "${screen.name}" share tab.index ${screen.tab.index}`,
      );
    }
  });
  return screens;
}

/** Screens of a stack navigator. */
export function getStackScreens(id: StackNavigatorId): StackScreen[] {
  return allScreens().filter((s): s is StackScreen => s.navigator === id);
}

/** For tests. */
export function resetRegistry(): void {
  registry.clear();
  registeredNamespaces.clear();
}
