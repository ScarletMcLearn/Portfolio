import { test, expect } from '@playwright/test';

test.describe('Work page filtering', () => {
  test('all discipline sections are present without JavaScript filtering applied', async ({
    page,
  }) => {
    await page.goto('/work');
    await expect(
      page.getByRole('heading', { name: 'Software Engineering', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Quality Engineering', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Data Science & AI', exact: true }),
    ).toBeVisible();
  });

  test('filter buttons narrow visible sections', async ({ page }) => {
    await page.goto('/work');
    const qeSection = page.locator('.work-section[data-discipline="quality-engineering"]');
    const seSection = page.locator('.work-section[data-discipline="software-engineering"]');

    await page.getByRole('button', { name: 'Quality Engineering' }).click();
    await expect(qeSection).toBeVisible();
    await expect(seSection).toBeHidden();

    await page.getByRole('button', { name: 'All', exact: true }).click();
    await expect(seSection).toBeVisible();
  });

  test('all 9 case studies are reachable and return valid pages', async ({ page }) => {
    await page.goto('/work');
    const links = await page
      .locator('a[href*="/work/"]')
      .evaluateAll((els) =>
        els
          .map((el) => (el as HTMLAnchorElement).getAttribute('href'))
          .filter((h) => h && h !== '/work'),
      );
    expect(links.length).toBeGreaterThanOrEqual(9);
  });
});
