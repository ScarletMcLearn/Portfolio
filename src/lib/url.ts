/**
 * Joins the site's base path with a relative path, guaranteeing exactly one
 * slash between them regardless of whether BASE_URL ends with a trailing
 * slash (Astro's behavior here varies with the `base` / `trailingSlash`
 * config combination, so this must not assume either).
 */
export function withBase(path: string = ''): string {
  const base = import.meta.env.BASE_URL;
  const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const trimmedPath = path.startsWith('/') ? path.slice(1) : path;
  return trimmedPath ? `${trimmedBase}/${trimmedPath}` : `${trimmedBase}/`;
}
