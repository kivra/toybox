import React from 'react';

interface Props {
  children: JSX.Element;
  themeName: 'dark' | 'light'
}

export function DefaultComponentWrapper({ children }: Props): JSX.Element {
  return children;
}
