export interface StoryModules {
  [key: string]: () => Promise<StoryModule>;
}

export type StoryModule = { [componentName: string]: FullStory };
export type MarkdownStoryModule = { default: string };

export interface StoryRoute {
  urlPath: string;
  name: string;
  loader: () => Promise<StoryModule | MarkdownStoryModule>;
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
      typeof import('./layout/story/control/useControl').useControl
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

export interface UserConfig {
  rootPath: string;
}
