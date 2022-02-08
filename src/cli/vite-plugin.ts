import { join, relative as relativePath, dirname } from "path";
import react from "@vitejs/plugin-react";
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

function storyWrapperImport(config: Config): Plugin {
  return {
    name: "story-wrapper-import",
    enforce: "pre",
    transform(code, filePath) {
      if (!/Story\.tsx$/.test(filePath)) {
        return undefined;
      } else if (!config.wrapperComponent) {
        return undefined;
      } else {
        const importFrom = dirname(filePath);
        const path = relativePath(
          importFrom,
          join(process.cwd(), config.wrapperComponent.path)
        );
        return code
          .replace(
            "DefaultComponentWrapper",
            `${config.wrapperComponent.componentName} as DefaultComponentWrapper`
          )
          .replace("./DefaultComponentWrapper", `./${path}`);
      }
    },
  };
}

export function getPlugins(config: Config) {
  return [react(), markdownRawPlugin(), storyWrapperImport(config)];
}
