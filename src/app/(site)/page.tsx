// src/app/(site)/page.tsx
import { headers } from 'next/headers'
import { fetchSiteDataByHost, getHostFromHeaders } from '@/lib/site'
import { getTemplate } from '@/app/templates/registry'

export default async function SitePage() {
  const host = getHostFromHeaders(headers())
  const { settings, content } = await fetchSiteDataByHost(host)

  const Template = getTemplate(settings.templateKey).component
  return <Template content={content} theme={settings.themeTokens} settings={{ siteId: settings.siteId, templateKey: settings.templateKey }} />
}
