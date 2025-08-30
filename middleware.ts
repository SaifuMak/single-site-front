// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

export function middleware(req: NextRequest) {
  // Extract host (handles custom domains & Vercel previews)
  const host = req.headers.get('host') || ''
  // Pass it downstream so server components and API routes can read it
  const res = NextResponse.next({
    request: { headers: new Headers(req.headers) },
  })
  res.headers.set('x-tenant-host', host)
  return res
}
