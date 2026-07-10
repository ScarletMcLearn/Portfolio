import { promises as fs } from 'node:fs';
import { relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';

type FrontmatterValue = boolean | number | string | string[];
type FrontmatterData = Record<string, FrontmatterValue>;

const markdownExtension = /\.md$/i;

function parseScalar(rawValue: string): FrontmatterValue {
  const value = rawValue.trim();

  if (
    (value.startsWith("'") && value.endsWith("'")) ||
    (value.startsWith('"') && value.endsWith('"'))
  ) {
    return value.slice(1, -1);
  }

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  const numericValue = Number(value);
  if (value !== '' && Number.isFinite(numericValue)) {
    return numericValue;
  }

  return value;
}

function parseFrontmatterBlock(frontmatter: string): FrontmatterData {
  const data: FrontmatterData = {};
  const lines = frontmatter.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim() === '' || line.trimStart().startsWith('#')) {
      continue;
    }

    const match = /^([A-Za-z0-9_-]+):(?:\s*(.*))?$/.exec(line);
    if (!match) {
      continue;
    }

    const [, key, rawValue = ''] = match;

    if (rawValue === '>') {
      const blockLines: string[] = [];
      let cursor = index + 1;
      while (
        cursor < lines.length &&
        (lines[cursor].startsWith(' ') || lines[cursor].trim() === '')
      ) {
        blockLines.push(lines[cursor].trim());
        cursor += 1;
      }

      data[key] = blockLines.join(' ').replace(/\s+/g, ' ').trim();
      index = cursor - 1;
      continue;
    }

    if (rawValue === '') {
      const items: string[] = [];
      let cursor = index + 1;
      while (cursor < lines.length) {
        const itemMatch = /^\s*-\s+(.*)$/.exec(lines[cursor]);
        if (!itemMatch) {
          break;
        }

        items.push(String(parseScalar(itemMatch[1])));
        cursor += 1;
      }

      data[key] = items.length > 0 ? items : '';
      index = cursor - 1;
      continue;
    }

    data[key] = parseScalar(rawValue);
  }

  return data;
}

function splitFrontmatter(contents: string) {
  const normalized = contents.replace(/^\uFEFF/, '');
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(normalized);

  if (!match) {
    return { body: contents, data: {} };
  }

  return {
    body: normalized.slice(match[0].length),
    data: parseFrontmatterBlock(match[1]),
  };
}

function toPosixPath(filePath: string) {
  return filePath.replaceAll('\\', '/');
}

function hasErrorCode(error: unknown): error is { code: unknown } {
  return typeof error === 'object' && error !== null && 'code' in error;
}

function caseStudyLoader(): Loader {
  return {
    name: 'case-study-loader',
    async load({ config, parseData, renderMarkdown, store }) {
      const contentDir = new URL('content/case-studies/', config.srcDir);
      const projectRoot = fileURLToPath(config.root);

      async function readMarkdownFiles(directory: URL): Promise<URL[]> {
        try {
          const entries = await fs.readdir(directory, { withFileTypes: true });
          const urls = await Promise.all(
            entries.map((entry) => {
              const childUrl = new URL(
                entry.isDirectory() ? `${entry.name}/` : entry.name,
                directory,
              );
              return entry.isDirectory()
                ? readMarkdownFiles(childUrl)
                : Promise.resolve([childUrl]);
            }),
          );

          return urls.flat().filter((url) => markdownExtension.test(url.pathname));
        } catch (error) {
          if (hasErrorCode(error) && error.code === 'ENOENT') {
            return [];
          }

          throw error;
        }
      }

      store.clear();

      for (const fileUrl of await readMarkdownFiles(contentDir)) {
        const absolutePath = fileURLToPath(fileUrl);
        const relativePath = toPosixPath(relative(projectRoot, absolutePath));
        const relativeContentPath = toPosixPath(relative(fileURLToPath(contentDir), absolutePath));
        const id = relativeContentPath.replace(markdownExtension, '');
        const contents = await fs.readFile(fileUrl, 'utf8');
        const { body, data } = splitFrontmatter(contents);
        const parsedData = await parseData({ data, filePath: relativePath, id });
        const rendered = await renderMarkdown(body, { fileURL: pathToFileURL(absolutePath) });

        store.set({
          body,
          data: parsedData,
          digest: contents,
          filePath: relativePath,
          id,
          rendered,
        });
      }
    },
  };
}

const caseStudies = defineCollection({
  loader: caseStudyLoader(),
  schema: z.object({
    title: z.string(),
    discipline: z.enum([
      'software-engineering',
      'quality-engineering',
      'data-science-ai',
      'multidisciplinary',
    ]),
    projectType: z.enum(['case-study', 'notebook-experiment', 'applied-analysis', 'demonstration']),
    summary: z.string(),
    context: z.string(),
    problem: z.string(),
    constraints: z.string(),
    role: z.string(),
    technologies: z.array(z.string()),
    outcomes: z.array(z.string()),
    lessons: z.array(z.string()),
    publicEvidence: z.string(),
    confidentiality: z.enum(['public', 'anonymized', 'representative']),
    evidenceLevel: z.enum(['high', 'medium', 'low']),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  'case-studies': caseStudies,
};
