#!/usr/bin/env node
import { createViteServer } from './vite-server';
import { getConfig } from './get-config';

async function run() {
  const file = process.cwd() + '/toybox.config.js';
  const config = await getConfig(file);
  await createViteServer(config);
}

run();


