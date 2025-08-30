// src/app/templates/layout-1.tsx
import type { TemplateProps } from './types'

export default function Layout1({ content }: TemplateProps) {
  const hero = content?.hero
  const services = content?.services?.items || []
  return (
    <main>
      <section className="min-h-[50vh] grid place-items-center text-center p-10">
        <h1 className="text-4xl font-bold">{hero?.title ?? 'Your Title'}</h1>
        {hero?.subtitle && <p className="mt-2 text-gray-600">{hero.subtitle}</p>}
      </section>
      <section className="max-w-5xl mx-auto p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s: any, i: number) => (
          <div key={i} className="rounded-xl border p-5">
            <h3 className="font-semibold">{s.title}</h3>
            {s.desc && <p className="text-sm text-gray-600 mt-1">{s.desc}</p>}
          </div>
        ))}
      </section>
    </main>
  )
}
