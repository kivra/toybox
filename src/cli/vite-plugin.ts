import reactRefresh from '@vitejs/plugin-react-refresh';
import type { Plugin } from 'vite';

function markdownRawPlugin(): Plugin {
  return {
    name: 'markdown-raw-plugin',
    transform(code, filePath) {
      if (/\.(md)$/.test(filePath)) {
        const json = JSON.stringify(code)
          .replace(/\u2028/g, '\\u2028')
          .replace(/\u2029/g, '\\u2029');

        return {
          code: `export default ${json}`,
        };
      }
      return undefined;
    },
  };
}

function viteReactJsx(): Plugin {
  return {
    name: 'react-inserter-jsx',
    enforce: 'pre',
    config: () => ({
      resolve: {
        dedupe: ['react', 'react-dom'],
      },
    }),
    transform(code, filePath) {
      const jsxFileReg = /\.[tj]sx$/;
      const reactReg = /(^|\n)import React[ ,]/;
      if (jsxFileReg.test(filePath) && !reactReg.test(code)) {
        return `import React from 'react';` + code;
      }
      return undefined;
    },
  };
}

export const plugins = [reactRefresh(), markdownRawPlugin(), viteReactJsx()];