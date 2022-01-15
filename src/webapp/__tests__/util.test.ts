import { isMarkdownStoryModule } from "../util";
import { describe, test, expect } from "vitest";
import { StoryModule } from "../../types";

describe("isMarkdownStoryModule", () => {
  test("A string as default export is regarded as markdown", () => {
    const module = {
      default: "## This is markdown",
    };

    const result = isMarkdownStoryModule(module);

    expect(result).toBe(true);
  });

  test("A story as export is regarded as markdown", () => {
    const module: StoryModule = {
      story: { header: { description: "My Story" }, stories: [] },
    };

    const result = isMarkdownStoryModule(module);

    expect(result).toBe(false);
  });
});
