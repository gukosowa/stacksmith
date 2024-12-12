// Storage keys
export const STORAGE_KEYS = {
  ROUTE: 'lastRoute',
  EDITOR: {
    LANGUAGE: 'editor_language',
    CONTENT: 'editor_content_'
  }
} as const

// Database constants
export const DB_CONFIG = {
  name: 'editorDB',
  version: 1,
  stores: {
    content: 'editorContent'
  }
} as const

// Editor constants
export const EDITOR_CONFIG = {
  defaultId: 'editor-1',
  defaultLanguage: 'javascript'
} as const