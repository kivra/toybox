import { Story } from "../../../../public";
import { StoryHeaderButton } from "./StoryButton";

export const story: Story = {
  header: {
    title: "Story button",
    description: "Buttons to use for external resources",
  },
  stories: [
    {
      name: "Github",
      center: true,
      render() {
        return <StoryHeaderButton type="github" url="https://github.com" />;
      },
    },
    {
      name: "Figma",
      center: true,
      render() {
        return <StoryHeaderButton type="figma" url="https://figma.com" />;
      },
    },
    {
      name: "Kivra Design System",
      center: true,

      render() {
        return (
          <StoryHeaderButton
            type="designsystem"
            url="https://design.kivra.com/"
          />
        );
      },
    },
    {
      name: "Story Button",
      center: true,
      information:
        "This is just an example how to use `<StoryHeaderButton />`s props. <br/>In this example also implemented show/hide code snippet that is possible to use in stories with `codeTemplate` function.",
      codeTemplate: (props) => `
      <StoryHeaderButton${props}></StoryHeaderButton>
        `,
      codeTemplateExpanded: false,
      render({ segment, text }) {
        const type = segment({
          name: "type",
          value: "designsystem",
          options: [
            ["designsystem", "designsystem"],
            ["github", "github"],
            ["figma", "figmaa"],
          ],
          showAs: "select",
        });
        return (
          <StoryHeaderButton
            type={type}
            url={text({
              name: "url",
              value: "https://",
              defaultValue: "https://design.kivra.com/",
              description: "Always start with https://",
            })}
          />
        );
      },
    },
  ],
};
