---
title: 'Recommendation Systems & Personalization'
discipline: 'data-science-ai'
projectType: 'applied-analysis'
summary: 'Applied practice building recommendation-system prototypes using collaborative filtering, content-based, and hybrid approaches.'
context: >
  A collection of public notebooks exploring recommendation-system techniques — collaborative
  filtering, content-based filtering, and hybrid TF-IDF/collaborative approaches — across
  book and product-recommendation datasets.
problem: >
  Recommendation systems require balancing multiple techniques (behavior-based vs. content-based)
  depending on data sparsity and cold-start conditions. This portfolio explores that trade-off
  space directly on public datasets.
constraints: >
  Offline, notebook-based exercises without live user interaction data, click-through tracking, or
  A/B testing infrastructure — evaluation is necessarily qualitative and dataset-bound.
role: >
  Independent practitioner: implemented and compared recommendation approaches on public datasets.
technologies:
  - Python
  - Scikit-learn
  - TF-IDF
  - K-nearest neighbours
outcomes:
  - 'Implemented collaborative-filtering and content-based recommenders on public book and product datasets.'
  - 'Built a hybrid recommender combining TF-IDF content similarity with collaborative-filtering signals.'
  - 'Practiced qualitative recommendation evaluation methodology in the absence of live interaction data.'
lessons:
  - Hybrid approaches meaningfully reduce cold-start weaknesses compared to pure collaborative filtering.
  - Offline recommendation quality is necessarily a proxy — real evaluation requires live user feedback this practice did not have access to.
publicEvidence: >
  All notebooks referenced are public on GitHub (github.com/ScarletMcLearn/DataScience).
confidentiality: 'public'
evidenceLevel: 'medium'
order: 2
featured: false
---

## Approach

Each recommender notebook starts from a public ratings or interaction dataset, builds a similarity
or prediction model (KNN, TF-IDF cosine similarity, or a hybrid blend), and reviews sample outputs
qualitatively for relevance.

## Additional notes

All notebooks are public and linked directly from the project listing.

## Selected notebooks

- Book recommendation system (K-nearest neighbours)
- Hybrid product recommendation (collaborative filtering + TF-IDF)
