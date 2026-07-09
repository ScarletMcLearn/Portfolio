import type { Discipline } from './types';

export interface CapabilityGroup {
  discipline: Discipline;
  title: string;
  items: string[];
}

export const problemsICanSolve: CapabilityGroup[] = [
  {
    discipline: 'software-engineering',
    title: 'Software Engineering',
    items: [
      'Design and build maintainable backend services',
      'Develop REST APIs and third-party service integrations',
      'Modernize legacy backend systems',
      'Design database models and data-access layers',
      'Build internal developer tools and automation platforms',
      'Containerize applications and establish CI/CD workflows',
    ],
  },
  {
    discipline: 'quality-engineering',
    title: 'Quality Engineering',
    items: [
      'Build a test-automation platform from scratch',
      'Modernize Selenium suites with Playwright',
      'Add API, schema, and contract testing',
      'Establish release-quality gates in CI/CD',
      'Reduce flaky tests and execution time',
      'Design performance and load-testing strategy',
      'Mentor and scale a quality-engineering team',
    ],
  },
  {
    discipline: 'data-science-ai',
    title: 'Data Science & AI',
    items: [
      'Build predictive models for classification or regression tasks',
      'Analyze and prepare complex datasets',
      'Develop NLP and text-classification solutions',
      'Build recommendation-system prototypes',
      'Apply feature engineering and model comparison',
      'Explore LLM fine-tuning and retrieval-augmented approaches',
    ],
  },
];

export const collaborationStrengths: string[] = [
  'Ownership of outcomes, not just assigned tasks',
  'Clear cross-functional communication with developers, product, and DevOps',
  'Framework-first thinking over one-off scripts or notebooks',
  'Risk-based prioritization when time and coverage trade off',
  'Mentorship and knowledge-sharing across engineering and QA teams',
  'Practical, pragmatic automation — reliable over clever',
  'Continuous improvement of tooling, process, and team practices',
  'Comfortable operating across technical depth and business context',
];
