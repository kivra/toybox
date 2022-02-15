#!/usr/bin/env -S node -r tsm
import { createViteServer } from "./vite-server";
import { buildApp } from "./vite-build";
import { getConfig } from "./get-config";
import { updateStoryImportPath, updateStoryWrapperImportPath } from "./util";

async function run() {
  const file = process.cwd() + "/toybox.config.ts";
  const config = await getConfig(file);
  updateStoryImportPath(config);
  updateStoryWrapperImportPath(config);

  if (process.argv.includes("build")) {
    await buildApp(config);
  } else {
    await createViteServer(config);
  }
}

run().catch((err) => console.error(err));