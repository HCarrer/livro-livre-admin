import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_DENIED,
  BOOLEAN_QUERY,
  LOGIN,
  LOGOUT,
} from "./constants/routes";

const PUBLIC_ROUTE_PREFIX = "/public";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAPIRoute = pathname.startsWith("/api");

  if (pathname.startsWith(PUBLIC_ROUTE_PREFIX)) {
    if (pathname === LOGOUT) {
      const authToken = request.cookies.get("auth_token")?.value;
      if (authToken) {
        // Remove cookie
        request.cookies.set(
          "Set-Cookie",
          `auth_token=; HttpOnly; Max-Age=0; Path=/`,
        );
      }
    }
    return NextResponse.next();
  }

  let shouldIgnore = false;
  if (!isAPIRoute && pathname.startsWith(PUBLIC_ROUTE_PREFIX)) {
    shouldIgnore = true;
  } else if (isAPIRoute && pathname === "/api/session") {
    shouldIgnore = true;
  }

  if (shouldIgnore) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get("auth_token")?.value;

  if (!authToken) {
    return NextResponse.redirect(
      new URL(`${LOGIN}?${ACCESS_DENIED}=${BOOLEAN_QUERY.TRUE}`, request.url),
    );
  }

  return NextResponse.next();
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|img*|icon*|manifest).*)",
  ],
};
