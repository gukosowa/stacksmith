import { nextTick } from 'vue'
import type { Framework, FrameworkState } from '@/types/editor'

export function useSearchHandling(state: FrameworkState, frameworks: Framework[]) {
  const performSearch = () => {
    const query = state.searchQuery.trim().toLowerCase()
    if (!query) return

    let found = false

    // Search through frameworks, categories, and options
    for (const framework of frameworks) {
      // Search options first (most specific)
      for (const [catId, category] of Object.entries(framework.categories)) {
        for (const [optId, option] of Object.entries(category.options)) {
          if (optId.toLowerCase().includes(query) || option.name.toLowerCase().includes(query)) {
            state.framework = framework
            state.category = { id: catId, ...category }
            state.option = { id: optId, ...option }
            found = true
            break
          }
        }
        if (found) break
      }
      if (found) break

      // Search categories
      if (!found) {
        for (const [catId, category] of Object.entries(framework.categories)) {
          if (catId.toLowerCase().includes(query) || category.name.toLowerCase().includes(query)) {
            state.framework = framework
            state.category = { id: catId, ...category }
            state.option = null
            found = true
            break
          }
        }
      }
      if (found) break

      // Search frameworks (least specific)
      if (!found && (framework.id.toLowerCase().includes(query) || 
          framework.name.toLowerCase().includes(query))) {
        state.framework = framework
        state.category = null
        state.option = null
        found = true
        break
      }
    }

    if (!found) {
      state.framework = null
      state.category = null
      state.option = null
    }

    // Scroll to found element
    if (found) {
      nextTick(() => {
        let targetElement: HTMLElement | null = null
        if (state.option) {
          targetElement = document.querySelector('[data-section="option"]')
        } else if (state.category) {
          targetElement = document.querySelector('[data-section="category"]')
        } else if (state.framework) {
          targetElement = document.querySelector('[data-section="framework"]')
        }

        targetElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    }
  }

  return {
    performSearch
  }
}