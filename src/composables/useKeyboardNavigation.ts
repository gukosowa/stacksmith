export function useKeyboardNavigation(section: string) {
  const focusPreviousButton = (event: KeyboardEvent, currentIndex: number) => {
    event.preventDefault()
    const buttons = Array.from(
      document.querySelectorAll(`[data-section="${section}"]`)
    ) as HTMLElement[]
    const newIndex = (currentIndex - 1 + buttons.length) % buttons.length
    buttons[newIndex].focus()
  }

  const focusNextButton = (event: KeyboardEvent, currentIndex: number) => {
    event.preventDefault()
    const buttons = Array.from(
      document.querySelectorAll(`[data-section="${section}"]`)
    ) as HTMLElement[]
    const newIndex = (currentIndex + 1) % buttons.length
    buttons[newIndex].focus()
  }

  return {
    focusPreviousButton,
    focusNextButton
  }
}