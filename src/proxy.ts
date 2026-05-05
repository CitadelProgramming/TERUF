import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (
    pathname === '/' ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/programs') ||
    pathname.startsWith('/resources') ||
    pathname.startsWith('/support') ||
    pathname.startsWith('/donate') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/login')
  ) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('admin-auth');

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}