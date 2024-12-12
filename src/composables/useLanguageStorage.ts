import { type Ref, ref, watch } from 'vue'
import { STORAGE_KEYS, EDITOR_CONFIG } from '@/utils/storage/constants'

export function useLanguageStorage() {
  const getStoredLanguage = (): string => {
    try {
      let stored = localStorage.getItem(STORAGE_KEYS.EDITOR.LANGUAGE)
      if (stored === 'undefined') {
        stored = null
      }
      return stored || EDITOR_CONFIG.defaultLanguage
    } catch {
      return EDITOR_CONFIG.defaultLanguage
    }
  }

  const currentLanguage = ref<string>(getStoredLanguage())

  watch(currentLanguage, (newLang) => {
    try {
      localStorage.setItem(STORAGE_KEYS.EDITOR.LANGUAGE, newLang)
    } catch (error) {
      localStorage.removeItem(STORAGE_KEYS.EDITOR.LANGUAGE)
      console.error('Error saving language preference:', error)
    }
  })

  return {
    currentLanguage,
  }
}
