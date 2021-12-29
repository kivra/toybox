import { createServer } from "vite";
import express from "express";
import { Config } from "../types";
import { getPlugins } from "./vite-plugin";
import { htmlContent } from "./util";

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
    const html = await server.transformIndexHtml(url, htmlContent(config));
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
