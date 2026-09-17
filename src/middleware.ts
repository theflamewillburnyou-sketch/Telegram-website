import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Keep the public URL at / while serving the Stitch landing page
  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/stitch/landing.html", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}
