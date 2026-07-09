import { test, expect } from '@playwright/test';

const disciplinePages = [
  { path: '/software-engineering', heading: 'Software Engineering' },
  { path: '/quality-engineering', heading: 'Quality Engineering' },
  { path: '/data-science-ai', heading: 'Data Science & AI' },
];

test.describe('Discipline landing pages', () => {
  for (const { path, heading } of disciplinePages) {
    test(`${path} renders with correct heading and structure`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByText(heading, { exact: true }).first()).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Key capabilities' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'Interested in working together?' }),
      ).toBeVisible();
    });
  }

  test('data-science-ai page shows the applied notebook portfolio', async ({ page }) => {
    await page.goto('/data-science-ai');
    await expect(page.getByRole('heading', { name: 'Applied notebook portfolio' })).toBeVisible();
    await expect(page.getByText('NLP & Text Classification').first()).toBeVisible();
  });
});
