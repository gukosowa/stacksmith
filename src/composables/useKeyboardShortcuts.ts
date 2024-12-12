import { onMounted, onBeforeUnmount } from 'vue'

export function useKeyboardShortcuts(reset: () => void) {
  const handleKeyboardShortcuts = (event: KeyboardEvent) => {
    // Ctrl+Del => Reset & scroll top
    if (event.ctrlKey && event.key === 'Delete') {
      event.preventDefault()
      reset()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Ctrl+F => Focus search & scroll top
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault()
      const searchInput = document.querySelector('#inputSearch') as HTMLElement
      if (searchInput) {
        searchInput.focus()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    // Ctrl+Enter => Blur & copy
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault()
      document.querySelectorAll('input, textarea').forEach((input) => {
        (input as HTMLElement).blur()
      })
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyboardShortcuts)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyboardShortcuts)
  })
}