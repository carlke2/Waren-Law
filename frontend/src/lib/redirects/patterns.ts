import { ROUTES } from '@waren/shared/constants';

const CHINESE_PREFIX = /^\/zh(\/.*)?$/;
const AUTHOR_ARCHIVE = /^(\/zh)?\/author(\/|$)/;
const TAG_ARCHIVE = /^\/tag(\/|$)/;
const MAILPOET_PARAM = 'mailpoet_page';

export function patternRedirect(path: string, query: URLSearchParams): string | null {
  if (query.has(MAILPOET_PARAM)) return ROUTES.insights;
  if (AUTHOR_ARCHIVE.test(path)) return ROUTES.team;
  if (TAG_ARCHIVE.test(path)) return ROUTES.insights;
  const chinese = path.match(CHINESE_PREFIX);
  if (chinese) return chinese[1] && chinese[1] !== '/' ? chinese[1] : ROUTES.home;
  return null;
}

const INSIGHTS_PAGE = /^\/insights\/page\/(\d+)\/$/;

export function lastPageRedirect(path: string, lastPage: number): string | null {
  const page = path.match(INSIGHTS_PAGE)?.[1];
  return page && Number(page) > lastPage ? ROUTES.insightsPage(lastPage) : null;
}

export function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}
