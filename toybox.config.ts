import type { Config } from './src/public';

const config: Config = {
  eagerLoading: false,
  storyPath: 'src/webapp',
  wrapperComponent: {
    path: '.toybox/Wrapper.tsx',
    componentName: 'Wrapper'
  },
  title: 'Toybox',
  emojiIcon: '🐒',
  snapshotWrapperFile: '.toybox/SnappshotWrapper.tsx',
}

module.exports = config;
