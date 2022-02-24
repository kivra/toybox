import { build } from "vite";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import { Config } from "../types";
import { getPlugins } from "./vite-plugin";
import { htmlContent } from "./util";

export async function buildApp(config: Config): Promise<void> {
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
        outDir: config.outDir,
        rollupOptions: {
          input: indexFileName,
        },
      },
    });
    unlinkSync(indexFileName);
  } catch (error) {
    unlinkSync(indexFileName);
    throw error;
  }
}
