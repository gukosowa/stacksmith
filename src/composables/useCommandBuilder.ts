import { computed } from 'vue'
import type { FrameworkState } from '@/types/editor'

export function useCommandBuilder(state: FrameworkState) {
  const cmd = computed(() => {
    if (!state.framework || !state.option) {
      return ''
    }

    // Start with the base command
    let baseCommand = `${state.framework.id} ${state.option.id}`

    // Add main input if present
    if (state.option.textInput && state.inputs.main) {
      let mainInput = state.inputs.main
      if (state.option.inputTransformer) {
        mainInput = state.option.inputTransformer(mainInput)
      }
      baseCommand += ` ${mainInput}`
    }

    // Add template commands
    const templateCommands = Array.from(state.templates)
      .map(templateName => {
        const template = state.option?.templates?.find(t => t.name === templateName)
        if (!template) return null

        let templateCommand = template.command || templateName

        if (template.textInput && state.inputs.templates[templateName]) {
          let templateInput = state.inputs.templates[templateName]
          if (template.inputTransformer) {
            templateInput = template.inputTransformer(templateInput)
          }

          if (templateCommand.includes('{input}')) {
            templateCommand = templateCommand.replace('{input}', templateInput)
          } else if (templateCommand.endsWith('=')) {
            templateCommand += templateInput
          } else {
            templateCommand += ` ${templateInput}`
          }
        }

        return templateCommand
      })
      .filter(Boolean)
      .join(' ')

    return templateCommands ? `${baseCommand} ${templateCommands} ` : `${baseCommand} `
  })

  return { cmd }
}