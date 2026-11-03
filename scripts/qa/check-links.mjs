// Usage: node scripts/qa/check-links.mjs <siteUrl>
// Crawls the site from the home page and reports internal links and images that don't return 200.
const [siteUrl] = process.argv.slice(2);
const origin = new URL(siteUrl).origin;

const pending = ['/'];
const seen = new Set(pending);
const problems = [];
const assets = new Set();
const external = new Set();

function decode(value) {
  return value.replaceAll('&amp;', '&');
}

while (pending.length) {
  const path = pending.shift();
  const response = await fetch(new URL(path, origin), { redirect: 'manual' });
  if (response.status !== 200) {
    problems.push(`${path}: ${response.status}`);
    continue;
  }
  if (!response.headers.get('content-type')?.includes('text/html')) continue;
  const html = await response.text();
  for (const [, raw] of html.matchAll(/<a[^>]*\shref="([^"]+)"/g)) {
    const href = decode(raw);
    if (/^(mailto:|tel:)/.test(href)) continue;
    const url = new URL(href, origin);
    if (url.origin !== origin) {
      external.add(url.origin);
      continue;
    }
    const internal = `${url.pathname}${url.search}`;
    if (!seen.has(internal)) {
      seen.add(internal);
      pending.push(internal);
    }
  }
  for (const [, raw] of html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)) assets.add(decode(raw));
}

for (const asset of assets) {
  const response = await fetch(new URL(asset, origin));
  if (response.status !== 200) problems.push(`image ${asset}: ${response.status}`);
}

console.log(`${seen.size} internal pages, ${assets.size} images, ${problems.length} problems`);
console.log(`External sites linked: ${[...external].sort().join(', ')}`);
problems.forEach((problem) => console.log(`FAIL ${problem}`));
process.exitCode = problems.length ? 1 : 0;
