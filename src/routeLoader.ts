import type { StoryModules, StoryModule, StoryRoute } from './types';

const storiesModules = import.meta.glob('../src/**/*.story.tsx');
const markdownStoriesModules = import.meta.glob('../src/**/*.story.md');

const modules: StoryModules = {
  ...storiesModules,
  ...markdownStoriesModules,
};

export type NestedStoryRoute = Map<string, FirstLevelRoute>;

interface FirstLevelRoute {
  head: string;
  stories: StoryRoute[];
  subfolders: {
    head: string;
    stories: StoryRoute[];
  }[];
}

export function createRouteTree(): NestedStoryRoute {
  const routes = new Map<string, FirstLevelRoute>();
  const moduleEntries = Object.entries(modules).map(([path, loader]) => {
    const relativePath = path
      .replace('.story.tsx', '')
      .replace('.story.md', '')
      .replace('../src/', '');
    return [relativePath, loader] as const;
  });

  for (const [path, loader] of moduleEntries) {
    const breadcrumbs = path.split('/');
    const storyName = breadcrumbs.pop()!;
    const headname = breadcrumbs[0]!;
    const urlPath = `/${path}`;

    if (breadcrumbs.length === 1) {
      addTopLevelRoute(headname, loader, storyName, urlPath, routes);
    } else {
      const subfolderHeadname = breadcrumbs[1]!;
      const firstTwoParts = `${headname}/${subfolderHeadname}`;
      const numberOfStories = moduleEntries.filter(([path]) =>
        path.startsWith(firstTwoParts)
      ).length;
      if (numberOfStories === 1) {
        addTopLevelRoute(headname, loader, storyName, urlPath, routes);
      } else {
        const storyRoute = {
          loader,
          name: storyName,
          urlPath,
        };
        const route = routes.get(headname);
        if (!route) {
          routes.set(headname, {
            head: headname,
            stories: [],
            subfolders: [
              {
                head: subfolderHeadname,
                stories: [storyRoute],
              },
            ],
          });
        } else {
          const subfolder = route.subfolders.find(
            sf => sf.head === subfolderHeadname
          );
          if (subfolder) {
            subfolder.stories.push(storyRoute);
          } else {
            route.subfolders.push({
              head: subfolderHeadname,
              stories: [storyRoute],
            });
          }
        }
      }
    }
  }

  return routes;
}

function addTopLevelRoute(
  headName: string,
  loader: () => Promise<StoryModule>,
  storyName: string,
  path: string,
  routes: NestedStoryRoute
) {
  const storyRoute = {
    loader,
    name: storyName,
    urlPath: path,
  };
  const route = routes.get(headName);
  if (!route) {
    routes.set(headName, {
      head: headName,
      stories: [storyRoute],
      subfolders: [],
    });
  } else {
    route.stories.push(storyRoute);
  }
}

export function extractAllRoutes(nestedRoutes: NestedStoryRoute): StoryRoute[] {
  const allRoutes: StoryRoute[] = [];
  for (const route of nestedRoutes.values()) {
    const topLevel = route.stories;
    const subLevel = route.subfolders.map(sf => sf.stories).flat();
    allRoutes.push(...topLevel, ...subLevel);
  }
  return allRoutes;
}
