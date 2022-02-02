import { createServer } from "vite";
import express from "express";
import { Config } from "../types";
import { getPlugins } from "./vite-plugin";
import { htmlContent, snapshotHtmlContent } from "./util";

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
      include: [
        "react",
        "react-dom",
        "@emotion/css",
        "@emotion/styled",
        "@kivra/react-icons",
        "@mantine/core",
        "@mantine/prism",
        "@radix-ui/react-accordion",
        "markdown-to-jsx",
        "mobx",
        "mobx-react-lite",
        "react-router-dom",
      ],
    },
  });

  const app = express();
  app.use(server.middlewares);
  app.get("/snapshot", async (req, res) => {
    const url = req.originalUrl;
    const html = await server.transformIndexHtml(url, snapshotHtmlContent());
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
  app.use("*", async (req, res) => {
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
