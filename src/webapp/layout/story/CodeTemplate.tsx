import { observer } from "mobx-react-lite";
import { CodeTemplateFn } from "../../../types";
import { Control } from "./control/useControl";
import { childrenToString, propsToObject } from "./propsToObject";
import { CodeHighlightTabs } from "@mantine/code-highlight";
import { IconCode } from "@tabler/icons-react";
import styled from "@emotion/styled";

interface Props {
  codeTemplate: Exclude<CodeTemplateFn, undefined>;
  controls: Control;
}

export const CodeTemplate = observer(({ codeTemplate, controls }: Props) => {
  const props = propsToObject(Object.values(controls.state));
  const shouldExpand = codeTemplate(
    props,
    childrenToString(controls.state["children"])
  ).includes("\n");
  return (
    <CodeHighlightStyled
      code={[
        {
          fileName: "",
          code: codeTemplate(
            props,
            childrenToString(controls.state["children"])
          ),
          language: "tsx",
          icon: null,
        },
      ]}
      withExpandButton
      defaultExpanded={!shouldExpand}
      expandCodeLabel="Show code"
      collapseCodeLabel="Show less"
      styles={{
        root: {
          position: "relative",
          background: "transparent",
        },
        header: {
          backgroundColor: "var(--surface-200)",
          position: "absolute",
          top: "12px",
          right: 0,
          zIndex: 200,
        },
        codeWrapper: {
          backgroundColor: "var(--surface-200)",
          border: "1px solid var(--border)",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        },
        file: { display: "none" },
        pre: {
          padding: "16px 16px 30px 16px",
          borderLeft: "5px solid var(--border)",
          borderTop: "1px solid var(--border)",
        },
        showCodeButton: {
          backgroundColor: "var(--surface-white-80)",
          backdropFilter: "blur(16px)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-distinct)",
          borderRadius: "12px",
          width: "auto",
          paddingLeft: "12px",
          paddingRight: "12px",
          paddingTop: "6px",
          paddingBottom: "6px",
          marginBottom: "12px",
          fontSize: "15px",
        },
        control: {
          color: "var(--text-primary)",
        },
      }}
    />
  );
});

const CodeHighlightStyled = styled(CodeHighlightTabs)({
  ".mantine-CodeHighlightTabs-codeWrapper": {
    "::before": {
      display: "none",
    },
  },
  "button:hover": {
    backgroundColor: "var(--surface-400)",
  },
});
