import { ref } from 'vue'
import { laravel } from '@/utils/frameworks/laravel'
import { sail } from '@/utils/frameworks/sail'
import type { Framework } from '@/types/editor'

export function useFrameworks() {
  const frameworks = ref<Framework[]>([...laravel, ...sail])

  return {
    frameworks
  }
}