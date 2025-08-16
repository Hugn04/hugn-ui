// middleware.ts
import { NextRequest, NextResponse } from "next/server";
const PUBLIC_ROUTES = ["/", "/login", "/template", "/api/pong"];

let pathApi = "auth";
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const isPublic = PUBLIC_ROUTES.some((route) => {
    const lastChar = route.slice(-1);
    if (lastChar === "*") {
      route = route.slice(0, -2);
      return pathname.startsWith(route);
    } else {
      return pathname === route;
    }
  });
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/login";

  if (isPublic) {
    // if (pathname.startsWith("/loágin")) {
    //   try {
    //     await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/verify`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     const homeUrl = req.nextUrl.clone();
    //     homeUrl.pathname = "/";
    //     return NextResponse.redirect(homeUrl);
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   } catch (error) {
    //     return NextResponse.next();
    //   }
    // }
    return NextResponse.next();
  } else {
    if (token) {
      switch (pathname.split("/")[1]) {
        case "admin":
          pathApi = "admin";
          redirectUrl.pathname = "/";
          break;
        case "studio":
          pathApi = "studio";
          redirectUrl.pathname = "/";
          break;
        default:
          pathApi = "auth";
          break;
      }
      // if (pathname.startsWith("/admin")) {
      // } else {

      // }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${pathApi}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        // Kiểm tra nếu không thành công
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        // Parse JSON
        const user = await res.json();
        if (user) {
          const requestHeaders = new Headers(req.headers);
          // requestHeaders.set("x-user", JSON.stringify(user));
          return NextResponse.next({
            request: { headers: requestHeaders },
          });
        }
      } catch (error) {
        console.error("Unexpected error:", error);

        return NextResponse.redirect(redirectUrl);
      }
    }
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
