import { computed } from 'vue'
import { EDITOR_LANGUAGES } from '@/utils/editor/constants'
import { useLanguageStorage } from './useLanguageStorage'
import type { Language } from '@/types/editor'

export function useEditorState() {
  const { currentLanguage } = useLanguageStorage()
  
  const currentLanguageObject = computed<Language>(() => {
    return (
      EDITOR_LANGUAGES.find(lang => lang.id === currentLanguage.value) || 
      EDITOR_LANGUAGES[0]
    )
  })

  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang.id
  }

  return {
    currentLanguage,
    languages: EDITOR_LANGUAGES,
    currentLanguageObject,
    setLanguage
  }
}