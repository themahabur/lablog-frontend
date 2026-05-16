import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";

const PUBLIC_ROUTES = ["/login", "/signup", "/equipment", "/"];
const ALLOWED_ROLES = ["USER", "ADMIN"];

export async function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const { data: userData } = await userService.getSession();

  console.log("User Data:", userData);

  // If user not logged in
  if (!userData) {
    const loginUrl = new URL("/login", request.url);

    // Save original page path
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (!ALLOWED_ROLES.includes(userData.user.role)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }



  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
