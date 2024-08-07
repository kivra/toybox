import styled from "@emotion/styled";
import { Code } from "@mantine/core";
import { observer } from "mobx-react-lite";
import type { ActionOutput as Outputs } from "./useActionOutput";

interface Props {
  outputs: Outputs["outputs"];
}

export const ActionOutput = observer(({ outputs }: Props) => {
  if (outputs.length === 0) {
    return null;
  }
  return (
    <Wrapper>
      <Code
        block
        styles={{
          root: {
            color: "var(--text-primary)",
            background: "var(--surface-400)",
            border: "1px solid var(--border-distinct)",
            padding: "4px 16px 2px 8px",
          },
        }}
      >
        {outputs
          .map(
            (output) =>
              (output.name ? `${output.name}: ` : "") +
              output.args.map((a) => prettyPrintObject(a)).join(", ")
          )
          .join("\n")}
      </Code>
    </Wrapper>
  );
});

function prettyPrintObject(obj: any): string {
  if (obj instanceof FileList) {
    return `[ ${Array.from(obj)
      .map((f) => f.name)
      .join(", ")} ]`;
  } else if (obj.type === "click") {
    return `(click event) pageX: ${obj.pageX}, pageY: ${obj.pageX}`;
  } else if (typeof obj === "object") {
    try {
      return JSON.stringify(obj);
    } catch (error) {
      return String(obj);
    }
  }
  return String(obj);
}

const Wrapper = styled("div")({
  marginTop: "12px",
});
