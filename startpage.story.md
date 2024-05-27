# Creating stories in Toybox

Creating a story is simple. Just make a file ending with `.story.tsx` for JSX or `.story.md` for markdown text. For instance, if you have a `Button.tsx` component, create a `Button.story.tsx` file next to it and include the following code:

```tsx
import type { Story } from '@kivra/toybox';
import { Button } from './Button';

export const story: Story = {
  header: {
    title: 'Button', // Title of story
    description:
      'Buttons communicate actions that users can take. Button labels express what action will occur when the user interacts with it.', // Description of the story.
    storyButtons: [
      // Demonstrates component import. Package name defaults to toybox.config.ts setting.
      {
        type: 'import'
        value: 'Button',
      },
      // Status of the component.
      {
        type: 'status',
        value: 'core'
      },
      // For 'github' type, URL is optional. It can be auto-generated from the component name or manually provided.
      { type: 'github' },
      // For figma `url` is a link to the design of the component.
      {
        type: 'figma',
        url: 'https://www.figma.com/file/cqWQxzXlhuLc5SRXemxy4F/Kivra-Style-Guide?node-id=20746%3A39897',
      },
    ],
  },
  stories: [
    {
      name: 'How to use the Button component', // The name of this story
      center: true, // Should the component be in center or not
      hideControls: true, // Hides the prop toolbar
      /**
       * The code template will show how to use the component.
       * `props` is a string representation of all stings in a single line.
       * If you wnat to show the props on multi lines you can use `props.asMultiline(indentSpace)` instead.
       */
      codeTemplate: (props, children) => `
        <Button${props}>
          ${children}
        </Button>`,
      variant: "filled", // Optionally, you can switch to another background on the codeTemplate.
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
