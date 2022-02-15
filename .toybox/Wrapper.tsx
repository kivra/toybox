import React from "react";

interface Props {
  children: JSX.Element;
  colorScheme: "dark" | "light";
}

export function Wrapper(props: Props) {
  return <div data-theme-name={props.colorScheme}>{props.children}</div>;
}
