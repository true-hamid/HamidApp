import type {FeatureLoader} from './featureTypes';

// Replaced at build time by babel/featuresPlugin.js using ./features.json.
declare const __FEATURE_LOADERS__: FeatureLoader[];

export const featureLoaders: FeatureLoader[] = __FEATURE_LOADERS__;
