import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of public routes that don't require authentication
const publicRoutes = ['/', '/sign-in', '/create-account'];

export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.has('isAuthenticated');
    const isPublicRoute = publicRoutes.some(route =>
        request.nextUrl.pathname === route ||
        request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.startsWith('/api')
    );

    // If authenticated and trying to access public routes, redirect to dashboard
    if (isAuthenticated && publicRoutes.includes(request.nextUrl.pathname)) {
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    // If it's a public route, allow access
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // If not authenticated and trying to access protected route, redirect to sign-in
    if (!isAuthenticated) {
        const signInUrl = new URL('/sign-in', request.url);
        return NextResponse.redirect(signInUrl);
    }

    // Allow access to protected routes for authenticated users
    return NextResponse.next();
} 