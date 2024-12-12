import { computed } from 'vue'
import { EDITOR_LANGUAGES } from '@/utils/editor/constants'
import { useLanguageStorage } from './useLanguageStorage'
import type { Language } from '@/types/editor'

const { currentLanguage } = useLanguageStorage()

export function useEditorState() {
  const currentLanguageObject = computed<Language>(() => {
    console.log('useEditorState currentLanguageObject', currentLanguage.value)
    return EDITOR_LANGUAGES.find((lang) => lang.id === currentLanguage.value) || EDITOR_LANGUAGES[0]
  })

  const setLanguage = (lang: Language) => {
    console.log('useEditorState lang', { lang })
    currentLanguage.value = lang.id
  }

  return {
    currentLanguage,
    languages: EDITOR_LANGUAGES,
    currentLanguageObject,
    setLanguage,
  }
}
