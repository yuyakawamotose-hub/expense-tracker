import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  nestServerBaseUrl,
  signupPagePath,
  nestGetMePath,
} from "@/app/_const/auth";

import { redirectPath } from "@/app/_const/proxy";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  // const token: string = "sadfdas";
  const token = request.cookies.get("access_token")?.value;

  // Cookie 自体がない
  if (!token) {
    return NextResponse.redirect(new URL(signupPagePath, request.url));
  }

  // TODO: Path Filter
  // Valid jwt shouldn't allow user to go auth pages

  const cookieHeader = request.headers.get("cookie") ?? "";

  const response = await fetch(nestServerBaseUrl + nestGetMePath, {
    headers: {
      cookie: cookieHeader,
    },
    credentials: "include",
    cache: "no-store",
  });

  // Continue process if JWT is set
  if (response.ok) return NextResponse.next();

  // Redirect to Signin page when JWT is not set
  return NextResponse.redirect(new URL(redirectPath, request.url));
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    /*
     * 以下を除く全ページに適用
     * - api
     * - auth
     * - _next/static, _next/image
     * - favicon.ico など拡張子付きファイル
     */
    "/((?!api|auth|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
