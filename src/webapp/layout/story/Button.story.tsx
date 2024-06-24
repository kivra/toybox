import { Button, Group } from "@mantine/core";
import { Story } from "../../../public";

export const story: Story = {
  header: {
    title: "Button",
    description: "Buttons are used to perform actions.",
    storyButtons: [
      {
        type: "import",
        value: "Button",
        packageName: "@mantine/core",
      },
      {
        type: "status",
        value: "core",
      },
      {
        type: "github",
      },
      {
        type: "figma",
        url: "#",
      },
    ],
  },
  stories: [
    {
      center: true,
      codeTemplate: (props) => `<Button${props}></Button>`,
      render({ segment, text }) {
        const variant = segment({
          name: "type",
          options: [
            ["filled", "filled"],
            ["light", "light"],
            ["outline", "outline"],
          ],
          showAs: "select",
          value: "filled",
        });
        return (
          <Button variant={variant}>
            {text({
              displayName: "text",
              name: "children",
              value: "Save",
            })}
          </Button>
        );
      },
    },
    {
      name: "Displaying examples",
      center: true,
      variant: "transparent",
      hideControls: true,
      information: `
In your story, you could showcase various examples of the button component without showing the property toolbar.
`,
      codeTemplate: () => `
<Group>
  <Button>Filled button</Button>
  <Button variant="light">
    Light button
  </Button>
  <Button variant="outline">
    Outline button
  </Button>
</Group>
`,
      render() {
        return (
          <Group>
            <Button>Filled button</Button>
            <Button variant="light">Light button</Button>
            <Button variant="outline">Outline button</Button>
          </Group>
        );
      },
    },
  ],
};
