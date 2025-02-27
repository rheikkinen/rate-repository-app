const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(path.resolve());

defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;
