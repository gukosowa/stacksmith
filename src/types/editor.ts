import type { Ref } from 'vue'

export interface Language {
  id: 'text' | 'javascript' | 'typescript' | 'html' | 'css' | 'json' | 'php'
  name: string
}

export interface EditorProps {
  language?: Ref<string>
}

export interface EditorHeaderProps {
  currentLanguage: string
  languages: Language[]
  setLanguage: (lang: string) => void
}

export interface ComboboxProps {
  items: Language[]
  selectedItem: Language
  placeholder?: string
  label?: string
}

export interface ComboboxEmits {
  (e: 'select', item: Language): void
}
