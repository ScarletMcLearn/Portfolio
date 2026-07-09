---
title: 'Predictive Modeling: Healthcare, Churn & Computer Vision'
discipline: 'data-science-ai'
projectType: 'applied-analysis'
summary: 'Applied classification and CNN-based computer-vision practice across healthcare, churn, and medical-imaging public datasets.'
context: >
  A set of public notebooks applying classical classification and convolutional neural networks to
  healthcare-related and churn-prediction datasets, documenting hands-on practice across the
  modeling spectrum from tabular classifiers to image-based CNNs.
problem: >
  Different prediction problems (tabular healthcare classification, customer churn, medical-image
  classification) call for different modeling approaches. This portfolio practices selecting and
  applying the right technique per problem shape.
constraints: >
  Public benchmark datasets only (e.g. breast-cancer diagnostic features, telecom churn, medical
  imaging sets) — not clinically validated data, and not evaluated against expert-labeled ground
  truth beyond the dataset's own labels.
role: >
  Independent practitioner: selected datasets, applied appropriate classifiers/CNNs, and evaluated
  using standard train/test methodology.
technologies:
  - Python
  - Scikit-learn
  - TensorFlow
  - Keras
  - CNNs
outcomes:
  - 'Applied classical classifiers to structured healthcare and churn datasets with train/test evaluation.'
  - 'Built a CNN-based image classifier for a medical-imaging (brain tumor) binary-classification dataset.'
  - 'Practiced consistent evaluation methodology (train/validation splits, confusion matrices) across tabular and image-based problems.'
lessons:
  - CNN-based image classification and tabular classification require materially different data-preparation pipelines and evaluation instincts.
  - Public medical-imaging datasets are useful for technique practice but are not a substitute for clinically validated model evaluation.
publicEvidence: >
  All notebooks referenced are public on GitHub (github.com/ScarletMcLearn/DataScience). These are
  explicitly documented as applied-practice exercises, not clinically validated or production
  models.
confidentiality: 'public'
evidenceLevel: 'medium'
order: 3
featured: true
---

## Approach

Tabular problems (breast-cancer classification, customer churn) followed a standard pipeline:
feature scaling, model comparison across a few classical classifiers, and evaluation via accuracy
and confusion matrix. The image-based problem (brain-tumor CNN classification) required a separate
pipeline: image preprocessing, a convolutional architecture, and training/validation-accuracy
tracking across epochs.

## Additional notes

All notebooks are public and linked directly. None of this work is clinically validated — it is
explicitly technique-practice on public benchmark datasets, and is described that way throughout
this portfolio.

## Selected notebooks

- Breast cancer classification
- Customer churn prediction & segmentation
- Brain tumor classification with CNN
