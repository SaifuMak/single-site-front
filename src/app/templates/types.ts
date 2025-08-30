// src/app/templates/types.ts
export type TemplateKey = 'layout-1' | 'layout-2' | string

export interface TemplateProps {
  content: any // shape is global & constant; you can refine later
  theme?: any
  settings: {
    siteId: string
    templateKey: TemplateKey
  }
}
