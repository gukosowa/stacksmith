import { php } from '@codemirror/lang-php'
import type { Extension } from '@codemirror/state'

export function getPHPExtension(): Extension {
  return php()
}