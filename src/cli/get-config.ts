import path from "path";
import { stat } from "fs/promises";
import { Config, UserConfig } from "../types";

function error(msg: string) {
  console.error(msg);
  return process.exit(1);
}

export async function getConfig(customConfigFilePath: string): Promise<Config> {
  const configFilePath = path.resolve(customConfigFilePath);
  try {
    const fileStat = await stat(configFilePath);
    if (!fileStat.isFile()) {
      throw new Error();
    }
  } catch {
    error(`Unable to access config file for Toybox: ${configFilePath}`);
  }
  const config = require(configFilePath) as Partial<UserConfig>;
  return {
    rootPath: config.rootPath || path.dirname(configFilePath),
    eagerLoading: Boolean(config.eagerLoading),
    storyPath: config.storyPath || "src",
    toyboxRootPath: path.join(__dirname, "..", "webapp"),
    wrapperComponent: config.wrapperComponent,
    emojiIcon: config.emojiIcon || "👾",
    title: config.title || "Components",
    snapshotWrapperFile: config.snapshotWrapperFile,
    outDir: config.outDir || 'toybox_dist',
    __cutomToyboxEntrypoint: config.__cutomToyboxEntrypoint,
  };
}
