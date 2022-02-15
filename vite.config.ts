import react from "@vitejs/plugin-react";
import { defineConfig, Plugin } from "vite";

function markdownRawPlugin(): Plugin {
  return {
    name: "markdown-raw-plugin",
    transform(code, filePath) {
      if (/\.(md)$/.test(filePath)) {
        const json = JSON.stringify(code)
          .replace(/\u2028/g, "\\u2028")
          .replace(/\u2029/g, "\\u2029");

        return {
          code: `export default ${json}`,
        };
      }
      return undefined;
    },
  };
}

export default defineConfig({ plugins: [react(), markdownRawPlugin()] });
