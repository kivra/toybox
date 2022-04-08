import { MarkdownOrStoryModule, MarkdownStoryModule } from "../types";

export function isLazyComponent(
  module: (() => Promise<MarkdownOrStoryModule>) | MarkdownOrStoryModule
): module is () => Promise<MarkdownOrStoryModule> {
  return typeof module === 'function';
}

export function isMarkdownStoryModule(
  module: MarkdownOrStoryModule
): module is MarkdownStoryModule {
  return 'default' in module && typeof module.default === 'string';
}
