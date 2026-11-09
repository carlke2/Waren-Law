import { ROUTES, TEAM_FILTER_PARAM } from '@waren/shared/constants';
import { NextResponse, type NextRequest } from 'next/server';
import { parseTeamFilter } from '@/lib/utils/content/team';
import { patternRedirect, withTrailingSlash } from '@/lib/utils/redirects/patterns';
import { insightsPageRedirect, tableRedirect } from '@/lib/utils/redirects/table';

const PERMANENT = 301;

function redirectTo(request: NextRequest, path: string, search = ''): NextResponse {
  // Built by hand because a cloned NextUrl copies the slash style of the incoming request.
  return NextResponse.redirect(`${request.nextUrl.origin}${path}${search}`, PERMANENT);
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname, search, searchParams } = request.nextUrl;
  const path = withTrailingSlash(pathname);
  const target =
    patternRedirect(path, searchParams) ??
    (await tableRedirect(path)) ??
    (await insightsPageRedirect(path));
  if (target) return redirectTo(request, target);
  if (path !== pathname) return redirectTo(request, path, search);
  // Each filter is pre-rendered at its own path, and the shareable link stays the query form.
  const practiceArea = parseTeamFilter(searchParams.get(TEAM_FILTER_PARAM) ?? undefined);
  if (path === ROUTES.team && practiceArea) {
    return NextResponse.rewrite(new URL(ROUTES.teamArea(practiceArea), request.nextUrl.origin));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/|_next/|brand/|admin(?:/|$)|.*\\.[a-zA-Z0-9]+$).*)'],
};
