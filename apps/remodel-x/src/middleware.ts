// import type { NextRequest } from "next/server";

// import { getSessionCookie } from "better-auth/cookies";
// import { NextResponse } from "next/server";

// const protectedRoutes = ["/dashboard", "/admin/dashboard"];

// export async function middleware(req: NextRequest) {
//   const { nextUrl } = req;
//   const sessionCookie = getSessionCookie(req);

//   const isLoggedIn = !!sessionCookie;
//   const isOnProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));
//   const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

//   if (isOnProtectedRoute && !isLoggedIn) {
//     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_ACCOUNTS_URL!}/auth/sign-in`);
//   }

//   if (isOnAuthRoute && isLoggedIn) {
//     if (nextUrl.pathname !== "/auth/company-info") {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };

export default function middleware(_req: Request) {}
