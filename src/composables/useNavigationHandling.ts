export function useNavigationHandling() {
  const handleKeyboardNavigation = async (event: Event) => {
    const currentElement = event.target as HTMLElement
    const inputs = Array.from(
      document.querySelectorAll('input, textarea, [tabindex]:not([tabindex="-1"])')
    ) as HTMLElement[]
    const currentIndex = inputs.indexOf(currentElement)

    if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
      inputs[currentIndex + 1].focus()
      inputs[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return {
    handleKeyboardNavigation
  }
}