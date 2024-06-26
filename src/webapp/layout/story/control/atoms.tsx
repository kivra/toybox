import React from "react";
import { Text } from "@mantine/core";

export const ControlTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Text
    style={{
      margin: "12px 0 6px 0",
      fontWeight: 700,
    }}
  >
    {children}
  </Text>
);
