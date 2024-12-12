import { getTextExtension } from './text'
import { getJavaScriptExtension } from './javascript'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { json } from '@codemirror/lang-json'
import { php } from '@codemirror/lang-php'
import type { Extension } from '@codemirror/state'

const languageMap: Record<string, () => Extension> = {
  text: getTextExtension,
  javascript: () => getJavaScriptExtension(),
  typescript: () => getJavaScriptExtension(true),
  html: () => html(),
  css: () => css(),
  json: () => json(),
  php: () => php(),
}

export function getLanguageExtension(lang: string): Extension {
  const getExtension = languageMap[lang]
  if (!getExtension) {
    console.warn(`Language "${lang}" not found, falling back to plain text`)
    return getTextExtension()
  }
  
  try {
    return getExtension()
  } catch (error) {
    console.error(`Error loading language extension for "${lang}":`, error)
    return getTextExtension()
  }
}