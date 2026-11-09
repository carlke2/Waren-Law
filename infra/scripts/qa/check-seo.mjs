// Usage: node infra/scripts/qa/check-seo.mjs <siteUrl> <expectedIndexable: true|false> <path> ...
// Checks canonical, Open Graph, robots and JSON-LD on rendered pages.
const [siteUrl, indexable, ...paths] = process.argv.slice(2);
const expectIndexable = indexable === 'true';

const REQUIRED = {
  LegalService: ['name', 'url', 'address', 'telephone'],
  Organization: ['name', 'url', 'logo'],
  WebSite: ['name', 'url', 'potentialAction'],
  Person: ['name', 'jobTitle', 'url'],
  Article: ['headline', 'author', 'image', 'datePublished', 'publisher'],
  FAQPage: ['mainEntity'],
  Event: ['name', 'startDate', 'location'],
  BreadcrumbList: ['itemListElement'],
};

const meta = (html, attribute, name) => {
  const tag = html.match(new RegExp(`<meta[^>]*${attribute}="${name}"[^>]*>`));
  return tag?.[0].match(/content="([^"]*)"/)?.[1] ?? null;
};

let problems = 0;
const seen = new Set();
const report = (path, message) => {
  problems += 1;
  console.log(`FAIL ${path}: ${message}`);
};

for (const path of paths) {
  const html = await (await fetch(new URL(path, siteUrl))).text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical !== `${siteUrl}${path.split('?')[0]}`) report(path, `canonical is ${canonical}`);
  for (const [attribute, name] of [
    ['property', 'og:title'],
    ['property', 'og:image'],
    ['property', 'og:url'],
    ['name', 'description'],
    ['name', 'twitter:card'],
  ]) {
    if (!meta(html, attribute, name)) report(path, `missing ${name}`);
  }
  const image = meta(html, 'property', 'og:image');
  if (image && !image.startsWith('http')) report(path, `og:image isn't absolute: ${image}`);
  const robots = meta(html, 'name', 'robots') ?? '';
  if (!expectIndexable && !robots.includes('noindex')) report(path, 'should be noindex');
  if (expectIndexable && robots.includes('noindex')) report(path, 'should be indexable');
  const verification = meta(html, 'name', 'google-site-verification');
  if (Boolean(verification) !== expectIndexable)
    report(path, 'verification tag is wrong for this mode');

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  if (!blocks.length) report(path, 'no JSON-LD');
  for (const [, text] of blocks) {
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      report(path, 'JSON-LD does not parse');
      continue;
    }
    if (data['@context'] !== 'https://schema.org') report(path, 'JSON-LD has the wrong context');
    for (const type of [data['@type']].flat()) {
      seen.add(type);
      for (const field of REQUIRED[type] ?? []) {
        if (data[field] === undefined) report(path, `${type} is missing ${field}`);
      }
    }
  }
}
console.log(
  `${paths.length} pages checked, ${problems} problems. JSON-LD types seen: ${[...seen].sort().join(', ')}`,
);
process.exitCode = problems ? 1 : 0;
