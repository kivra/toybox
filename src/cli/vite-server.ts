import { createServer } from 'vite';
import { Config } from '../types';
import { getPlugins } from './vite-plugin';

export async function createViteServer(config: Config) {
  const server = await createServer({
    configFile: false,
    root: config.toyboxRootPath,
    server: {
      port: 3001
    },
    plugins: getPlugins(config),
    clearScreen: false
  })
  await server.listen()

  console.log('\x1b[36m%s\x1b[0m',
    `
    ████████╗░█████╗░██╗░░░██╗██████╗░░█████╗░██╗░░██╗
    ╚══██╔══╝██╔══██╗╚██╗░██╔╝██╔══██╗██╔══██╗╚██╗██╔╝
    ░░░██║░░░██║░░██║░╚████╔╝░██████╦╝██║░░██║░╚███╔╝░
    ░░░██║░░░██║░░██║░░╚██╔╝░░██╔══██╗██║░░██║░██╔██╗░
    ░░░██║░░░╚█████╔╝░░░██║░░░██████╦╝╚█████╔╝██╔╝╚██╗
    ░░░╚═╝░░░░╚════╝░░░░╚═╝░░░╚═════╝░░╚════╝░╚═╝░░╚═╝`
  );
  console.log('\x1b[36m%s\x1b[0m', '\n\n Visit http://localhost:3001');

  // server.printUrls()
}