import React from 'react';

interface Props {
  children: JSX.Element;
  themeName: 'dark' | 'light'
}

export function Wrapper(props: Props) {
  console.log('Hej', props.themeName);
  return <div data-theme-name={props.themeName}>{props.children}</div>
}
