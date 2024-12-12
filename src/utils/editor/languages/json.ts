import { json } from '@codemirror/lang-json'
import type { Extension } from '@codemirror/state'

export function getJSONExtension(): Extension {
  return json()
}