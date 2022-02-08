import type {
  StoryModules,
  StoryRoute,
  MarkdownOrStoryModule,
  StoryComponent,
  EagerStoryModules,
} from "../types";
import { isLazyComponent, isMarkdownStoryModule } from "./util";

const storiesModules = import.meta.glob("/src/webapp/**/*.story.tsx")
const markdownStoriesModules = import.meta.glob("/src/webapp/**/*.story.md")
const storiesPath = "src/webapp";

class Modules {
  stories: StoryModules | EagerStoryModules;

  constructor(stories: StoryModules | EagerStoryModules) {
    this.stories = stories;
  }

  *[Symbol.iterator](): IterableIterator<
    [path: string, component: StoryComponent]
  > {
    const stories: [string, MarkdownOrStoryModule][] = Object.entries(
      this.stories
    );
    for (const [realPath, component] of stories) {
      if (
        !isLazyComponent(component) &&
        !isMarkdownStoryModule(component) &&
        component.story.path
      ) {
        yield [component.story.path, component];
      } else {
        let path = realPath
          .replace(".story.tsx", "")
          .replace(".story.md", "")
          .split("/")
          .filter((p): boolean => ![".", "..", ""].includes(p))
          .join("/");
        if (path.startsWith(storiesPath)) {
          path = path.substring(storiesPath.length);
        }
        if (path.startsWith("/")) {
          path = path.substring(1);
        }
        yield [path, component];
      }
    }
  }

  numberOfStoriesInPath(searchPath: string): number {
    let n = 0;
    for (const [componentPath] of this) {
      if (componentPath.startsWith(searchPath)) {
        n++;
      }
    }
    return n;
  }
}

const modules = new Modules({
  ...storiesModules,
  ...markdownStoriesModules,
} as any);

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

  for (const [path, component] of modules) {
    const breadcrumbs = path.split("/");
    const storyName = breadcrumbs.pop()!;
    const headname = breadcrumbs[0]!;
    const urlPath = `/${path}`;

    if (breadcrumbs.length === 1) {
      addTopLevelRoute(headname, component, storyName, urlPath, routes);
    } else {
      const subfolderHeadname = breadcrumbs[1]!;
      const firstTwoParts = `${headname}/${subfolderHeadname}`;
      const numberOfStories = modules.numberOfStoriesInPath(firstTwoParts);
      if (numberOfStories === 1) {
        addTopLevelRoute(headname, component, storyName, urlPath, routes);
      } else {
        const storyRoute = {
          component,
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
            (sf) => sf.head === subfolderHeadname
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
  component: (() => Promise<MarkdownOrStoryModule>) | MarkdownOrStoryModule,
  storyName: string,
  path: string,
  routes: NestedStoryRoute
) {
  const storyRoute = {
    component,
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
    const subLevel = route.subfolders.map((sf) => sf.stories).flat();
    allRoutes.push(...topLevel, ...subLevel);
  }
  return allRoutes;
}

function isEagerStoryModules(
  modules: StoryModules | EagerStoryModules
): modules is EagerStoryModules {
  return typeof Object.values(modules)[0] === "function";
}
