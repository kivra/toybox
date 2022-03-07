## Toybox 🪀

> Tool for building UI components in isolation, and an easy way to document them.

### 🚀 Installing

Install the library by running `npm install @kivra/toybox` (it is currently only available on Github [registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry))

You will now need to create a config file for toybox. The file must be named `toybox.config.ts` and be placed in the root folder of your project. All paths will be relative to this file.

```ts
// toybox.config.ts
import type { Config } from "@kivra/toybox";

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

### 🤩 Creating a story

To create a story is easy.

Just create a file that ends with `.story.tsx` or `.story.md` if you just want to write markdown text.

For example. If you have a component called `Button.tsx`, create a file that is called `Button.story.tsx` beside it and add the follwoing code:

```tsx
import type { Story } from '@kivra/toybox';
import { Button } from './Button';

export const story: Story = {
  header: {
    // Title of story
    title: 'Button',
    // Two different types of buttons are available, github or figma
    // Url for github type is optional, we will try to generate a url based on the component name. You could also give it a value if you prefer.
    // Figma url is a link to the design of the component.
    storyButtons: [
      { type: 'github' },
      {
        type: 'figma',
        url: 'https://www.figma.com/file/cqWQxzXlhuLc5SRXemxy4F/Kivra-Style-Guide?node-id=20746%3A39897',
      },
    ],
    // Description of the component
    description:
      'Buttons communicate actions that users can take. Button labels express what action will occur when the user interacts with it.',
  },
  stories: [
    {
      name: 'How to use the Button component', // The name of this story
      center: true, // Should the component be in center or not
      /**
       * The code template will show how to use the component.
       * `props` is a string representation of all stings in a single line.
       * If you wnat to show the props on multi lines you can use `props.asMultiline(indentSpace)` instead.
       */
      codeTemplate: (props, children) => `
        <Button${props}>
          ${children}
        </Button>`,
      render({ boolean, text, segment, button }, action) {
        // This will add a control button but will not add any extra props in `codeTemplate`
        button('Click on me', () => alert('Hello!'));
        return (
          <Button
            disabled={boolean({ name: 'disabled', value: false })} // It is important that `name` match the property name, in order to make `codeTemplate` work as expected
            size={segment({
              name: 'size',
              value: 'small',
              options: [
                ['big', 'Big'],
                ['small', 'Small'],
              ],
              defaultValue: 'small', // This is the default value of the propery so if this value is selected the prop will not appear in `codeTemplate`.
            })}
            startIcon={
              boolean({
                name: 'startIcon',
                value: false,
                mapValueToTextProp: v => (v ? '<TopIcon />' : undefined), // You can map a prop value to another value in `codeTemplate`
              }) && <TopIcon />
            }
            onClick={action('Button click')} // This will print the text "Button click" and the event under the component
          >
            {text({ displayName: 'text', name: 'children', value: 'Save' })}
          </Button>
        );
      },
    };
  ]
};
```

### 🧞 Commands

- `npx toybox`: Start preview of toybox.
- `npx toybox build`: Build a static version of toybox. The new files will be placed in `toybox_dist`
