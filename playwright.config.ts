import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/uat", timeout: 30000, expect: { timeout: 7000 }, workers: 2, retries: 0,
  reporter: [["list"], ["json", { outputFile: "test-results/uat.json" }], ["html", { open: "never" }]],
  use: { baseURL: process.env.BASE_URL || "http://localhost:3118", trace: "off", screenshot: "only-on-failure" },
  webServer: process.env.BASE_URL ? undefined : {
    command: "npm run build && npx next start --port 3118", url: "http://localhost:3118", timeout: 180000, reuseExistingServer: false,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
  ],
});
