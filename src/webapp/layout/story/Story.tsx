import styled from "@emotion/styled";
import { Center, Title, Button, Collapse } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { Story } from "../../../types";
import { Markdown } from "./atom/Markdown";
import { ActionOutput } from "./ActionOutput";
import { CodeTemplate } from "./CodeTemplate";
import { Controls } from "./control/Controls";
import { useControl } from "./control/useControl";
import { useIsDarkMode } from "./control/useIsDarkMode";
import { DefaultComponentWrapper } from "./DefaultComponentWrapper";
import { useActionOutput } from "./useActionOutput";
import { useState } from "react";
import { ArrowDownIcon } from "../../icons/ArrowDownIcon";

export const StoryComponent = observer(({ story }: { story: Story }) => {
  const controls = useControl();
  const darkMode = useIsDarkMode();
  const { outputs, action } = useActionOutput();

  const renderdStory = story.render && (
    <DefaultComponentWrapper
      colorScheme={darkMode.isDarkMode ? "dark" : "light"}
    >
      {story.render(controls, action)}
    </DefaultComponentWrapper>
  );

  if (story.type === "fullsize") {
    return renderdStory || <p>No render function was provided for the story</p>;
  }

  const sectionId = encodeURIComponent(story?.name ?? "");

  const [opened, setOpen] = useState(false);

  const toggleCodeSnippet = () => {
    setOpen((prevOpened) => !prevOpened);
  };

  const handleClick = () => {
    toggleCodeSnippet();
  };

  let codeTemplateSource = null;
  if (story.codeTemplate) {
    codeTemplateSource = story.codeTemplate.toString().trim();
  }

  return (
    <Wrapper>
      <SectionAnchor id={sectionId}>
        <StoryTitle order={3}>{story.name}</StoryTitle>
      </SectionAnchor>
      {story.information && (
        <div style={{ marginBottom: 32 }}>
          <Markdown children={story.information} />
        </div>
      )}
      {renderdStory && (
        <>
          <Configurator>
            <Prewview
              style={{ background: darkMode.isDarkMode ? "#000" : "#fff" }}
            >
              <ResetPoint tabIndex={-1} id={`reset-${sectionId}`} />
              {story.center ? (
                <Center style={{ height: "100%" }}>{renderdStory}</Center>
              ) : (
                <div>{renderdStory}</div>
              )}
            </Prewview>
            <ControlsWrapper>
              <Controls
                sectionId={sectionId}
                controls={controls}
                darkMode={darkMode}
              />
            </ControlsWrapper>
          </Configurator>
          {story.codeTemplate &&
            (story.codeTemplateExpanded ? (
              <>
                <Button
                  leftIcon={<ArrowDownIcon />}
                  variant="default"
                  onClick={handleClick}
                  styles={() => ({
                    root: {
                      color: "gray",
                      margin: "20px 0",
                    },
                    leftIcon: {
                      transform: opened ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  })}
                >
                  {opened ? "Hide code example" : "Show code example"}
                </Button>
                <Collapse
                  in={opened}
                  transitionDuration={300}
                  transitionTimingFunction="linear"
                >
                  <CodeTemplate
                    codeTemplate={story.codeTemplate}
                    controls={controls}
                  />
                </Collapse>
              </>
            ) : (
              <CodeTemplate
                codeTemplate={story.codeTemplate}
                controls={controls}
              />
            ))}
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
  marginBottom: "36px",
});

const Configurator = styled("div")({
  border: "1px solid #f1f3f5",
  display: "flex",
  maxWidth: "100%",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  "@media (max-width: 960px)": {
    flexDirection: "column",
  },
});

const Prewview = styled.div`
  position: relative;
  flex: 1;
  padding: 16px;
  background: rgb(255, 255, 255);
`;

const ControlsWrapper = styled("div")({
  width: "250px",
  padding: "16px",
  boxSizing: "border-box",
  borderLeft: "1px solid #f1f3f5",
  "@media (max-width: 960px)": {
    width: "100%",
    borderLeft: "none",
    borderTop: "1px solid #f1f3f5",
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
