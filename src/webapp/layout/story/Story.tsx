import styled from "@emotion/styled";
import { Center, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { Story } from "../../../types";
import { Markdown } from "./atom/Markdown";
import { ActionOutput } from "./ActionOutput";
import { CodeTamplete } from "./CodeTemplate";
import { Controls } from "./control/Controls";
import { useControl } from "./control/useControl";
import { useIsDarkMode } from "./control/useIsDarkMode";
import { DefaultComponentWrapper } from "./DefaultComponentWrapper";
import { useActionOutput } from "./useActionOutput";

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
              {story.center ? (
                <Center style={{ height: "100%" }}>{renderdStory}</Center>
              ) : (
                <div>{renderdStory}</div>
              )}
            </Prewview>
            <ControlsWrapper>
              <Controls controls={controls} darkMode={darkMode} />
            </ControlsWrapper>
          </Configurator>
          {story.codeTemplate && (
            <CodeTamplete
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

const StoryTitle = styled(Title)`
  margin-top: 24px !important;
  margin-bottom: 12px !important;
`;

const Wrapper = styled.div`
  margin-top: 12px;
  margin-bottom: 36px;
`;

const Configurator = styled.div`
  border: 1px solid #f1f3f5;
  display: flex;
  max-width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Prewview = styled.div`
  flex: 1;
  padding: 16px;
  background: rgb(255, 255, 255);
`;

const ControlsWrapper = styled.div`
  width: 250px;
  padding: 16px;
  box-sizing: border-box;
  border-left: 1px solid #f1f3f5;
`;

const SectionAnchor: React.FC<{ id: string }> = ({ id, children }) =>
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
