import { Extension } from '@codemirror/state'
import { baseTheme } from './base'
import { syntaxTheme } from './syntax'

// Combine base theme and syntax highlighting
export const editorTheme: Extension = [
  baseTheme,
  syntaxTheme
]