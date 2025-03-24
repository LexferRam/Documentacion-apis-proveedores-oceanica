import { NextResponse } from 'next/server';
export { default } from "next-auth/middleware"

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  console.log(pathname)

  // Redirige a /login si la ruta es /
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/documentacion_api', request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] }