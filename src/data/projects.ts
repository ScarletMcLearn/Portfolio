import type { DataScienceProject } from './types';

/**
 * Curated sample from a broader public notebook collection
 * (github.com/ScarletMcLearn/DataScience). These are documented as
 * applied-practice / technique-demonstration work — hands-on exploration
 * of modeling approaches on public datasets — not audited production
 * research. Reported accuracy figures are the notebook author's own
 * evaluation output and have not been independently verified; treat
 * them as self-reported, not certified.
 */
export const dataScienceProjects: DataScienceProject[] = [
  {
    slug: 'bert-text-classification',
    title: 'BERT-Based Text Classification',
    category: 'NLP & Text Classification',
    techniques: ['BERT', 'Hugging Face Transformers', 'Tokenization', 'Fine-tuning'],
    datasetContext: 'Multiclass text dataset for transformer-based classification practice.',
    evaluationApproach:
      'Train/validation split with accuracy and loss tracked across fine-tuning epochs, as reported in the notebook.',
    limitations:
      'Adapted from a published reference approach as a technique-learning exercise; not an original modeling method, and evaluation was not independently audited.',
    sourceLinks: [
      { label: 'Notebook on GitHub', url: 'https://github.com/ScarletMcLearn/DataScience/blob/master/Public/bert-text-classification-accuracy-98.ipynb' },
    ],
    projectType: 'notebook-experiment',
  },
  {
    slug: 'amazon-reviews-sentiment-analysis',
    title: 'Amazon Reviews Sentiment Analysis',
    category: 'NLP & Text Classification',
    techniques: ['Text preprocessing', 'Sentiment classification', 'Classical ML'],
    datasetContext: 'Large-scale Amazon product review dataset, balanced positive/negative classes.',
    evaluationApproach: 'Held-out test split with accuracy reported directly in the notebook output.',
    limitations:
      'Dataset was pre-balanced; real-world review distributions are typically imbalanced, so generalization is not guaranteed.',
    sourceLinks: [
      { label: 'Notebook on GitHub', url: 'https://github.com/ScarletMcLearn/DataScience/blob/master/Public/amazon-reviews-sentiment-analysis-accuracy=0.95.ipynb' },
    ],
    projectType: 'notebook-experiment',
  },
  {
    slug: 'spam-classification',
    title: 'Email Spam Classification',
    category: 'NLP & Text Classification',
    techniques: ['Multinomial Naive Bayes', 'Count vectorization', 'Text cleaning'],
    datasetContext: 'Labeled email/SMS spam dataset commonly used for classical NLP practice.',
    evaluationApproach: 'Train/test split with accuracy and confusion-matrix review.',
    limitations: 'Small, well-known benchmark dataset; results do not generalize to production email traffic.',
    sourceLinks: [
      { label: 'Notebook on GitHub', url: 'https://github.com/ScarletMcLearn/DataScience/blob/master/Public/spam-classification-multinomialnb-99-accuracy.ipynb' },
    ],
    projectType: 'notebook-experiment',
  },
  {
    slug: 'book-recommendation-system',
    title: 'Book Recommendation System',
    category: 'Recommendation Systems',
    techniques: ['Collaborative filtering', 'K-nearest neighbours', 'Content-based filtering'],
    datasetContext: 'Public book-ratings dataset used to build a recommendation pipeline.',
    evaluationApproach: 'Qualitative recommendation review and similarity-based evaluation, as shown in the notebook.',
    limitations:
      'No production A/B testing or ranking metrics; recommendation quality was assessed qualitatively, not against a held-out relevance benchmark.',
    sourceLinks: [
      { label: 'Notebook on GitHub', url: 'https://github.com/ScarletMcLearn/DataScience/blob/master/Public/book-recommendation-system-with-machine-learning.ipynb' },
    ],
    projectType: 'notebook-experiment',
  },
  {
    slug: 'product-recommendation-hybrid',
    title: 'Hybrid Product Recommendation (Collaborative Filtering + TF-IDF)',
    category: 'Recommendation Systems',
    techniques: ['Hybrid recommendation', 'TF-IDF', 'Collaborative filtering'],
    datasetContext: 'Public e-commerce/product interaction dataset.',
    evaluationApproach: 'Combined content- and behavior-based scoring compared qualitatively across sample users.',
    limitations: 'Offline notebook exercise; no live user feedback loop or click-through evaluation.',
    sourceLinks: [
      { label: 'Notebook on GitHub', url: 'https://github.com/ScarletMcLearn/DataScience/blob/master/Public/product-recommendation-hybrid_cf_tfidf.ipynb' },
    ],
    projectType: 'notebook-experiment',
  },
  {
    slug: 'breast-cancer-prediction',
    title: 'Breast Cancer Classification',
    category: 'Healthcare Classification',
    techniques: ['Feature scaling', 'Classical ML classifiers', 'Model comparison'],
    datasetContext: 'Public breast-cancer diagnostic dataset (Wisconsin-style features).',
    evaluationApproach: 'Train/test split with accuracy and classification-report metrics.',
    limitations:
      'Small, well-studied benchmark dataset; not a substitute for clinically validated diagnostic tooling.',
    sourceLinks: [
      { label: 'Notebook on GitHub', url: 'https://github.com/ScarletMcLearn/DataScience/blob/master/Public/breast-cancer-prediction-accuracy-98-24.ipynb' },
    ],
    projectType: 'notebook-experiment',
  },
  {
    slug: 'brain-tumor-cnn-classification',
    title: 'Brain Tumor Classification with CNN',
    category: 'Computer Vision',
    techniques: ['Convolutional neural networks', 'Image preprocessing', 'Binary classification'],
    datasetContext: 'Public medical-imaging dataset for tumor/no-tumor classification.',
    evaluationApproach: 'Train/validation accuracy tracked across training epochs, with confusion-matrix review.',
    limitations:
      'Research/demonstration dataset only; not validated for clinical use and not evaluated against radiologist ground truth.',
    sourceLinks: [
      { label: 'Notebook on GitHub', url: 'https://github.com/ScarletMcLearn/DataScience/blob/master/Public/brain-tumor-binary-classification-cnn-accuracy-99.ipynb' },
    ],
    projectType: 'notebook-experiment',
  },
  {
    slug: 'customer-churn-prediction',
    title: 'Customer Churn Prediction & Segmentation',
    category: 'Fraud & Churn Prediction',
    techniques: ['Neural network classification', 'Customer segmentation', 'Feature engineering'],
    datasetContext: 'Public telecom customer-churn dataset.',
    evaluationApproach: 'Classification accuracy alongside segmentation analysis to identify at-risk customer groups.',
    limitations: 'Static historical dataset; no live retraining or drift monitoring was implemented.',
    sourceLinks: [
      { label: 'Notebook on GitHub', url: 'https://github.com/ScarletMcLearn/DataScience/blob/master/Public/customer-churn-prediction-95-accuracy.ipynb' },
    ],
    projectType: 'notebook-experiment',
  },
  {
    slug: 'llm-fine-tuning-qlora',
    title: 'LLM Fine-Tuning with QLoRA',
    category: 'LLM Fine-Tuning',
    techniques: ['QLoRA', 'Parameter-efficient fine-tuning', 'Custom dataset preparation'],
    datasetContext: 'Custom instruction-style dataset for parameter-efficient LLM fine-tuning practice.',
    evaluationApproach: 'Qualitative output review pre/post fine-tuning, as documented in the notebook.',
    limitations:
      'Exploratory technique practice; no formal benchmark evaluation (e.g. held-out perplexity or task-specific scoring) was applied.',
    sourceLinks: [
      { label: 'Notebook on GitHub', url: 'https://github.com/ScarletMcLearn/DataScience/blob/master/Public/fine-tuning-llama-2-qlora-llm-custom-dataset.ipynb' },
    ],
    projectType: 'notebook-experiment',
  },
];
