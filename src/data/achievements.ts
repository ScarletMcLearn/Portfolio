import type { AchievementItem } from './types';

export const achievements: AchievementItem[] = [
  {
    discipline: 'software-engineering',
    title: 'Backend service and API design',
    description:
      'Designed and built backend services and REST APIs across Django REST Framework and FastAPI, including database modeling and integration work for internal tooling.',
  },
  {
    discipline: 'software-engineering',
    title: 'Developer tooling and automation platforms',
    description:
      'Built reusable developer tooling — including data-collection and workflow-automation utilities in Python and TypeScript — published as public repositories.',
  },
  {
    discipline: 'software-engineering',
    title: 'CI/CD and containerized delivery',
    description:
      'Contributed to containerized (Docker) development and deployment workflows integrated with GitHub Actions and Jenkins pipelines.',
  },
  {
    discipline: 'quality-engineering',
    title: 'Automation frameworks built from scratch',
    description:
      'Designed scalable test-automation frameworks across Playwright, Cypress, and Selenium, contributing to reported test-cycle improvements of up to 80% across selected engagements.',
  },
  {
    discipline: 'quality-engineering',
    title: 'CI/CD quality gates',
    description:
      'Established automated quality gates integrated into CI/CD pipelines (GitHub Actions, Jenkins), helping catch regressions before release.',
  },
  {
    discipline: 'quality-engineering',
    title: 'API, contract, and performance coverage',
    description:
      'Expanded API and regression coverage using REST Assured, Postman, Schemathesis, and Pact, and introduced performance testing with JMeter, Locust, and Artillery into delivery pipelines.',
  },
  {
    discipline: 'quality-engineering',
    title: 'Mentorship and cross-functional delivery',
    description:
      'Mentored engineers on automation best practices and coordinated with development, product, and DevOps teams across international, distributed engagements.',
  },
  {
    discipline: 'data-science-ai',
    title: 'Broad applied machine-learning portfolio',
    description:
      'Built and published a wide public portfolio of applied notebooks spanning NLP, recommendation systems, classification, clustering, and computer vision as a sustained technical practice.',
  },
  {
    discipline: 'data-science-ai',
    title: 'Traditional ML through transformer-based methods',
    description:
      'Worked hands-on across the modeling spectrum — from scikit-learn and gradient-boosted trees to CNNs and transformer-based NLP (BERT, Hugging Face) — as applied technique practice.',
  },
  {
    discipline: 'data-science-ai',
    title: 'LLM and applied AI experimentation',
    description:
      'Explored LLM fine-tuning (including QLoRA-based approaches) and retrieval-augmented generation patterns as part of ongoing applied-AI practice.',
  },
];
