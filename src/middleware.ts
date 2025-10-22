import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SITE_CONFIG } from '@/lib/constants';

export function middleware(request: NextRequest) {
  // Skip middleware if maintenance mode is disabled
  if (!SITE_CONFIG.MAINTENANCE_MODE_ENABLED) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Allow access to Sanity Studio
  if (pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  // Allow access to the maintenance page itself
  if (pathname === '/maintenance') {
    return NextResponse.next();
  }

  // Allow access to static assets (images, fonts, etc.)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|gif|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Redirect all other requests to maintenance page
  return NextResponse.redirect(new URL('/maintenance', request.url));
}

// Configure which routes the middleware runs on
export const config = {
  // Match all routes except static files and internal Next.js routes
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, apple-icon.png, icon1.png, icon2.png (favicons)
     */
    '/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon1.png|icon2.png).*)',
  ],
};
