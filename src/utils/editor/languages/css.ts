import { css } from '@codemirror/lang-css'
import type { Extension } from '@codemirror/state'

export function getCSSExtension(): Extension {
  return css()
}