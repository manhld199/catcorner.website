import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    experimentalStudio: true,
    video: true,
    videosFolder: "public/test-videos", // Thư mục lưu video
  },
});
