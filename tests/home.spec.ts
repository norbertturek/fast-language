import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the main title", async ({ page }) => {
    const title = page.getByTestId("main-title");
    await expect(title).toBeVisible();
    await expect(title).toHaveText("Fast Language");
  });

  test("should display the subtitle", async ({ page }) => {
    const subtitle = page.getByTestId("subtitle");
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText("fullstack Next.js");
  });

  test("should show add form when clicking add button", async ({ page }) => {
    const addButton = page.getByTestId("show-form-button");
    await expect(addButton).toBeVisible();

    await addButton.click();

    const form = page.getByTestId("add-item-form");
    await expect(form).toBeVisible();
  });

  test("should display empty items message initially", async ({ page }) => {
    const emptyMessage = page.getByTestId("empty-message");
    await expect(emptyMessage).toBeVisible();
    await expect(emptyMessage).toContainText("No items yet");
  });

  test("should have footer with API info", async ({ page }) => {
    const footer = page.getByTestId("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("/api/items");
  });
});
