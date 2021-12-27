interface Config {
  ComponentWrapper(props: {
    children: JSX.Element;
    isDarkMode: boolean;
  }): JSX.Element;
  pathToStories: string;
}

/**
 * TODO:
 */
const KivraTheme = ({ children }: any) => <div>{children}</div>;

export const config: Config = {
  ComponentWrapper({ isDarkMode, children }): JSX.Element {
    return (
      <KivraTheme
        colorScheme={isDarkMode ? 'dark' : 'light'}
        children={children}
      />
    );
  },
  pathToStories: '../src/',
};
