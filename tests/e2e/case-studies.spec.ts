import { test, expect } from '@playwright/test';

const sampleCaseStudies = [
  '/work/software-engineering/backend-api-integration-platform',
  '/work/quality-engineering/playwright-quality-platform',
  '/work/data-science-ai/nlp-text-classification-portfolio',
];

test.describe('Case study detail pages', () => {
  for (const path of sampleCaseStudies) {
    test(`${path} renders full case study structure`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Context' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Problem' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Outcomes' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Lessons' })).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'What can be discussed publicly' }),
      ).toBeVisible();
      await expect(page.getByText('Confidentiality')).toBeVisible();
      await expect(page.getByText('Evidence level')).toBeVisible();
    });
  }

  const allSlugs = [
    'software-engineering/backend-api-integration-platform',
    'software-engineering/automation-developer-tooling-platform',
    'software-engineering/data-driven-web-service-architecture',
    'quality-engineering/playwright-quality-platform',
    'quality-engineering/performance-quality-gates',
    'quality-engineering/api-contract-quality',
    'data-science-ai/nlp-text-classification-portfolio',
    'data-science-ai/recommendation-systems-portfolio',
    'data-science-ai/predictive-modeling-healthcare-vision',
  ];

  test('all 9 case study routes return 200', async ({ page }) => {
    for (const slug of allSlugs) {
      const response = await page.goto(`/work/${slug}`);
      expect(response?.status(), `/work/${slug}`).toBe(200);
    }
  });
});
