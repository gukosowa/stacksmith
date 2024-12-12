import type { Language } from '@/types/editor'

export const EDITOR_LANGUAGES: readonly Language[] = [
  { id: 'text', name: 'Plain Text' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'json', name: 'JSON' },
  { id: 'php', name: 'PHP' },
] as const

export const ROUTE_STORAGE_KEY = 'lastRoute'