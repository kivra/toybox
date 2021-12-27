import { chdir, cwd } from 'process';
import { createServer } from 'vite';
import { UserConfig } from '../types';
import { plugins } from './vite-plugin';


export async function createViteServer(config: UserConfig) {
  process.chdir(config.rootPath);

  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    root: config.rootPath,
    server: {
      port: 1337
    },
    plugins
  })
  await server.listen()

  server.printUrls()
}