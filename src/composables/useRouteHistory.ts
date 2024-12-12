import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { STORAGE_KEYS } from '@/utils/storage/constants'

export function useRouteHistory() {
  const route = useRoute()
  const router = useRouter()

  // Load last route from localStorage on app start
  const lastRoute = localStorage.getItem(STORAGE_KEYS.ROUTE)
  if (lastRoute && lastRoute !== route.fullPath) {
    router.push(lastRoute)
  }

  // Save route changes to localStorage
  watch(
    () => route.fullPath,
    (newPath) => {
      localStorage.setItem(STORAGE_KEYS.ROUTE, newPath)
    }
  )
}