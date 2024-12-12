import { nextTick } from 'vue'
import type { Template, FrameworkState } from '@/types/editor'

export function useTemplateHandling(state: FrameworkState) {
  const toggleTemplate = (template: Template) => {
    const name = template.name
    if (template.multiSelect) {
      if (state.templates.has(name)) {
        state.templates.delete(name)
        delete state.inputs.templates[name]
      } else {
        state.templates.add(name)
      }
    } else {
      if (state.templates.has(name)) {
        state.templates.delete(name)
        delete state.inputs.templates[name]
      } else {
        state.templates.clear()
        state.inputs.templates = {}
        state.templates.add(name)
      }
    }

    nextTick(() => {
      if (state.templates.has(name) && template.textInput) {
        const input = document.querySelector(`[data-template="${name}"]`) as HTMLElement
        if (input) {
          input.focus()
          input.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    })
  }

  const updateTemplateInputs = (inputs: Record<string, string>) => {
    state.inputs.templates = inputs
  }

  return {
    toggleTemplate,
    updateTemplateInputs
  }
}