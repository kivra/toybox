import { createServer } from "vite";
import express from "express";
import { relative, join } from 'path';
import { Config } from "../types";
import { getPlugins } from "./vite-plugin";

export async function createViteServer(config: Config) {
  const server = await createServer({
    configFile: false,
    root: process.cwd(),
    server: {
      port: 3000,
      middlewareMode: 'ssr',
    },
    plugins: getPlugins(config),
    clearScreen: false,
    envPrefix: 'TOYBOX_'
  });

  const app = express();
  app.use(server.middlewares);
  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    const scriptPath = config.__cutomToyboxEntrypoint || relative(process.cwd(), join(__dirname, '../webapp/index.tsx'));
    const html = await server.transformIndexHtml(url, htmlContent(scriptPath, config));
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  app.listen(3000)

  console.log(
    "\x1b[36m%s\x1b[0m",
    `
    ████████╗░█████╗░██╗░░░██╗██████╗░░█████╗░██╗░░██╗
    ╚══██╔══╝██╔══██╗╚██╗░██╔╝██╔══██╗██╔══██╗╚██╗██╔╝
    ░░░██║░░░██║░░██║░╚████╔╝░██████╦╝██║░░██║░╚███╔╝░
    ░░░██║░░░██║░░██║░░╚██╔╝░░██╔══██╗██║░░██║░██╔██╗░
    ░░░██║░░░╚█████╔╝░░░██║░░░██████╦╝╚█████╔╝██╔╝╚██╗
    ░░░╚═╝░░░░╚════╝░░░░╚═╝░░░╚═════╝░░╚════╝░╚═╝░░╚═╝`
  );
  console.log("\x1b[36m%s\x1b[0m", "\n\n Visit http://localhost:3000");
}

const htmlContent = (scriptPath: string, config: Config) => `
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
