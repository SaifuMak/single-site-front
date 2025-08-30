// src/app/api/favicon/route.ts
import { NextResponse } from 'next/server'
import { fetchSiteDataByHost, getHostFromHeaders } from '@/lib/site'

export const runtime = 'edge'

export async function GET(req: Request) {
  try {
    const host = getHostFromHeaders(new Headers(req.headers))
    const { settings } = await fetchSiteDataByHost(host)

    // If you store a full PNG URL per site in the DB:
    if (settings.faviconUrl) {
      // Proxy it so it’s same-origin and cacheable
      const imgRes = await fetch(settings.faviconUrl, { cache: 'force-cache' })
      if (imgRes.ok) {
        const buf = await imgRes.arrayBuffer()
        return new NextResponse(buf, {
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
          },
        })
      }
    }

    // Fallback: generate a minimal PNG from an SVG glyph (first letter)
    const letter = (settings.seo?.title?.[0] || 'S').toUpperCase()
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
        <rect width="100%" height="100%" fill="#111827"/>
        <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
          font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
          font-size="84" fill="#ffffff">${letter}</text>
      </svg>`
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      },
    })
  } catch (e) {
    return NextResponse.json({ error: 'favicon error' }, { status: 500 })
  }
}
