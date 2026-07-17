import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which routes require authentication
const protectedRoutes = [
  '/dashboard',
  '/pets',
  '/registration',
  '/settings',
  '/profile',
  '/add-pet',           // ✅ Protected - only logged-in users
  '/api/pets',          // ✅ Protected API routes
  '/api/registration',  // ✅ Protected API routes
  '/api/payment',       // ✅ Protected API routes
];

// Define which routes are for public access
const publicRoutes = [
  '/',                  // Homepage
  '/login',             // Login
  '/register',          // Register
  '/dog-registration',  // ✅ Public - city selection page
  '/delhi',             // Public city pages
  '/noida',
  '/ghaziabad',
  '/gurugram',
  '/faridabad',
  '/blog',              // Public blog
  '/about-us',
  '/privacy-policy',
  '/terms-of-service',
  '/contact',
];

// Define static/public file paths that should always be accessible
const publicPaths = [
  '/_next',
  '/images',
  '/favicon.ico',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/og-image.jpg',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // ✅ Allow public paths immediately
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value;
  const isAuthenticated = !!token;
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  
  // ✅ Redirect unauthenticated users from protected routes
  if (!isAuthenticated && isProtectedRoute) {
    // Save the intended destination for post-login redirect
    const loginUrl = new URL('/', request.url);
    loginUrl.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // ✅ Redirect authenticated users away from login page to dashboard
  if (isAuthenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // ✅ Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately by your backend)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
};