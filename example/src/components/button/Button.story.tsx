import React from "react";
import { Story } from "toybox";

export const story: Story = {
  path: 'Components/Button',
  header: {
    title: "Button",
    description: "My button",
  },
  stories: [
    {
      render({}, action) {
        return <button onClick={action('onClick')}>Hello!</button>;
      },
    },
  ],
};
