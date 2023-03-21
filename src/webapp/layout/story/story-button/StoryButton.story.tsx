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
  ],
};
