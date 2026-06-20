import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { redirectPath } from "@/app/_const/proxy";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const token: string = "sadfdas";
  // const token = request.cookies.get("access_token")?.value;

  // Continue process if JWT is set
  if (token) return NextResponse.next();

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
