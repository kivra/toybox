import path from "path";
import { stat } from 'fs/promises';
import { Config, UserConfig } from '../types';

const CONFIG_FILE_NAME = "toybox.config.js";

function error(msg: string) {
  console.error(msg);
  return process.exit(1);
}

export async function getConfig(
  customConfigFilePath: string = CONFIG_FILE_NAME
): Promise<Config> {
  const configFilePath = path.resolve(customConfigFilePath)
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
    eagerLoading: Boolean(config.eagerLoading),
    storyPath: config.storyPath || 'src',
    toyboxRootPath: path.join(__dirname, '..', 'webapp'),
    wrapperComponent: config.wrapperComponent
  };
}