import { test, expect } from "@playwright/test";

test.describe("Todo App E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

test("todos persist after reload", async ({ page }) => {
  const input = page.getByTestId("todo-input");

  await input.fill("Persistent task");
  await input.press("Enter");

  // ✅ Wait until localStorage actually contains the todo
  await page.waitForFunction(() => {
    const data = localStorage.getItem("todos");
    return data && JSON.parse(data).length > 0;
  });

  await page.reload();

  await expect(page.getByText("Persistent task")).toBeVisible();
});


});
