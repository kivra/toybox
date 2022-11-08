import path, { join } from "path";
import { createServer } from "vite";
import express from "express";
import { Config } from "../types";
import { getPlugins } from "./vite-plugin";
import { htmlContent, snapshotHtmlContent } from "./util";

const PRELOADED_DEPENDENCIES = [
  "react",
  "react-dom",
  "@emotion/css",
  "@emotion/styled",
  "@mantine/core",
  "@mantine/prism",
  "@radix-ui/react-accordion",
  "markdown-to-jsx",
  "mobx",
  "mobx-react-lite",
  "react-router-dom",
];

export async function createViteServer(config: Config) {
  const port = config.port || 3000;
  const server = await createServer({
    configFile: false,
    root: process.cwd(),
    server: {
      port,
      middlewareMode: "ssr",
    },
    plugins: getPlugins(config),
    clearScreen: false,
    envPrefix: "TOYBOX_",
    optimizeDeps: {
      entries: [join(process.cwd(), config.storyPath, "**/*.story.tsx")],
      include: PRELOADED_DEPENDENCIES,
    },
    resolve: {
      alias: PRELOADED_DEPENDENCIES.reduce<{ [dep: string]: string }>(
        (object, dep) => {
          try {
            object[dep] = path.dirname(require.resolve(`${dep}/package.json`));
          } catch {}
          return object;
        },
        {}
      ),
    },
  });

  const app = express();
  app.use(server.middlewares);
  app.get("/snapshot", async (req, res): Promise<void> => {
    const url = req.originalUrl;
    const html = await server.transformIndexHtml(
      url,
      snapshotHtmlContent(config)
    );
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
  app.use("*", async (req, res): Promise<void> => {
    const url = req.originalUrl;
    const html = await server.transformIndexHtml(url, htmlContent(config));
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  app.listen(port);

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
  console.log("\x1b[36m%s\x1b[0m", `\n\n Visit http://localhost:${port}`);
}
