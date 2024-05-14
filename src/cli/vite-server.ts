import path, { join } from "path";
import { createServer } from "vite";
import express from "express";
import { Config } from "../types";
import { getPlugins } from "./vite-plugin";
import { htmlContent } from "./util";

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
      middlewareMode: true,
    },
    build: {
      target: "esnext",
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
  app.use(async (req, res, next) => {
    /**
     * Vite requirer to have a index.html file on disk but in Toybox case do we want to generate it
     * on the fly. This middleware will intercept the request and will let Vite handle all requests except
     * for the index.html request, eg. `/`, `/some-path/to/story`, etc.
     */
    const isViteRequest =
      req.url.includes("vite") ||
      req.url.includes("react-refresh") ||
      req.url.includes(".");
    if (isViteRequest) {
      server.middlewares(req, res, next);
    } else {
      const url = req.originalUrl;
      const html = await server.transformIndexHtml(url, htmlContent(config));
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    }
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
