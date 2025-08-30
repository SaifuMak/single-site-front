// src/app/templates/registry.ts
import type { TemplateKey, TemplateProps } from './types'
import Layout1 from './layout-1'
import Layout2 from './layout-2'

type TemplateDef = {
  key: TemplateKey
  component: (p: TemplateProps) => JSX.Element
  name: string
  version: string
  tags?: string[]
}

export const templates: Record<string, TemplateDef> = {
  'layout-1': { key: 'layout-1', component: Layout1, name: 'Layout 1', version: '1.0.0' },
  'layout-2': { key: 'layout-2', component: Layout2, name: 'Layout 2', version: '1.0.0' },
}

export function getTemplate(key?: string) {
  return templates[key ?? 'layout-1'] ?? templates['layout-1']
}
