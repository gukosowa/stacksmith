import { EditorView } from '@codemirror/view'

export const editorTheme = EditorView.theme({
  '&': {
    height: '100%',
    fontSize: '14px',
  },
  '.cm-content': {
    fontFamily: 'monospace',
    padding: '16px 0',
  },
  '.cm-line': {
    padding: '0 16px',
  },
  '&.cm-focused': {
    outline: 'none',
  },
})