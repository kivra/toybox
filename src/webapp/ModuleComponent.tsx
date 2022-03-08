import { Center, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import type { MarkdownOrStoryModule, StoryRoute } from "../types";
import { MarkdownStory } from "./layout/story/MarkdownStory";
import { StoryComponent } from "./layout/story/Story";
import { StoryHeader } from "./layout/story/StoryHeader";
import { ErrorBoundary } from "./layout/error-boundary/ErrorBoundary";
import { isLazyComponent, isMarkdownStoryModule } from "./util";

export function ModuleComponent({
  route,
}: {
  route: StoryRoute;
}): JSX.Element | null {
  const [storyModule, setStoryModule] = useState<MarkdownOrStoryModule>();

  useEffect(() => {
    if (isLazyComponent(route.component)) {
      route.component().then((m) => setStoryModule(m));
    } else {
      setStoryModule(route.component);
    }
  }, []);

  if (!storyModule) {
    return (
      <Center style={{ height: 500 }}>
        <Loader color="green" size="xl" />
      </Center>
    );
  }

  if (isMarkdownStoryModule(storyModule)) {
    return (
      <MainInnerWrapper>
        <MarkdownStory children={storyModule.default} />
        <div style={{ marginBottom: 200 }} />
      </MainInnerWrapper>
    );
  } else {
    const fullStory = storyModule["story"];
    if (!fullStory) {
      return null;
    }
    const {
      header: { title, description, storyButtons },
      stories,
    } = fullStory;

    const buttons = storyButtons?.map((button) => {
      if (button.type === "github") {
        return {
          ...button,
          url: button.url || generateGithubUrl(route.urlPath),
        };
      }
      return button;
    });
    return (
      <>
        <StoryHeader
          title={title || route.name}
          description={description}
          storyButtons={buttons}
        />
        <MainInnerWrapper>
          {stories.map((story, i) => (
            <ErrorBoundary key={story.name || i}>
              <StoryComponent story={story} />
            </ErrorBoundary>
          ))}
          <div style={{ marginBottom: 200 }} />
        </MainInnerWrapper>
      </>
    );
  }
}

function generateGithubUrl(storyPath: string) {
  return `GITHUB_PROJECT_URL/blob/main/src${storyPath}.tsx`;
}

const MainInnerWrapper = styled("div")({
  maxWidth: "1280px",
  padding: "0 40px",
  margin: "0 auto",
});
