import { NextResponse, type NextRequest } from 'next/server';
import { patternRedirect, withTrailingSlash } from '@/lib/redirects/patterns';
import { insightsPageRedirect, tableRedirect } from '@/lib/redirects/table';

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
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/|_next/|brand/|admin(?:/|$)|.*\\.[a-zA-Z0-9]+$).*)'],
};
