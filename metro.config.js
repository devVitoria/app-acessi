const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// 👇 SVG TRANSFORMER
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);

// 👇 REMOVE SVG DE assets e trata como source
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");

module.exports = withNativeWind(config, { input: './global.css' });