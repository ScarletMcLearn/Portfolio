import { test, expect } from '@playwright/test';

const pagesToScan = [
  '/',
  '/work',
  '/software-engineering',
  '/quality-engineering',
  '/data-science-ai',
  '/resumes',
];

test.describe('Internal link integrity', () => {
  test('internal links across key pages resolve without 404s', async ({ page, request }) => {
    const seen = new Set<string>();

    for (const path of pagesToScan) {
      await page.goto(path);
      const hrefs = await page
        .locator('a[href]')
        .evaluateAll((els) => els.map((el) => (el as HTMLAnchorElement).href));

      for (const href of hrefs) {
        const url = new URL(href);
        const isInternal = url.hostname === 'localhost';
        const isAnchorOnly = url.pathname === new URL(page.url()).pathname && url.hash;
        if (!isInternal || isAnchorOnly || seen.has(href)) continue;
        seen.add(href);

        const response = await request.get(href);
        expect(response.status(), href).toBeLessThan(400);
      }
    }
  });

  test('external social links use safe target/rel attributes', async ({ page }) => {
    await page.goto('/');
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(externalLinks.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });
});
