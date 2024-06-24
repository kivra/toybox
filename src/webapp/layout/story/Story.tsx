import styled from "@emotion/styled";
import {
  Button,
  Center,
  Title,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { observer } from "mobx-react-lite";
import { Story } from "../../../types";
import { Markdown } from "./atom/Markdown";
import { ActionOutput } from "./ActionOutput";
import { CodeTemplate } from "./CodeTemplate";
import { Controls } from "./control/Controls";
import { useControl } from "./control/useControl";
import { DefaultComponentWrapper } from "./DefaultComponentWrapper";
import { useActionOutput } from "./useActionOutput";
import { IconAccessible } from "@tabler/icons-react";
import { useRef } from "react";

export const StoryComponent = observer(({ story }: { story: Story }) => {
  const controls = useControl();
  const darkMode = useMantineColorScheme();
  const { outputs, action } = useActionOutput();
  const resetPointRef = useRef<HTMLButtonElement>(null);

  const renderdStory = story.render && (
    <DefaultComponentWrapper
      colorScheme={darkMode.colorScheme === "dark" ? "dark" : "light"}
    >
      {story.render(controls, action)}
    </DefaultComponentWrapper>
  );

  if (story.type === "fullsize") {
    return renderdStory || <p>No render function was provided for the story</p>;
  }

  const sectionId = encodeURIComponent(story?.name ?? "");

  let codeTemplateSource = null;

  if (story.codeTemplate) {
    codeTemplateSource = story.codeTemplate.toString().trim();
  }

  const handleButtonClick = () => {
    resetPointRef.current?.focus();
  };

  return (
    <Wrapper>
      <SectionAnchor id={sectionId}>
        <StoryTitle order={3}>{story.name}</StoryTitle>
      </SectionAnchor>
      {story.information && (
        <MarkdownGlobalStyles>
          <Markdown children={story.information} />
        </MarkdownGlobalStyles>
      )}
      {renderdStory && (
        <>
          <Configurator>
            <Preview
              variant={story.variant}
              hideControls={story.hideControls}
              codeTemplate={Boolean(story.codeTemplate)}
            >
              <ResetFocusButton>
                <Tooltip withArrow arrowPosition="center" label="Reset focus">
                  <Button
                    variant="transparent"
                    color="var(--text-secondary)"
                    onClick={handleButtonClick}
                    size="sm"
                    leftSection={<IconAccessible size={24} />}
                    style={{
                      padding: "0px",
                      marginBottom: "4px",
                      display: "flex",
                    }}
                  ></Button>
                </Tooltip>
              </ResetFocusButton>
              <ResetPoint tabIndex={-1} ref={resetPointRef} />
              {story.center ? (
                <Center style={{ height: "100%" }}>{renderdStory}</Center>
              ) : (
                <div>{renderdStory}</div>
              )}
            </Preview>
            {!story.hideControls && (
              <ControlsWrapper>
                <Controls sectionId={sectionId} controls={controls} />
              </ControlsWrapper>
            )}
          </Configurator>
          {story.codeTemplate && (
            <CodeTemplate
              codeTemplate={story.codeTemplate}
              controls={controls}
            />
          )}
          <ActionOutput outputs={outputs} />
        </>
      )}
    </Wrapper>
  );
});

const ResetPoint = styled("button")`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  outline: 0;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  border-radius: 6px;
  &:focus {
    outline: 2px solid #238be6;
  }
`;

const StoryTitle = styled(Title)`
  margin-top: 24px !important;
  margin-bottom: 12px !important;
`;

const Wrapper = styled("div")({
  marginTop: "12px",
  marginBottom: "48px",
});

const Configurator = styled("div")({
  display: "flex",
  maxWidth: "100%",
  "@media (max-width: 960px)": {
    flexDirection: "column",
  },
});

const Preview = styled.div<{
  variant?: string;
  hideControls?: boolean;
  codeTemplate?: boolean;
}>(({ variant, codeTemplate, hideControls }) => ({
  position: "relative",
  flex: "1",
  padding: "16px",
  background:
    variant === "filled"
      ? "var(--surface-200)"
      : variant === "transparent"
      ? "transparent"
      : "var(--surface-100)",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: hideControls ? "12px" : 0,
  borderBottomLeftRadius: codeTemplate ? 0 : "12px",
  borderBottomRightRadius: hideControls ? "12px" : 0,
  border: "1px solid var(--border)",
  borderBottom: hideControls ? 0 : undefined,
  minHeight: "270px",
}));

const ControlsWrapper = styled("div")({
  width: "250px",
  borderTopRightRadius: "12px",
  borderBottomRightRadius: "12px",
  padding: "16px",
  boxSizing: "border-box",
  border: "1px solid var(--border)",
  borderBottom: 0,
  background: "var(--surface-100)",
  "@media (max-width: 960px)": {
    width: "100%",
    borderLeft: "none",
    borderTop: "1px solid var(--border)",
  },
});

const ResetFocusButton = styled("div")({
  position: "absolute",
  bottom: 0,
  right: 0,
  zIndex: 1,
  padding: "0px",
});

const MarkdownGlobalStyles = styled("div")({
  "p, h1, h2, h3, h4, h5, ul, ol, li": {
    maxWidth: "860px",
  },

  p: {
    marginBottom: "16px",
  },
});

const SectionAnchor: React.FC<{ id: string; children?: React.ReactNode }> = ({
  id,
  children,
}) =>
  id !== "" ? (
    <a
      href={`#${id}`}
      id={id}
      style={{
        color: "inherit",
        textDecoration: "inherit",
      }}
    >
      {children}
    </a>
  ) : (
    <>{children}</>
  );
