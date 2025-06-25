// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
const PUBLIC_ROUTES = ["/login", "/register", "/about"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";

  if (isPublic) {
    if (pathname.startsWith("/losgin")) {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const homeUrl = req.nextUrl.clone();
        homeUrl.pathname = "/";
        return NextResponse.redirect(homeUrl);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  } else {
    if (token) {
      try {
        const { data: user } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (user) {
          const requestHeaders = new Headers(req.headers);
          // requestHeaders.set("x-user", JSON.stringify(user));
          return NextResponse.next({
            request: { headers: requestHeaders },
          });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("Axios error:", error.message);
          console.error("Response data:", error.response?.data);
        } else {
          console.error("Unexpected error:", error);
        }
        return NextResponse.redirect(loginUrl);
      }
    }
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // bỏ qua file tĩnh
};
