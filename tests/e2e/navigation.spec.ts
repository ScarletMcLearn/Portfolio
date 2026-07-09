import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('desktop primary nav links to key pages', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link', { name: 'Work' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Résumés' })).toBeVisible();

    await nav.getByRole('link', { name: 'Work' }).click();
    await expect(page).toHaveURL(/\/work\/?$/);
  });

  test('skip link is focusable and jumps to main content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skipLink).toBeFocused();
    await skipLink.click();
    await expect(page.locator('#main-content')).toBeInViewport();
  });
});

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('mobile nav toggle opens and closes the menu', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Toggle navigation menu' });
    const mobileNav = page.locator('#mobile-nav');

    await expect(mobileNav).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.click();
    await expect(mobileNav).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await mobileNav.getByRole('link', { name: 'Work' }).click();
    await expect(page).toHaveURL(/\/work\/?$/);
  });
});
