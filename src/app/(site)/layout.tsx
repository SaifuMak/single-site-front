// src/app/(site)/layout.tsx
import '../globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { fetchSiteDataByHost, getHostFromHeaders } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  const host = getHostFromHeaders(headers())
  const { settings } = await fetchSiteDataByHost(host)
  const title = settings.seo?.title || 'My Single Site'
  const description = settings.seo?.description || 'One-page website'
  const og = settings.seo?.ogImage

  return {
    title,
    description,
    icons: {
      // Point favicon to our dynamic API route (below)
      icon: [{ url: '/api/favicon', type: 'image/png' }],
    },
    openGraph: {
      title,
      description,
      images: og ? [{ url: og }] : undefined,
    },
    metadataBase: new URL(`https://${host}`),
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
