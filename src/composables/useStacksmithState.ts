import { reactive } from 'vue'
import type { Framework, Category, Option, FrameworkState } from '@/types/editor'

const initialState: FrameworkState = {
  searchQuery: '',
  framework: null,
  category: null,
  option: null,
  templates: new Set(),
  inputs: { main: '', templates: {} },
  copied: false,
  errors: {},
  showRefresh: false,
  editedCmd: ''
}

export function useStacksmithState() {
  const state = reactive({ ...initialState })

  const reset = () => {
    Object.assign(state, initialState)
    state.templates = new Set()
  }

  const updateState = (updates: Partial<FrameworkState>) => {
    Object.assign(state, updates)
  }

  const selectFramework = (fw: Framework) => {
    updateState({
      framework: fw,
      category: null,
      option: null,
      templates: new Set(),
      inputs: { main: '', templates: {} }
    })
  }

  const selectCategory = (cat: Category) => {
    updateState({
      category: cat,
      option: null,
      templates: new Set(),
      inputs: { main: '', templates: {} }
    })
  }

  const selectOption = (opt: Option) => {
    updateState({
      option: opt,
      templates: new Set(),
      inputs: { main: '', templates: {} }
    })
  }

  return {
    state,
    reset,
    updateState,
    selectFramework,
    selectCategory,
    selectOption
  }
}