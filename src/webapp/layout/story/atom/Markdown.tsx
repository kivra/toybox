import { Prism } from '@mantine/prism';
import { Text, Title, Code } from '@mantine/core';
import MarkdownToJsx from 'markdown-to-jsx';

interface Props {
  children: string;
}

export function Markdown({ children }: Props) {
  return <MarkdownToJsx children={children} options={options} />;
}

const options = {
  forceBlock: true,
  overrides: {
    code: {
      component: (p: any) => {
        const match = /lang-(\w+)/.exec(p.className || '');
        if (match && typeof p.children === 'string') {
          return <Prism language={match[1] as any} children={p.children} />;
        }
        return <Code>{p.children}</Code>;
      },
    },
    p: {
      component: Text,
    },
    h1: {
      component: Title,
      props: {
        order: 1,
        style: { marginBottom: 24 },
      },
    },
    h2: {
      component: Title,
      props: {
        order: 2,
        style: { margin: '12px 0' },
      },
    },
    h3: {
      component: Title,
      props: {
        order: 3,
        style: { margin: '12px 0' },
      },
    },
    h4: {
      component: Title,
      props: {
        order: 4,
        style: { margin: '12px 0' },
      },
    },
    h5: {
      component: Title,
      props: {
        order: 5,
        style: { margin: '12px 0' },
      },
    },
    h6: {
      component: Title,
      props: {
        order: 6,
        style: { margin: '12px 0' },
      },
    },
  },
};
