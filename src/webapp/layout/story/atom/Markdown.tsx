import { Text, Title, Code } from "@mantine/core";
import MarkdownToJsx from "markdown-to-jsx";
import { CodeHighlight } from "@mantine/code-highlight";
import styled from "@emotion/styled";

interface Props {
  children: string;
}

export function Markdown({ children }: Props) {
  return <MarkdownToJsx children={children} options={options} />;
}

const Link = ({ children, ...props }: { children: React.ReactNode }) => {
  return <LinkStyled {...props}>{children}</LinkStyled>;
};

const options = {
  forceBlock: true,
  overrides: {
    code: {
      component: (p: any) => {
        const match = /lang-(\w+)/.exec(p.className || "");
        if (match && typeof p.children === "string") {
          return (
            <CodeHighlight
              language={match[1] as any}
              code={p.children}
              styles={{
                root: {
                  position: "relative",
                  backgroundColor: "var(--surface-200)",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  borderLeft: "5px solid var(--border)",
                },
                copy: {
                  color: "var(--text-primary)",
                  marginTop: "4px",
                  marginRight: "4px",
                },
              }}
            />
          );
        }
        return (
          <Code
            styles={{
              root: {
                color: "var(--text-primary)",
                background: "var(--surface-400)",
                border: "1px solid var(--border-distinct)",
                padding: "1px 4px 2px 4px",
              },
            }}
          >
            {p.children}
          </Code>
        );
      },
    },
    a: {
      component: Link,
    },
    p: {
      component: Text,
    },
    h1: {
      component: Title,
      props: {
        order: 1,
        style: { marginBottom: "24px" },
      },
    },
    h2: {
      component: Title,
      props: {
        order: 2,
        style: { margin: "12px 0" },
      },
    },
    h3: {
      component: Title,
      props: {
        order: 3,
        style: { margin: "12px 0" },
      },
    },
    h4: {
      component: Title,
      props: {
        order: 4,
        style: { margin: "12px 0" },
      },
    },
    h5: {
      component: Title,
      props: {
        order: 5,
        style: { margin: "12px 0" },
      },
    },
    h6: {
      component: Title,
      props: {
        order: 6,
        style: { margin: "12px 0" },
      },
    },
  },
};

const LinkStyled = styled("a")({
  color: "var(--green-primary)",
});
