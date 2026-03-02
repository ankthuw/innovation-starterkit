import { NextRequest, NextResponse } from "next/server"
import { verifyEvaluationSession } from "./lib/evaluation"

export async function proxy(request: NextRequest) {
  const isEvaluationPage = request.nextUrl.pathname === "/evaluation"
  const isEvaluationAPI = request.nextUrl.pathname.startsWith("/api/evaluation")
  const isRootRoute = request.nextUrl.pathname === "/"
  const isAIAPI = request.nextUrl.pathname.startsWith("/api/ai") || request.nextUrl.pathname.startsWith("/api/assistant")

  // Allow access to evaluation page, API, AI API routes, and root route
  if (isEvaluationPage || isEvaluationAPI || isAIAPI || isRootRoute) {
    return NextResponse.next()
  }

  // Verify session for all other routes
  const isAuthenticated = await verifyEvaluationSession()

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/evaluation", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
