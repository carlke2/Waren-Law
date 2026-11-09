// Usage: node infra/scripts/qa/check-urls.mjs <siteUrl> <inventoryCsv> <reportPath>
// Each inventory URL must return 200 at its own path, or one 301 to its proposed_new_url.
import { readFileSync, writeFileSync } from 'node:fs';

const [siteUrl, inventoryPath, reportPath] = process.argv.slice(2);

function parseCsvLine(line) {
  const cells = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (quoted && char === '"' && line[i + 1] === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) {
      cells.push(cell);
      cell = '';
    } else cell += char;
  }
  cells.push(cell);
  return cells;
}

const [header, ...lines] = readFileSync(inventoryPath, 'utf8').trim().split('\n');
const columns = parseCsvLine(header);
const rows = lines.map((line) => {
  const cells = parseCsvLine(line);
  return Object.fromEntries(columns.map((name, index) => [name, cells[index]]));
});

async function check(row) {
  const expected = row.proposed_new_url;
  const response = await fetch(new URL(row.url, siteUrl), { redirect: 'manual' });
  const location = response.headers.get('location');
  const target = location ? new URL(location, siteUrl) : null;
  const landedOn = target ? `${target.pathname}${target.search}` : '';
  let problem = '';
  if (expected === row.url) {
    if (response.status !== 200) problem = `expected 200, got ${response.status}`;
  } else if (response.status !== 301) {
    problem = `expected 301, got ${response.status}`;
  } else if (landedOn !== expected) {
    problem = `redirected to ${landedOn}, expected ${expected}`;
  } else {
    const final = await fetch(target, { redirect: 'manual' });
    if (final.status !== 200) problem = `target returned ${final.status}, so not one hop to a page`;
  }
  return { ...row, status: response.status, landedOn, problem };
}

const results = [];
for (const row of rows) results.push(await check(row));
const failures = results.filter(({ problem }) => problem);

const table = results
  .map(
    ({ url, status, landedOn, problem }) =>
      `| \`${url}\` | ${status} | ${landedOn ? `\`${landedOn}\`` : '-'} | ${problem ? `FAIL: ${problem}` : 'OK'} |`,
  )
  .join('\n');

writeFileSync(
  reportPath,
  `# V1 URL check\n\nEach URL in \`docs/seo/url-inventory.csv\`, checked against a production build.\n\n**Result: ${results.length - failures.length} passed, ${failures.length} failed, of ${results.length}.**\n\n| URL | Status | Redirects to | Result |\n|---|---|---|---|\n${table}\n`,
);
console.log(`${results.length - failures.length} passed, ${failures.length} failed`);
failures.forEach(({ url, problem }) => console.log(`FAIL ${url}: ${problem}`));
process.exitCode = failures.length ? 1 : 0;
