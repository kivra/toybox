import { Markdown } from './atom/Markdown';

interface Props {
  children: string;
}

export function MarkdownStory({ children }: Props) {
  return <Markdown children={children} />;
}
