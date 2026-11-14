const path = require('path');

// One alias per folder under src/, except `features` (feature code is only
// reached through the registry). Keep the `paths` in tsconfig.json in sync.
const aliases = {
  '@i18n': './src/i18n',
  '@navigation': './src/navigation',
  '@registry': './src/registry',
  '@shared': './src/shared',
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {root: ['.'], cwd: __dirname, alias: aliases}],
    [
      require('./babel/featuresPlugin'),
      {
        root: __dirname,
        configPath: path.join(__dirname, 'src/registry/features.json'),
      },
    ],
  ],
};
