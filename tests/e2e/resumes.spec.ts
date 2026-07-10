import { test, expect } from '@playwright/test';

test.describe('Resumes', () => {
  test('resumes page lists all three resume variants', async ({ page }) => {
    await page.goto('/resumes');
    await expect(page.getByRole('heading', { name: 'Software Engineer Resume' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'SQA Automation Engineer Resume' }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data Scientist Resume' })).toBeVisible();
  });

  test('all résumé PDF links resolve with a 200 status', async ({ page, request }) => {
    await page.goto('/resumes');
    const hrefs = await page
      .locator('a[href*="/resume/"]')
      .evaluateAll((els) => els.map((el) => (el as HTMLAnchorElement).href));
    expect(hrefs.length).toBe(3);
    for (const href of hrefs) {
      const response = await request.get(href);
      expect(response.status(), href).toBe(200);
      expect(response.headers()['content-type']).toContain('application/pdf');
    }
  });

  test('hero "View Resumes" CTA links to the resumes page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'View Resumes' }).click();
    await expect(page).toHaveURL(/\/resumes\/?$/);
  });
});
