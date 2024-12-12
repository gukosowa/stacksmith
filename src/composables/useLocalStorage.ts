import { ref, watch } from 'vue'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  validator?: (value: unknown) => value is T
) {
  const getStoredValue = (): T => {
    try {
      const item = localStorage.getItem(key)
      if (item === null) return defaultValue

      const parsed = JSON.parse(item)
      
      if (validator) {
        return validator(parsed) ? parsed : defaultValue
      }
      
      return parsed
    } catch (error) {
      console.warn(`Error reading ${key} from localStorage:`, error)
      localStorage.removeItem(key)
      return defaultValue
    }
  }

  const value = ref<T>(getStoredValue())

  watch(
    value,
    (newValue) => {
      try {
        if (newValue !== undefined) {
          localStorage.setItem(key, JSON.stringify(newValue))
        }
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error)
        localStorage.removeItem(key)
      }
    },
    { deep: true }
  )

  return value
}