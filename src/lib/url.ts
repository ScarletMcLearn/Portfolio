/**
 * Joins the site's base path with a relative path, guaranteeing exactly one
 * slash between them regardless of whether BASE_URL ends with a trailing
 * slash (Astro's behavior here varies with the `base` / `trailingSlash`
 * config combination, so this must not assume either).
 */
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL;
  const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const hashIndex = path.indexOf('#');
  const pathPart = hashIndex === -1 ? path : path.slice(0, hashIndex);
  const hashPart = hashIndex === -1 ? '' : path.slice(hashIndex);
  const trimmedPath = pathPart.startsWith('/') ? pathPart.slice(1) : pathPart;
  const joined = trimmedPath ? `${trimmedBase}/${trimmedPath}` : trimmedBase || '/';
  return `${joined}${hashPart}`;
}
