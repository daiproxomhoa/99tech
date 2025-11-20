/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { codeInspectorPlugin } from "code-inspector-plugin";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [
    tailwindcss(),
    svgr({
      include: "**/*.svg?react",
    }),
    codeInspectorPlugin({
      bundler: "vite",
    }),
  ],
  test: {
    globals: true, // dùng describe, test, expect không cần import
    environment: "jsdom",
    browser: {
      provider: playwright(),
      enabled: true,
      // at least one instance is required
      instances: [{ browser: "chromium" }],
    },
  },
});
