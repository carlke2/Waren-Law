import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

interface Rule {
  name: string;
  pattern: RegExp;
}

export const THEME_RULES: readonly Rule[] = [
  { name: 'hex colour', pattern: /#[0-9a-fA-F]{3,8}\b/ },
  { name: 'colour function', pattern: /\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(/ },
  { name: 'pixel value', pattern: /\b\d+(?:\.\d+)?px\b/ },
  {
    name: 'font name',
    pattern:
      /\b(?:Newsreader|Manrope|Georgia|Arial|Helvetica|system-ui|sans-serif|serif|monospace)\b/,
  },
  { name: 'arbitrary Tailwind value', pattern: /(?<![\w-])(?!aria-|data-)[a-z][\w-]*-\[[^\]]+\]/ },
  {
    name: 'default Tailwind colour',
    pattern:
      /\b(?:bg|text|border|ring|fill|stroke|from|via|to|outline)-(?:white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)\b/,
  },
];

export function findThemeViolations(source: string): string[] {
  return source
    .split('\n')
    .flatMap((line, index) =>
      THEME_RULES.filter(({ pattern }) => pattern.test(line)).map(
        ({ name }) => `line ${index + 1}: ${name}: ${line.trim()}`,
      ),
    );
}

const FRONTEND_SOURCE = path.resolve(import.meta.dirname, '../frontend/src');
const CHECKED_DIRECTORIES = ['app', 'components'];
const CHECKED_FILES = ['styles/globals.css'];
const CHECKED_EXTENSIONS = new Set(['.ts', '.tsx', '.css']);

function filesIn(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && CHECKED_EXTENSIONS.has(path.extname(entry.name)))
    .map((entry) => path.join(entry.parentPath, entry.name));
}

function main(): void {
  const files = [
    ...CHECKED_DIRECTORIES.flatMap((directory) => filesIn(path.join(FRONTEND_SOURCE, directory))),
    ...CHECKED_FILES.map((file) => path.join(FRONTEND_SOURCE, file)),
  ];
  const problems = files.flatMap((file) =>
    findThemeViolations(readFileSync(file, 'utf8')).map(
      (problem) => `${path.relative(FRONTEND_SOURCE, file)} ${problem}`,
    ),
  );
  if (problems.length) {
    console.error(`Theme check failed:\n${problems.join('\n')}`);
    process.exit(1);
  }
  console.log(`Theme check passed: ${files.length} files`);
}

if (import.meta.main) main();
