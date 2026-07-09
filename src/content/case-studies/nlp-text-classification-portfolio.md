---
title: 'NLP & Text Classification Portfolio'
discipline: 'data-science-ai'
projectType: 'applied-analysis'
summary: 'Applied practice across text-classification techniques — from classical ML to transformer-based models — on public datasets.'
context: >
  A sustained public practice of applying NLP techniques to text-classification problems, spanning
  classical machine learning (Naive Bayes) through transformer-based approaches (BERT), documented
  as notebooks on GitHub.
problem: >
  Text classification spans a wide technique space — bag-of-words methods, TF-IDF, and modern
  transformer embeddings all solve the same class of problem differently. This portfolio is about
  building hands-on fluency across that range rather than a single production deployment.
constraints: >
  These are notebook-based, dataset-driven exercises using public datasets (Amazon reviews, spam/ham
  datasets, and similar) — not production systems with live traffic or SLAs.
role: >
  Independent practitioner: selected datasets, applied and adapted modeling techniques, and
  evaluated results using standard train/test methodology.
technologies:
  - Python
  - Scikit-learn
  - NLTK
  - Hugging Face Transformers
  - BERT
outcomes:
  - 'Applied classical (Naive Bayes, TF-IDF) and transformer-based (BERT) approaches to multiple text-classification datasets.'
  - 'Practiced consistent evaluation methodology — train/test splits, accuracy, and confusion-matrix review — across notebooks.'
  - 'Built fluency in the trade-offs between lightweight classical models and heavier transformer-based approaches.'
lessons:
  - Classical models remain a strong, fast baseline; transformer-based approaches earn their cost on harder semantic tasks.
  - Reported notebook accuracy on curated public datasets is not evidence of production-readiness — it's a controlled learning signal.
publicEvidence: >
  All referenced notebooks are public on GitHub (github.com/ScarletMcLearn/DataScience). One
  notebook (BERT-based classification) is explicitly adapted from a published reference approach,
  credited in-notebook, and used here as technique practice rather than original research.
confidentiality: 'public'
evidenceLevel: 'medium'
order: 1
featured: true
---

## Approach

Each notebook follows a consistent structure: dataset inspection and cleaning, feature
representation (bag-of-words/TF-IDF or transformer tokenization), model training, and evaluation
against a held-out split. The intent is documented technique practice — building working fluency
across the NLP toolchain on public, well-understood datasets.

## Additional notes

All of this work is public and linked directly. Reported accuracy figures come from the notebook
author's own evaluation cells and have not been independently audited — they should be read as
self-reported learning-exercise results, not production benchmarks.

## Selected notebooks

- BERT-based text classification (adapted from a published reference approach)
- Amazon reviews sentiment analysis
- Email spam classification (Multinomial Naive Bayes)
