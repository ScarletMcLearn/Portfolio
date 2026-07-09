import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders hero, pillars, and metrics', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Syed Shams Elahi/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'I build reliable software',
    );
    await expect(page.getByRole('link', { name: 'Explore Software Engineering' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explore Quality Engineering' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explore Data Science & AI' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Credibility metrics' })).toBeVisible();
  });

  test('shows all three pillar overview cards with equal structure', async ({ page }) => {
    await page.goto('/');
    const pillars = page.getByRole('region', { name: 'Three professional pillars' });
    await expect(pillars.getByRole('heading', { name: 'Software Engineering' })).toBeVisible();
    await expect(pillars.getByRole('heading', { name: 'Quality Engineering' })).toBeVisible();
    await expect(pillars.getByRole('heading', { name: 'Data Science & AI' })).toBeVisible();
  });

  test('testimonials section is absent when there are no verified testimonials', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'What colleagues say' })).toHaveCount(0);
  });

  test('footer copyright line renders with correct spacing', async ({ page }) => {
    // Regression test: an Astro whitespace-collapse issue previously rendered
    // this as "© 2026Syed Shams Elahi" (missing space) when two adjacent
    // expressions were split across lines in the template.
    await page.goto('/');
    const footerText = await page.locator('footer').innerText();
    expect(footerText).not.toMatch(/\d{4}[A-Za-z]/);
    expect(footerText).toContain('Syed Shams Elahi. Built with Astro');
  });

  test('has no obvious horizontal overflow at common widths', async ({ page }) => {
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    }
  });
});
