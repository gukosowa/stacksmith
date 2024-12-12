import { EditorView } from '@codemirror/view'
import { monokai } from './colors'

export const baseTheme = EditorView.theme({
  '&': {
    color: monokai.foreground,
    backgroundColor: monokai.background,
    height: '100%',
    fontSize: '14px',
  },
  '.cm-content': {
    fontFamily: 'monospace',
    padding: '16px 0',
    caretColor: monokai.foreground,
  },
  '.cm-line': {
    padding: '0 16px',
  },
  '.cm-cursor, .cm-dropCursor': { 
    borderLeftColor: monokai.foreground
  },
  '&.cm-focused': {
    outline: 'none'
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: monokai.selection
  },
  '.cm-activeLine': {
    backgroundColor: monokai.lineHighlight
  },
  '.cm-gutters': {
    backgroundColor: monokai.background,
    color: monokai.gutter,
    border: 'none',
    borderRight: `1px solid ${monokai.border}`
  },
  '.cm-activeLineGutter': {
    backgroundColor: monokai.lineHighlight
  }
})