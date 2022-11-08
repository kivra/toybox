import { join, relative as relativePath, dirname } from "path";
import react from "@vitejs/plugin-react";
import { Plugin } from "vite";
import { Config } from "../types";

function markdownRawPlugin(): Plugin {
  return {
    name: "markdown-raw-plugin",
    transform(code, filePath) {
      if (/\.(md)/.test(filePath)) {
        const json = JSON.stringify(code)
          .replace(/\u2028/g, "\\u2028")
          .replace(/\u2029/g, "\\u2029");

        return {
          code: `export default ${json}`,
        };
      }
      return undefined;
    },
  };
}

function storyImportPath(config: Config): Plugin {
  return {
    name: "story-import-path",
    enforce: "pre",
    transform(code, filePath) {
      if (!/routeLoader\.ts/.test(filePath)) {
        return undefined;
      }

      const basePath = relativePath(
        config.toyboxRootPath,
        join(process.cwd(), config.storyPath)
      );
      const replacer = [
        ["__TSX_STORIES_PATH__", join(basePath, "**/*.story.tsx")],
        ["__MD_STORIES_PATH__", join(basePath, "**/*.story.md")],
        ["__STORY_PATH__", config.storyPath],
      ] as const;
      let newCode = code;
      for (const [key, value] of replacer) {
        newCode = newCode.replace(key, value);
      }

      if (config.eagerLoading) {
        newCode = newCode.replaceAll("meta.glob", "meta.globEager");
      }

      return newCode;
    },
  };
}

function updateTitle(config: Config): Plugin {
  return {
    name: "update-title",
    enforce: "pre",
    transform(code, filePath) {
      if (!/Navbar\.tsx/.test(filePath)) {
        return undefined;
      }
      return code.replace("NAVBAR_TITLE", config.title);
    },
  };
}

function updateGitHubProjectUrl(config: Config): Plugin {
  return {
    name: "update-github-project-url",
    enforce: "pre",
    transform(code, filePath) {
      if (!/ModuleComponent\.tsx/.test(filePath)) {
        return undefined;
      }
      return code.replace("GITHUB_PROJECT_URL", config.githubProjectUrl);
    },
  };
}

function storyWrapperImport(config: Config): Plugin {
  return {
    name: "story-wrapper-import",
    enforce: "pre",
    transform(code, filePath) {
      if (!/Story\.tsx/.test(filePath)) {
        return undefined;
      } else if (!config.wrapperComponent) {
        return undefined;
      } else {
        const importFrom = dirname(filePath);
        let path = config.wrapperComponent.path;
        if (path.startsWith(".")) {
          path =
            "./" +
            relativePath(
              importFrom,
              join(process.cwd(), config.wrapperComponent.path)
            );
        }
        return code
          .replace(
            "DefaultComponentWrapper",
            `${config.wrapperComponent.componentName} as DefaultComponentWrapper`
          )
          .replace("./DefaultComponentWrapper", path);
      }
    },
  };
}

export function getPlugins(config: Config) {
  return [
    react(),
    markdownRawPlugin(),
    storyImportPath(config),
    storyWrapperImport(config),
    updateTitle(config),
    updateGitHubProjectUrl(config),
  ];
}
