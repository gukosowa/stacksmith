import type { Language } from '@/types/editor'
import { EDITOR_LANGUAGES } from '@/utils/editor/constants'

export function isValidLanguage(value: unknown): value is string {
  if (typeof value !== 'string') return false
  return EDITOR_LANGUAGES.some(lang => lang.id === value)
}

export function validateStorageItem<T>(
  key: string,
  value: unknown,
  validator: (value: unknown) => value is T,
  defaultValue: T
): T {
  try {
    if (validator(value)) {
      return value
    }
    console.warn(`Invalid value in localStorage for key "${key}". Using default value.`)
    localStorage.removeItem(key)
    return defaultValue
  } catch (error) {
    console.error(`Error validating localStorage item "${key}":`, error)
    localStorage.removeItem(key)
    return defaultValue
  }
}