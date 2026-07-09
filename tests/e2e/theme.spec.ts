import { test, expect } from '@playwright/test';

test.describe('Theme switching', () => {
  test('toggles theme, updates attribute, and persists via localStorage', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const toggle = page.getByRole('button', { name: 'Toggle color theme' });

    const initialTheme = await html.getAttribute('data-theme');
    await toggle.click();
    const nextTheme = await html.getAttribute('data-theme');
    expect(nextTheme).not.toBe(initialTheme);

    const stored = await page.evaluate(() => localStorage.getItem('theme'));
    expect(stored).toBe(nextTheme);

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', nextTheme ?? '');
  });

  test('produces no console errors when toggling', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/');
    await page.getByRole('button', { name: 'Toggle color theme' }).click();
    expect(errors).toEqual([]);
  });
});
