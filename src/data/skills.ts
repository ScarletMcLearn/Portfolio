import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  {
    discipline: 'software-engineering',
    title: 'Software Engineering',
    description: 'Backend systems, APIs, data layers, and platform tooling.',
    subgroups: [
      { name: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Java'] },
      { name: 'Backend Frameworks', items: ['Django', 'Django REST Framework', 'FastAPI', 'Node.js', 'Express'] },
      { name: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'SQLAlchemy', 'Django ORM'] },
      { name: 'Cloud & DevOps', items: ['Docker', 'Docker Compose', 'AWS', 'Azure', 'Linux', 'GitHub Actions', 'Jenkins'] },
      { name: 'Architecture', items: ['REST API design', 'Service integration', 'Database modeling', 'Developer tooling'] },
    ],
  },
  {
    discipline: 'quality-engineering',
    title: 'Quality Engineering',
    description: 'Test architecture, automation platforms, and release-quality safeguards.',
    subgroups: [
      { name: 'UI Automation', items: ['Playwright', 'Cypress', 'Selenium', 'Robot Framework'] },
      { name: 'API & Contract Testing', items: ['REST Assured', 'Postman', 'SoapUI', 'Schemathesis', 'Pact', 'Ajv', 'Redocly CLI', 'OpenAPI'] },
      { name: 'Test Frameworks', items: ['PyTest', 'TestNG', 'JUnit', 'Behave', 'Cucumber / Gherkin'] },
      { name: 'Performance Engineering', items: ['JMeter', 'Locust', 'Artillery', 'k6'] },
      { name: 'CI/CD & Strategy', items: ['CI/CD quality gates', 'Regression strategy', 'Test-data management', 'Cross-browser testing', 'Release-quality strategy'] },
    ],
  },
  {
    discipline: 'data-science-ai',
    title: 'Data Science & AI',
    description: 'Applied machine learning, NLP, and model evaluation across public projects.',
    subgroups: [
      { name: 'ML Frameworks', items: ['Scikit-learn', 'TensorFlow', 'Keras', 'PyTorch', 'XGBoost', 'LightGBM', 'CatBoost'] },
      { name: 'NLP', items: ['NLTK', 'spaCy', 'Hugging Face Transformers', 'BERT', 'Text classification'] },
      { name: 'Modeling', items: ['Classification', 'Regression', 'Clustering', 'Recommendation systems', 'CNNs'] },
      { name: 'Applied AI', items: ['LLM fine-tuning', 'RAG', 'AI agents', 'Prompt engineering'] },
      { name: 'Workflow & Ops', items: ['Feature engineering', 'Model evaluation', 'MLflow', 'Data visualization'] },
    ],
  },
];
