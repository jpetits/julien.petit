import { NextRequest, NextResponse } from "next/server";
import paymentProxy from "@/proxy/x402Proxy";
import { langProxy } from "./proxy/langProxy";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

export default NextAuth(authConfig).auth;

export function proxy(req: NextRequest) {
  // if (req.nextUrl.pathname.includes("/api/protected/")) {
  //   return paymentProxy(req);
  // }
  return langProxy(req);
}

export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
