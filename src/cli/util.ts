import { dirname, join, relative } from "path";
import { readFileSync, writeFileSync } from "fs";
import type { Config } from "../types";

export const htmlContent = (config: Config) => {
  const scriptPath =
    config.__cutomToyboxEntrypoint ||
    relative(process.cwd(), join(__dirname, "../webapp/index.tsx"));
  return `
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${config.emojiIcon}</text></svg>"
    />
    <link
      href="https://static.kivra.com/assets/fonts/archivo/archivo.css"
      rel="stylesheet"
    />

    <title>${config.title}</title>
    <style>
      html,
      body {
        margin: 0;
        font-family: 'Archivo', sans-serif;
        font-display: swap;
        font-size: 16px;
      }
    </style>
  </head>

  <body>
    <div id="app"></div>
    <script
      type="module"
      src="/${scriptPath}"
    ></script>
  </body>
</html>
`;
};

export const snapshotHtmlContent = (config: Config) => {
  return `
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📸</text></svg>"
    />
    <title>Snapshot</title>
  </head>

  <body>
    <div id="app"></div>
    ${
      config.snapshotWrapperFile
        ? `<script type="module" src="/${config.snapshotWrapperFile}"></script>`
        : ""
    }
  </body>
</html>
`;
};

export function updateStoryImportPath(config: Config): void {
  const basePath = `/${config.storyPath}`;
  const filePath = join(__dirname, "../webapp/routeLoader.ts");

  let code = readFileSync(filePath).toString();

  code = code.replace(
    /const storiesModules = .*/,
    `const storiesModules = import.meta.glob("${join(
      basePath,
      "**/*.story.tsx"
    )}")`
  );

  code = code.replace(
    /const markdownStoriesModules = .*/,
    `const markdownStoriesModules = import.meta.glob("${join(
      basePath,
      "**/*.story.md"
    )}")`
  );

  code = code.replace("__STORY_PATH__", config.storyPath);

  if (config.eagerLoading) {
    code = code.replaceAll("meta.glob", "meta.globEager");
  }

  writeFileSync(filePath, code);
}

export function updateStoryWrapperImportPath(config: Config): void {
  let wrapper = config.wrapperComponent;

  const filePath = join(__dirname, "../webapp/layout/story/Story.tsx");

  const importFrom = dirname(filePath);

  let path: string;
  let componentName: string;

  if (wrapper) {
    path = wrapper.path;
    componentName = wrapper.componentName;

    if (wrapper.path.startsWith(".")) {
      path = relative(importFrom, join(process.cwd(), wrapper.path)).replace(
        ".tsx",
        ""
      );
    }
  } else {
    path = "./DefaultComponentWrapper";
    componentName = "Wrapper";
  }

  let code = readFileSync(filePath).toString();

  code = code.replace(
    /.*as DefaultComponentWrapper.*/,
    `import { ${componentName} as DefaultComponentWrapper } from '${path}'`
  );

  writeFileSync(filePath, code);
}
