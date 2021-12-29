import React from 'react';

interface Props {
  children: JSX.Element;
  themeName: 'dark' | 'light'
}

export function Wrapper(props: Props) {
  return <div data-theme-name={props.themeName}>{props.children}</div>
}
