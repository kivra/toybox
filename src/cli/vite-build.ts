import { build } from "vite";
import { writeFileSync, unlinkSync, renameSync } from "fs";
import { join } from "path";
import { Config } from "../types";
import { getPlugins } from "./vite-plugin";
import { htmlContent } from "./util";

export async function buildApp(config: Config) {
  const outDir = "toybox_dist";
  const tempIndexName = "toybox_index.html";
  const indexFileName = join(process.cwd(), tempIndexName);
  writeFileSync(indexFileName, htmlContent(config));
  try {
    await build({
      configFile: false,
      root: process.cwd(),
      plugins: getPlugins(config),
      clearScreen: false,
      envPrefix: "TOYBOX_",
      build: {
        outDir,
        rollupOptions: {
          input: indexFileName,
        },
      },
    });
    renameSync(
      join(process.cwd(), outDir, tempIndexName),
      join(process.cwd(), outDir, "index.html")
    );
  } catch (error) {
    unlinkSync(indexFileName);
  }
}
