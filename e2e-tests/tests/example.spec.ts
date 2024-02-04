import { test, expect } from "@playwright/test";

const url = "http://localhost:5173";

test("user sign in", async ({ page }) => {
  await page.goto(url);

  await expect(page.getByRole("link", { name: "Register" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();

  await page.getByRole("link", { name: "Sign in" }).click();
  await expect(page.locator('span:text("Login")')).toBeVisible();

  await page.locator("input[name='email']").fill("test@gmail.com");
  await page.locator("input[name='password']").fill("123456");
  await page.locator("button[type='submit']").click();

  await expect(page.locator('span:text("Login succesfully")')).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Hotels" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();

  await page.getByRole("link", { name: "Logout" }).click();
  await expect(page.locator('span:text("Logout successfully")')).toBeVisible();

  await expect(page.locator('span:text("Register")')).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
});
