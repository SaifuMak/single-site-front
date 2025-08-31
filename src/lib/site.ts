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
      menu: [
        { label: 'Home', href: '#home' },
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Contact', href: '#contact' },
      ],
      hero: {
        title: 'Welcome to Acme',
        subtitle: 'Built with Next.js templates',
        image: '/images/hero.jpg',
        cta: { label: 'Get Started', href: '#contact' },
      },
      about: {
        heading: 'About Acme',
        body: 'We craft digital experiences with passion and precision.',
        image: '/images/about.jpg',
      },
      services: {
        items: [
          { title: 'Design', desc: 'UI/UX & branding' },
          { title: 'Development', desc: 'Next.js + Django apps' },
          { title: 'SEO', desc: 'Get found online' },
        ],
      },
      gallery: {
        images: [
          { src: '/images/g1.jpg', alt: 'Project 1' },
          { src: '/images/g2.jpg', alt: 'Project 2' },
          { src: '/images/g3.jpg', alt: 'Project 3' },
        ],
      },
      testimonials: {
        items: [
          { quote: 'Amazing team and great results!', author: 'Jerin' },
          { quote: 'Super fast delivery and quality work.' },
        ],
      },
      cta: {
        heading: 'Ready to start your project?',
        button: { label: 'Contact us', href: '#contact' },
      },
      footer: {
        columns: [
          {
            title: 'Company',
            links: [
              { label: 'About', href: '#about' },
              { label: 'Services', href: '#services' },
            ],
          },
          {
            title: 'Social',
            links: [{ label: 'Instagram', href: 'https://instagram.com' }],
          },
        ],
      },
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
      menu: [{ label: 'Home', href: '#home' }],
      hero: { title: 'Beta Corp', subtitle: 'Switch layouts instantly' },
      about: { heading: 'About Beta', body: 'Another tenant, same data model.' },
      services: {
        items: [
          { title: 'Consulting', desc: 'Strategy & ops' },
          { title: 'Automation', desc: 'Workflow magic' },
        ],
      },
    },
  }

  // Simple “multi-tenant” demo by host:
  // - http://localhost:3000 -> demoA
  // - http://127.0.0.1:3000  -> demoB
  if (host.startsWith('127.0.0.1')) return demoB
  return demoA
}
