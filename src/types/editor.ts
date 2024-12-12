export interface Language {
  id: string
  name: string
}

export interface EditorProps {
  language?: string
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