import { NextRequest, NextResponse } from "next/server";

const TOKEN_KEY = "rentnest_token";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value;

  const pathname = request.nextUrl.pathname;

  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isDashboardRoute && !token) {
    const loginUrl = new URL("/auth/login", request.url);

    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};