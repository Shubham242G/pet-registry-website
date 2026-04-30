// middleware.ts - Place this in your project root (same level as package.json)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This prevents back/forward button from accessing protected routes without validation
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');
  
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/pages/dashboard');
  
  if (isProtectedRoute && !token) {
    // Redirect to home if trying to access protected route without token
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/pages/dashboard/:path*',
    '/pages/profile/:path*',
    // Add other protected routes here
  ],
};