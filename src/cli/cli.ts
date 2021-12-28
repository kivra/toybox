#!/usr/bin/env node -r tsm
import { createViteServer } from './vite-server';
import { getConfig } from './get-config';

async function run() {
  const file = process.cwd() + '/toybox.config.ts';
  const config = await getConfig(file);
  await createViteServer(config);
}

run();
