import React from "react";
import { Story } from "toybox";

export const story: Story = {
  path: 'Components/Button',
  header: {
    title: "Button",
    description: "Buttons communicate actions that users can take. Button labels express what action will occur when the user interacts with it.",
  },
  stories: [
    {
      render({}, action) {
        return <button onClick={action('onClick')}>Hello!</button>;
      },
    },
  ],
};
