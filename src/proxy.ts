import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";

const PUBLIC_ROUTES = ["/login", "/signup", "/"];
const ALLOWED_ROLES = ["USER", "ADMIN"];

export async function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const { data: userData } = await userService.getSession();

  console.log("User Data:", userData);



  if (!userData) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!ALLOWED_ROLES.includes(userData.user.role)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
