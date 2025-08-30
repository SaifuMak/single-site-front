// src/lib/site.ts
export type SiteData = {
  settings: {
    siteId: string
    templateKey: string
    seo?: { title?: string; description?: string; ogImage?: string }
    faviconUrl?: string
    themeTokens?: any
  }
  content: any
}

export function getHostFromHeaders(headers: Headers): string {
  return headers.get('x-tenant-host') || headers.get('host') || ''
}

// 🔴 TEMP STUB so you can test without backend
export async function fetchSiteDataByHost(host: string): Promise<SiteData> {
  const demoA: SiteData = {
    settings: {
      siteId: 'demo-a',
      templateKey: 'layout-1',
      seo: { title: 'Acme Tools', description: 'Quality tools for makers' },
      faviconUrl: '', // leave blank to see the letter-favicon
      themeTokens: { brand: '#4f46e5' },
    },
    content: {
      menu: [{ label: 'Home', href: '/' }],
      hero: { title: 'Welcome to Acme', subtitle: 'Built with Next.js templates' },
      services: { items: [
        { title: 'Design', desc: 'UI/UX' },
        { title: 'Development', desc: 'Web apps' },
        { title: 'SEO', desc: 'Get found online' },
      ]},
      about: { heading: 'About Acme', body: 'We craft digital experiences.' }
    },
  }

  const demoB: SiteData = {
    settings: {
      siteId: 'demo-b',
      templateKey: 'layout-2',
      seo: { title: 'Beta Corp', description: 'We solve hard problems' },
      faviconUrl: '',
      themeTokens: { brand: '#16a34a' },
    },
    content: {
      menu: [{ label: 'Home', href: '/' }],
      hero: { title: 'Beta Corp', subtitle: 'Switch layouts instantly' },
      about: { heading: 'About Beta', body: 'Another tenant, same data model.' },
      services: { items: [
        { title: 'Consulting', desc: 'Strategy & ops' },
        { title: 'Automation', desc: 'Workflow magic' },
      ]},
    },
  }

  // Simple “multi-tenant” demo by host:
  // - http://localhost:3000 -> demoA
  // - http://127.0.0.1:3000  -> demoB (just to see switching quickly)
  if (host.startsWith('127.0.0.1')) return demoB
  return demoA
}
