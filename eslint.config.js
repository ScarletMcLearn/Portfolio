// @ts-check
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**', 'test-results/**', 'playwright-report/**'],
  },
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      'astro/no-set-html-directive': 'error',
    },
  },
  {
    // BaseLayout emits JSON-LD via set:html from an internally constructed object
    // (JSON.stringify of static profile/social data, never user input) — the standard
    // Astro pattern for structured data. Safe to exempt from the XSS-focused rule here.
    files: ['src/layouts/BaseLayout.astro'],
    rules: {
      'astro/no-set-html-directive': 'off',
    },
  },
];
