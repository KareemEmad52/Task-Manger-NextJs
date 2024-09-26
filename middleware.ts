import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function
export function middleware(request: NextRequest) {
  const isAuth = request.cookies.get('isAuth'); 
 
  if (!isAuth || isAuth.value !== 'true') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Continue if the user is authenticated
  return NextResponse.next();
}

// Protect certain routes with this matcher
export const config = {
  matcher: ['/'], // Protect specific routes
};
