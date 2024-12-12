import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { json } from '@codemirror/lang-json'
import { php } from '@codemirror/lang-php'
import type { Extension } from '@codemirror/state'
import type { Language } from '@/types/editor.ts'

export function getLanguageExtension(lang: Language['id']): Extension {
  try {
    switch (lang) {
      case 'javascript':
        return javascript()
      case 'typescript':
        return javascript({ typescript: true })
      case 'html':
        return html()
      case 'css':
        return css()
      case 'json':
        return json()
      case 'php':
        return php()
      case 'text':
        return []
      default:
        return javascript() // Fallback to JavaScript
    }
  } catch (error) {
    console.error('Error loading language extension:', error)
    return javascript() // Fallback to JavaScript
  }
}
