// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const user_role = request.cookies.get("user_role")?.value;
  const onboarding_complete = request.cookies.get("onboarding_complete")?.value;
  // const onboarding_step = request.cookies.get("onboarding_step")?.value;
  const { pathname } = request.nextUrl;
  // Auth routes that should NOT be accessible when logged in
  const authRoutes = [
    "/auth/login",
    "/auth/sign-up",
    "/auth/update-password",
    "/auth/otp",
    "/auth/forgot-password",
  ];
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "?")
  );

  // Protected routes that require authentication
  const loginURL = new URL("/auth/login", request.url);
  const landingURL = new URL("/", request.url);
  const dashboardURL = new URL("/dashboard", request.url);
  const onboardingURL = new URL("/onboarding", request.url);
  const protectedRoutes = ["/dashboard"];
  const onboardingRoute = "/onboarding";
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isOnboardingRoute = pathname.startsWith(onboardingRoute);

  // If trying to access auth route while logged in - redirect to dashboard
  if (token && isAuthRoute) {
    if (user_role && onboarding_complete) {
      console.log("redirect to dashboard");
      return NextResponse.redirect(dashboardURL);
    }
    console.log("redirect to onboarding1");
    return NextResponse.redirect(onboardingURL);
  }

  if (token && isProtectedRoute) {
    if (!onboarding_complete) {
      // return NextResponse.redirect(onboardingURL);
    }
  }
  if (!token && isOnboardingRoute) {
    return NextResponse.redirect(loginURL);
  }

  // If no token and trying to access protected route - redirect to login
  if (!token && isProtectedRoute) {
    loginURL.searchParams.set("redirect", pathname);
    console.log("redirect to login");
    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Run on all routes except static files
};
