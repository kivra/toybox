import type { Config } from 'toybox';

const config: Config = {
  eagerLoading: false,
  storyPath: 'src',
  wrapperComponent: {
    path: '.toybox/Wrapper.tsx',
    componentName: 'Wrapper'
  },
  title: 'Toybox example',
  emojiIcon: '🐒'
}

module.exports = config;
