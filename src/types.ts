export interface StoryModules {
  [key: string]: () => Promise<MarkdownOrStoryModule>;
}

export interface EagerStoryModules {
  [key: string]: MarkdownOrStoryModule;
}

export type MarkdownOrStoryModule = StoryModule | MarkdownStoryModule;

export type StoryModule = { story: FullStory };
export type MarkdownStoryModule = { default: string };

export type StoryComponent = (() => Promise<MarkdownOrStoryModule>) | MarkdownOrStoryModule;

export interface StoryRoute {
  urlPath: string;
  name: string;
  component: StoryComponent;
}

type StoryButtonTypes = 'github' | 'figma';

export interface StoryButton {
  type: StoryButtonTypes;
  url?: string;
}
export interface StoryHeader {
  title?: string;
  description: string | JSX.Element;
  storyButtons?: StoryButton[];
}
export interface FullStory {
  header: StoryHeader;
  path?: string;
  stories: Story[];
}
export interface Story {
  name?: string;
  /**
   * Story type. Defaults to `configurator`.
   * `configurator` will show a configurator beside the story
   * `fullsize` will show the story without any configurator.
   */
  type?: 'fullsize' | 'configurator';
  center?: boolean;
  information?: string;
  codeTemplate?: CodeTemplateFn;
  render?: (
    controls: ReturnType<
      typeof import('./webapp/layout/story/control/useControl').useControl
    >,
    action: (name: string) => (...args: any[]) => void
  ) => JSX.Element;
}

export interface CodeTemplateProps {
  asString: string;
  asObject: Record<string, any>;
  asMultiline(indentSpace: number): string;
  asArray: string[];
  toString(): string;
  group(name: string): CodeTemplateProps;
}
export type CodeTemplateFn = (
  props: CodeTemplateProps,
  children?: string
) => string;

export interface Config extends UserConfig {
  /**
   * Absolut path to toybox
   */
  toyboxRootPath: string;
}

export interface UserConfig {
  /**
   * Absolute path to project root.
   * Will default to config path
   */
  rootPath: string;
  /**
   * Path to search for stories in
   */
  storyPath: string;
  /**
   * True if all stories should be pre loaded and compiled
   */
  eagerLoading: boolean;
  /**
   * Wrapper component for stories
   */
  wrapperComponent?: {
    path: string;
    componentName: string;
  }

  /**
   * Title for the html page
   */
  title: string;

  /**
   * Emoji icon for the html page
   */
  emojiIcon: string;
}
