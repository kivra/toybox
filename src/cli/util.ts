import { join, relative } from "path";
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
      href="https://static.kivra.com/assets/fonts/dm-sans/dm-sans.css"
      rel="stylesheet"
    />

    <title>${config.title}</title>
    <style>
      html,
      body {
        margin: 0;
        font-family: 'DM Sans', sans-serif;
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
