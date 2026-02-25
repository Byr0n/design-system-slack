const { getDefaultConfig } = require('expo/metro-config');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');
const path = require('path');

const config = getDefaultConfig(__dirname);

module.exports = withStorybook(config, {
  // Storybook config lives in .rnstorybook/
  configPath: path.resolve(__dirname, './.rnstorybook'),
  // Only enable when EXPO_PUBLIC_STORYBOOK=true — keeps it out of the production bundle
  enabled: process.env.EXPO_PUBLIC_STORYBOOK === 'true',
});
