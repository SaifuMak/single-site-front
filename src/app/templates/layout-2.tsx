// src/app/templates/layout-2.tsx
import type { TemplateProps } from './types'

export default function Layout2({ content }: TemplateProps) {
  const about = content?.about
  return (
    <main>
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold">{about?.heading ?? 'About Us'}</h1>
          {about?.body && <p className="mt-4 text-gray-200 max-w-2xl">{about.body}</p>}
        </div>
      </section>
    </main>
  )
}
