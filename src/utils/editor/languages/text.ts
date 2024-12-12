import type { Extension } from '@codemirror/state'
import { StreamLanguage } from '@codemirror/language'

export function getTextExtension(): Extension {
  return StreamLanguage.define({
    token: () => null,
    startState: () => ({}),
  })
}