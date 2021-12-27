import { Markdown } from '../Markdown';

interface Props {
  children: string;
}

export function MarkdownStory({ children }: Props) {
  return <Markdown children={children} />;
}
