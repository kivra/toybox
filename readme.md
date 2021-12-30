## Toybox 🪀

> Library for web ui components

### 🚀 Installing

Make sure you have volta [installed](https://docs.volta.sh/) to get the right node and npm version.

Install the library by running `npm install @kivra/toybox`

You will now need to create a cconfig file for toybox. The file must be named `toybox.config.ts` and be placed in the root folder of your project. All paths will be relative to this file.

```ts
// toybox.config.ts
import type { Config } from "./src/public";

const config: Config = {
  storyPath: "src",
  wrapperComponent: {
    path: "@kivra/react-components",
    componentName: "KivraTheme",
  },
  title: "My web app",
  emojiIcon: "🐒",
};

module.exports = config;
```

You are now ready to start Toybox: `npx toybox`.

### ⚙️ Configuration

See `UserConfig` in [src/types.ts](src/types.ts) for more information.

### 🧞 Commands

- `npx toybox`: Start preview of toybox.
- `npm toybox build`: Build a static version of toybox. The new files will be placed in `toybox_dist`
