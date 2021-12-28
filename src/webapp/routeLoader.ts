import type { StoryModules, StoryRoute, MarkdownOrStoryModule, StoryComponent, EagerStoryModules } from '../types';
import { isLazyComponent, isMarkdownStoryModule } from './util';


const storiesModules = import.meta.glob('./__TSX_STORIES_PATH__');
const markdownStoriesModules = import.meta.glob('./__MD_STORIES_PATH__');

// type Modules = {
//   stories: StoryModules | EagerStoryModules;
//   [Symbol.iterator](): IterableIterator<[path: string, component: StoryComponent]>;
//   numberOfStoriesInPath(path: string): number;
// }

class Modules {
  stories: StoryModules | EagerStoryModules;

  constructor(stories: StoryModules | EagerStoryModules) {
    this.stories = stories;
  }

  *[Symbol.iterator](): IterableIterator<[path: string, component: StoryComponent]> {
    const stories: [string, MarkdownOrStoryModule][] = Object.entries(this.stories);
    for (const [realPath, component] of stories) {
      if (!isLazyComponent(component) && !isMarkdownStoryModule(component) && component.story.path) {
        yield [component.story.path, component];
      } else {
        const path = realPath.replace('.story.tsx', '').replace('.story.md', '');
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
  ...markdownStoriesModules
} as any);

// const modules: Modules = {
//   stories: {
//     ...storiesModules,
//     ...markdownStoriesModules,
//   },
//   *[Symbol.iterator]() {
//     for(let i of this.items) {
//       yield i;
//     }
//   },
//   numberOfStoriesInPath(path) {

//   }
// } as any;

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
  // let moduleEntries: (readonly [string, StoryComponent])[];
  // // if (isEagerStoryModules(modules)) {
  // //   moduleEntries = Object.entries(modules).map(([path, module]) => {
  // //     if (module)
  // //   })
  // // } else {
  // for (const path of modules) {
    
  // }
  // moduleEntries = Object.entries(modules).map(([path, component]) => {
  //   const relativePath = path
  //     .replace('.story.tsx', '')
  //     .replace('.story.md', '');
  //     // .replace('../src/', '');
  //   if (!isLazyComponent(component)) {
  //     component

  //   }
  //   return [relativePath, loader] as const;
  // });
  // }

  for (const [path, component] of modules) {
    const breadcrumbs = path.split('/');
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
    const subLevel = route.subfolders.map(sf => sf.stories).flat();
    allRoutes.push(...topLevel, ...subLevel);
  }
  return allRoutes;
}

function isEagerStoryModules(modules: StoryModules | EagerStoryModules): modules is EagerStoryModules {
  return typeof Object.values(modules)[0] === 'function';
}
