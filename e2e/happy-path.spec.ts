import { expect, test } from '@playwright/test';

test('English happy path: water, habit, workout', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: /Good (morning|afternoon|evening)/ }),
  ).toBeVisible();

  // Add a glass of water.
  await page.getByRole('button', { name: 'Add a glass' }).click();

  // Mark the focus habit.
  await page.getByRole('link', { name: 'Habits' }).first().click();
  await expect(page.getByRole('heading', { name: 'Habits', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Done' }).click();
  await expect(page.getByText(/day streak/)).toBeVisible();

  // Open a workout, then close the player.
  await page.getByRole('link', { name: 'Move' }).first().click();
  await page.getByRole('button', { name: /Wake-up 5/ }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('Arabic happy path: switches to RTL and shows Egyptian copy', async ({ page }) => {
  await page.goto('/');

  // Toggle to Arabic.
  await page.getByRole('button', { name: 'العربية' }).first().click();

  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.getByText('النهاردة').first()).toBeVisible();

  // The Eat screen shows a dish swap in Arabic.
  await page.getByRole('link', { name: 'الأكل' }).first().click();
  await page.getByRole('button', { name: /كشري/ }).click();
  await expect(page.getByText(/زوّد العدس والحمص/)).toBeVisible();
});

test('persists state across a reload (offline-capable)', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Add a glass' }).click();
  await page.getByRole('button', { name: 'Add a glass' }).click();

  await page.reload();
  // Two glasses survive the reload via localStorage.
  await expect(page.getByText('2', { exact: true }).first()).toBeVisible();
});
