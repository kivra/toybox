import { join } from "path";
import type { Config } from "../types";

export const htmlContent = (config: Config) => {
  const scriptPath =
    config.__customToyboxEntrypoint || join(__dirname, "../webapp/index.tsx");
  return `
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=yes, maximum-scale=5.0" />
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${config.emojiIcon}</text></svg>"
    />
    <link
      href="https://static.kivra.com/assets/fonts/fonts.css"
      rel="stylesheet"
    />

    <title>${config.title}</title>
  </head>

  <body>
    <div id="app"></div>
    <script
      type="module"
      src="${scriptPath}"
    ></script>
  </body>
</html>
`;
};
