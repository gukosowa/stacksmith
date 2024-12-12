import { html } from '@codemirror/lang-html'
import type { Extension } from '@codemirror/state'

export function getHTMLExtension(): Extension {
  return html()
}