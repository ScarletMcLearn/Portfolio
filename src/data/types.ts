export type Discipline =
  | 'software-engineering'
  | 'quality-engineering'
  | 'data-science-ai'
  | 'multidisciplinary';

export interface DisciplineMeta {
  id: Discipline;
  label: string;
  shortLabel: string;
  tagline: string;
}

export const DISCIPLINES: Record<Discipline, DisciplineMeta> = {
  'software-engineering': {
    id: 'software-engineering',
    label: 'Software Engineering',
    shortLabel: 'Software Engineering',
    tagline: 'Backend systems, APIs, and developer tooling.',
  },
  'quality-engineering': {
    id: 'quality-engineering',
    label: 'Quality Engineering',
    shortLabel: 'Quality Engineering',
    tagline: 'Automation platforms and delivery safeguards.',
  },
  'data-science-ai': {
    id: 'data-science-ai',
    label: 'Data Science & AI',
    shortLabel: 'Data Science & AI',
    tagline: 'Applied machine learning and data-driven analysis.',
  },
  multidisciplinary: {
    id: 'multidisciplinary',
    label: 'Multidisciplinary',
    shortLabel: 'Cross-Discipline',
    tagline: 'Where engineering, quality, and data intersect.',
  },
};

export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'kaggle' | 'email';
}

export interface ExperienceItem {
  company: string;
  companyLocation: string;
  role: string;
  startDate: string;
  endDate: string;
  disciplines: Discipline[];
  summary: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
}

export interface SkillSubgroup {
  name: string;
  items: string[];
}

export interface SkillGroup {
  discipline: Discipline;
  title: string;
  description: string;
  subgroups: SkillSubgroup[];
}

export interface AchievementItem {
  discipline: Discipline;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
}

export type ProjectType =
  | 'case-study'
  | 'notebook-experiment'
  | 'applied-analysis'
  | 'demonstration';

export type EvidenceLevel = 'high' | 'medium' | 'low';

export interface SourceLink {
  label: string;
  url: string;
}

export interface DataScienceProject {
  slug: string;
  title: string;
  category: string;
  techniques: string[];
  datasetContext: string;
  evaluationApproach: string;
  limitations: string;
  sourceLinks: SourceLink[];
  projectType: ProjectType;
}

export interface ResumeVariant {
  id: 'software-engineering' | 'quality-engineering' | 'data-science-ai';
  label: string;
  filename: string;
  bestFor: string;
  description: string;
}
