import { join, relative as relativePath, dirname } from "path";
import react from '@vitejs/plugin-react'
import { Plugin } from "vite";
import { Config } from "../types";

function markdownRawPlugin(): Plugin {
  return {
    name: "markdown-raw-plugin",
    transform(code, filePath) {
      if (/\.(md)$/.test(filePath)) {
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
      if (!/routeLoader\.ts$/.test(filePath)) {
        return undefined;
      }

      const basePath = relativePath(
        config.toyboxRootPath,
        join(process.cwd(), config.storyPath)
      );
      const replacer = [
        ["__TSX_STORIES_PATH__", "**/*.story.tsx"],
        ["__MD_STORIES_PATH__", "**/*.story.md"],
      ] as const;
      let newCode = code;
      for (const [key, path] of replacer) {
        newCode = newCode.replace(key, join(basePath, path));
      }

      if (config.eagerLoading) {
        newCode = newCode.replaceAll("meta.glob", "meta.globEager");
      }

      return newCode;
    },
  };
}

function storyWrapperImport(config: Config): Plugin {
  return {
    name: "story-wrapper-import",
    enforce: "pre",
    transform(code, filePath) {
      if (!/Story\.tsx$/.test(filePath)) {
        return undefined;
      } else if (!config.wrapperComponent) {
        console.log("[story-wrapper-import] 1");
        return undefined;
      } else {
        const importFrom = dirname(filePath);
        const oldImport = `import { DefaultComponentWrapper } from './DefaultComponentWrapper';`;
        const path = relativePath(
          importFrom,
          join(process.cwd(), config.wrapperComponent.path)
        );
        const newImport = `import { ${config.wrapperComponent.componentName} as DefaultComponentWrapper } from './${path}';`;
        return code.replace(oldImport, newImport);
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
  ];
}
