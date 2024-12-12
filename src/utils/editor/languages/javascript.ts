import { javascript } from '@codemirror/lang-javascript'
import type { Extension } from '@codemirror/state'

export function getJavaScriptExtension(typescript = false): Extension {
  return javascript({ typescript })
}