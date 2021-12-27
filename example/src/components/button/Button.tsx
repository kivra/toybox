import React from "react";
import { Story } from "toybox";

export const ButtonStory: Story = {
  header: {
    title: "Button",
    description: "My button",
  },
  stories: [
    {
      render() {
        return <button>Hello</button>;
      },
    },
  ],
};
