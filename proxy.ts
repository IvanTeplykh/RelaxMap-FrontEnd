import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRIVATE_PREFIX_ROUTES = ['/locations/create', '/locations/edit'];
const AUTH_ROUTES = ['/login', '/register'];

function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

// /profile (власний профіль) — приватний лише як точний шлях;
// /profile/[id] (публічний профіль) — доступний усім.
function isPrivate(pathname: string): boolean {
  if (pathname === '/profile') return true;
  return matchesRoute(pathname, PRIVATE_PREFIX_ROUTES);
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  const hasAccessToken = request.cookies.has('accessToken');
  const hasRefreshToken = request.cookies.has('refreshToken');

  let isAuthenticated = hasAccessToken || hasRefreshToken;
  let rotatedCookies: string[] = [];

  // Silent session refresh: access token expired but refresh token is alive
  if (!hasAccessToken && hasRefreshToken) {
    try {
      const refreshResponse = await fetch(
        `${process.env.API_URL}/auth/refresh`,
        {
          method: 'POST',
          headers: { cookie: request.headers.get('cookie') ?? '' },
          cache: 'no-store',
        }
      );

      if (refreshResponse.ok) {
        rotatedCookies = refreshResponse.headers.getSetCookie();
      } else {
        isAuthenticated = false;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  const withRotatedCookies = (response: NextResponse): NextResponse => {
    for (const cookie of rotatedCookies) {
      response.headers.append('set-cookie', cookie);
    }
    return response;
  };

  if (isPrivate(pathname) && !isAuthenticated) {
    return withRotatedCookies(
      NextResponse.redirect(new URL('/login', request.url))
    );
  }

  if (matchesRoute(pathname, AUTH_ROUTES) && isAuthenticated) {
    return withRotatedCookies(NextResponse.redirect(new URL('/', request.url)));
  }

  return withRotatedCookies(NextResponse.next());
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/locations/create/:path*',
    '/locations/edit/:path*',
    '/login',
    '/register',
  ],
};
