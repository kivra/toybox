import React from "react";

interface Props {
  children: JSX.Element;
  colorScheme?: "dark" | "light";
}

export function Wrapper({ children }: Props): JSX.Element {
  return <div data-default-component-wrapper>{children}</div>;
}
