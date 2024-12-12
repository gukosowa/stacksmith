import { ref, watch } from 'vue'
import { STORAGE_KEYS, EDITOR_CONFIG } from '@/utils/storage/constants'

export function useLanguageStorage() {
  const getStoredLanguage = (): string => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EDITOR.LANGUAGE)
      return stored || EDITOR_CONFIG.defaultLanguage
    } catch {
      return EDITOR_CONFIG.defaultLanguage
    }
  }

  const currentLanguage = ref(getStoredLanguage())

  watch(currentLanguage, (newLang) => {
    try {
      localStorage.setItem(STORAGE_KEYS.EDITOR.LANGUAGE, newLang)
    } catch (error) {
      console.error('Error saving language preference:', error)
    }
  })

  return {
    currentLanguage,
  }
}