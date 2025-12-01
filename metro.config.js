/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  configureMetroForWDK,
} = require('@tetherto/wdk-react-native-provider/metro-polyfills');

module.exports = (async () => {
  // Load the default metro configuration
  const defaultConfig = await getDefaultConfig(__dirname);

  // Apply WDK polyfills
  const wdkConfig = configureMetroForWDK(defaultConfig);

  // Extract ext lists after WDK config
  const { assetExts, sourceExts } = wdkConfig.resolver;

  // Your added SVG transformer & resolver setup
  const customConfig = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };

  // Merge all configs
  return mergeConfig(wdkConfig, customConfig);
})();
