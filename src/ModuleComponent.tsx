import { Center, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { MarkdownStory } from './layout/story/MarkdownStory';
import { StoryComponent } from './layout/story/Story';
import { StoryHeader } from './layout/story/StoryHeader';
import type { MarkdownStoryModule, StoryModule, StoryRoute } from './types';

export function ModuleComponent({
  route,
}: {
  route: StoryRoute;
}): JSX.Element | null {
  const [storyModule, setStoryModule] = useState<
    StoryModule | MarkdownStoryModule
  >();

  useEffect(() => {
    route.loader().then(m => setStoryModule(m));
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
    const fullStory = storyModule['story'];
    if (!fullStory) {
      return null;
    }
    const {
      header: { title, description, storyButtons },
      stories,
    } = fullStory;

    const buttons = storyButtons?.map(button => {
      if (button.type === 'github') {
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
            <StoryComponent key={story.name || i} story={story} />
          ))}
          <div style={{ marginBottom: 200 }} />
        </MainInnerWrapper>
      </>
    );
  }
}

function generateGithubUrl(storyPath: string) {
  return `https://github.com/kivra/react-components/blob/main/src${storyPath}.tsx`;
}

function isMarkdownStoryModule(
  module: StoryModule | MarkdownStoryModule
): module is MarkdownStoryModule {
  return 'default' in module && typeof module.default === 'string';
}

const MainInnerWrapper = styled('div')({
  maxWidth: '1280px',
  padding: '0 40px',
  margin: '0 auto',
});
