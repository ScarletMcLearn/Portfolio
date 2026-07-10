import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pagesToScan = [
  '/',
  '/quality-engineering',
  '/work/quality-engineering/playwright-quality-platform',
];

test.describe('Accessibility', () => {
  for (const path of pagesToScan) {
    test(`${path} has no serious or critical axe violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();

      const seriousOrCritical = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
    });
  }

  test('keyboard navigation reaches primary nav links in order', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab'); // skip link
    await page.keyboard.press('Tab'); // logo link
    await page.keyboard.press('Tab'); // first nav link
    const active = await page.evaluate(() => {
      const activeElement = document.activeElement;
      if (activeElement == null) {
        return '';
      }

      const textContent = activeElement.textContent;
      return typeof textContent === 'string' ? textContent.trim() : '';
    });
    expect(active).toBe('Home');
  });

  test('theme toggle button has an accessible name', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Toggle color theme' })).toBeVisible();
  });
});
