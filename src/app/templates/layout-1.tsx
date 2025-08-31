// src/app/templates/layout-1.tsx
import type { TemplateProps } from './types'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Layout-1
 * - Minimal, fast, data-driven
 * - Sections map 1:1 to your GlobalContent contract
 * - Uses anchors to match menu items (hrefs like "#about", "#services", etc.)
 */

export default function Layout1({ content, settings, theme }: TemplateProps) {
  const menu = content?.menu ?? []
  const hero = content?.hero ?? {}
  const services = content?.services?.items ?? []
  const about = content?.about ?? {}
  const gallery = content?.gallery?.images ?? []
  const testimonials = content?.testimonials?.items ?? []
  const cta = content?.cta ?? {}
  const footerColumns = content?.footer?.columns ?? []

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader menu={menu} />
      <main className="flex-1">
        <HeroSection hero={hero} />
        <ServicesSection services={services} />
        <AboutSection about={about} />
        {gallery.length > 0 && <GallerySection images={gallery} />}
        {testimonials.length > 0 && <TestimonialsSection items={testimonials} />}
        {cta?.heading && cta?.button && <CTASection cta={cta} />}
      </main>
      <SiteFooter columns={footerColumns} />
    </div>
  )
}

/* =========================
   Header
   ========================= */
function SiteHeader({ menu }: { menu: { label: string; href: string }[] }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          {/* You can swap to brand image via theme tokens later */}
          <span>Brand</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {menu.map((m, i) => (
            <a key={i} href={m.href} className="hover:text-gray-900 text-gray-600">
              {m.label}
            </a>
          ))}
        </nav>
        <a
          href={menu?.[0]?.href || '#contact'}
          className="ml-4 inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          Contact
        </a>
      </div>
    </header>
  )
}

/* =========================
   Hero
   ========================= */
function HeroSection({ hero }: { hero: any }) {
  return (
    <section id="home" className="relative">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight">
            {hero?.title || 'Your Headline Goes Here'}
          </h1>
          {hero?.subtitle && (
            <p className="mt-4 text-lg text-gray-600">{hero.subtitle}</p>
          )}
          {hero?.cta?.label && hero?.cta?.href && (
            <div className="mt-8">
              <a
                href={hero.cta.href}
                className="inline-flex items-center rounded-xl bg-gray-900 text-white px-5 py-3 text-sm font-medium hover:bg-black"
              >
                {hero.cta.label}
              </a>
            </div>
          )}
        </div>
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border">
          {hero?.image ? (
            <Image
              src={hero.image}
              alt={hero?.title || 'Hero image'}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-gray-400">
              Add a hero.image
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* =========================
   Services
   ========================= */
function ServicesSection({ services }: { services: any[] }) {
  if (!services?.length) return null
  return (
    <section id="services" className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="rounded-2xl bg-white border p-6 hover:shadow-sm transition">
              <div className="text-lg font-semibold">{s.title}</div>
              {s.desc && <p className="text-sm text-gray-600 mt-2">{s.desc}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================
   About
   ========================= */
function AboutSection({ about }: { about: any }) {
  if (!about?.heading && !about?.body && !about?.image) return null
  return (
    <section id="about" className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl font-bold">{about?.heading || 'About Us'}</h2>
          {about?.body && <p className="mt-4 text-gray-600 leading-relaxed">{about.body}</p>}
        </div>
        <div className="order-1 lg:order-2 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border">
          {about?.image ? (
            <Image
              src={about.image}
              alt={about?.heading || 'About image'}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-gray-400">Add an about.image</div>
          )}
        </div>
      </div>
    </section>
  )
}

/* =========================
   Gallery
   ========================= */
function GallerySection({ images }: { images: { src: string; alt?: string }[] }) {
  return (
    <section id="gallery" className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Gallery</h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border">
              <Image src={img.src} alt={img.alt || `Gallery ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================
   Testimonials
   ========================= */
function TestimonialsSection({ items }: { items: { quote: string; author?: string }[] }) {
  return (
    <section id="testimonials" className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold">What clients say</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <blockquote key={i} className="rounded-2xl border p-6 bg-white">
              <p className="text-gray-800">{t.quote}</p>
              {t.author && <footer className="mt-3 text-sm text-gray-500">— {t.author}</footer>}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================
   CTA
   ========================= */
function CTASection({ cta }: { cta: { heading: string; button: { label: string; href: string } } }) {
  return (
    <section id="contact" className="py-14 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
        <h3 className="text-2xl font-semibold">{cta.heading}</h3>
        {cta?.button?.label && cta?.button?.href && (
          <a
            href={cta.button.href}
            className="inline-flex items-center rounded-xl bg-white text-gray-900 px-5 py-3 text-sm font-medium hover:opacity-90"
          >
            {cta.button.label}
          </a>
        )}
      </div>
    </section>
  )
}

/* =========================
   Footer
   ========================= */
function SiteFooter({
  columns,
}: {
  columns: { title?: string; links: { label: string; href: string }[] }[]
}) {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {columns?.map((col, i) => (
          <div key={i}>
            {col.title && <div className="text-sm font-semibold text-gray-700">{col.title}</div>}
            <ul className="mt-3 space-y-2">
              {col.links?.map((l, j) => (
                <li key={j}>
                  <a href={l.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center text-xs text-gray-500 pb-8">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  )
}
