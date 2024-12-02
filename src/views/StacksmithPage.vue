<template>
  <div class="min-h-screen flex flex-col items-center gap-8 pt-4 px-5 pb-64">
    <!-- Search Section -->
    <div class="w-full max-w-md md:max-w-2xl xl:max-w-3xl flex gap-2">
      <div class="relative flex-1">
        <input
          ref="inputRefsSearch"
          id="inputSearch"
          v-model="state.searchQuery"
          type="text"
          class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search (e.g., 'migr' for migrations)"
          @keyup.enter="handleKeyboardNavigation"
        />
        <button
          v-if="state.searchQuery"
          tabindex="-1"
          @click="reset()"
          class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-200 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <button
        @click="reset()"
        tabindex="-1"
        class="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        Reset
      </button>
    </div>

    <!-- Framework Selection -->
    <div class="w-full max-w-md md:max-w-2xl xl:max-w-3xl flex gap-4">
      <button
        v-for="(fw, index) in FRAMEWORKS"
        :key="fw.id"
        :data-section="'framework'"
        :data-index="index"
        :class="[
          'flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl py-2 px-6 border items-center justify-center flex group relative transition-all duration-150',
          'focus:outline-none focus:ring-4 focus:ring-blue-500',
          state.framework?.id === fw.id
            ? 'border-blue-500 border-2 shadow-lg shadow-blue-500/50 bg-gradient-to-br from-blue-500/30 to-blue-700/20'
            : 'border-gray-700 hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-500',
        ]"
        @click="selectFramework(fw)"
        @keydown.left.prevent="focusPreviousButton($event, index, 'framework')"
        @keydown.right.prevent="focusNextButton($event, index, 'framework')"
      >
        <span
          class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        />
        <span
          class="text-gray-100 text-center text-md font-medium relative z-10 group-hover:text-blue-200"
        >
          {{ fw.icon }} {{ fw.name }}
        </span>
      </button>
    </div>

    <BaseLine v-if="state.framework" />

    <!-- Category Selection -->
    <div
      v-if="state.framework"
      class="w-full max-w-md md:max-w-2xl xl:max-w-3xl grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <button
        v-for="([id, cat], index) in Object.entries(state.framework.categories)"
        :key="id"
        :data-section="'category'"
        :data-index="index"
        :class="[
          'flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl py-2 px-6 border items-center justify-center flex group relative transition-all duration-150',
          'focus:outline-none focus:ring-4 focus:ring-green-500',
          state.category?.id === id
            ? 'border-green-500 border-2 shadow-lg shadow-green-500/50 bg-gradient-to-br from-green-500/30 to-green-700/20'
            : 'border-gray-700 hover:shadow-lg hover:shadow-green-500/20 hover:border-green-500',
        ]"
        @click="selectCategory({ id, ...cat })"
        @keydown.left.prevent="focusPreviousButton($event, index, 'category')"
        @keydown.right.prevent="focusNextButton($event, index, 'category')"
      >
        <span
          class="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-700/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        />
        <span
          class="text-gray-100 text-center text-md font-medium relative z-10 group-hover:text-green-200"
        >
          {{ cat.name }}
        </span>
      </button>
    </div>

    <BaseLine color="red" v-if="state.category" />

    <!-- Option Selection -->
    <div
      v-if="state.category"
      class="w-full max-w-md md:max-w-2xl xl:max-w-3xl grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <button
        v-for="([id, opt], index) in Object.entries(state.category.options)"
        :key="id"
        :data-section="'option'"
        :data-index="index"
        :class="[
          'flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl py-2 px-6 border items-center justify-center flex group relative transition-all duration-150',
          'focus:outline-none focus:ring-4 focus:ring-red-500',
          state.option?.id === id
            ? 'border-red-500 border-2 shadow-lg shadow-red-500/50 bg-gradient-to-br from-red-500/30 to-red-700/20'
            : 'border-gray-700 hover:shadow-lg hover:shadow-red-500/20 hover:border-red-500',
        ]"
        @click="selectOption({ id, ...opt })"
        @keydown.left.prevent="focusPreviousButton($event, index, 'option')"
        @keydown.right.prevent="focusNextButton($event, index, 'option')"
      >
        <span
          class="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        />
        <span
          class="text-gray-100 text-center text-md font-medium relative z-10 group-hover:text-red-200"
        >
          {{ opt.name }}
          <span class="block font-light text-xs text-gray-300">{{ id }}</span>
        </span>
      </button>
    </div>

    <!-- Main Input -->
    <div
      v-if="state.option && state.option.textInput"
      class="w-full max-w-md md:max-w xl:max-w-3xl-2xl"
    >
      <label class="block text-sm font-medium text-gray-100 mb-1">{{
        state.option.textInput.label
      }}</label>
      <input
        ref="inputRefsMain"
        v-model="state.inputs.main"
        :placeholder="state.option.textInput.placeholder"
        type="text"
        class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        @keyup.enter="handleKeyboardNavigation"
      />
    </div>

    <BaseLine color="blue" v-if="state.option" />

    <!-- Templates -->
    <div
      v-if="state.option && state.option.templates && state.option.templates.length > 0"
      class="w-full max-w-md md:max-w-2xl xl:max-w-3xl mt-4"
    >
      <div class="text-lg font-medium text-gray-100 mb-2">{{ state.option.name }} Templates</div>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
          v-for="(template, index) in state.option.templates"
          :key="template.name"
          class="relative"
        >
          <button
            @click="toggleTemplate(template)"
            :data-section="'template'"
            :data-index="index"
            :class="[
              'w-full py-2 px-4 bg-gray-800 border rounded-lg text-gray-100 transition-all duration-150',
              'focus:outline-none focus:ring-4 focus:ring-blue-500',
              state.templates.has(template.name)
                ? 'border-blue-500 border-2 shadow-lg shadow-blue-500/50 bg-gradient-to-br from-blue-500/30 to-blue-700/20'
                : 'border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20',
            ]"
            @keydown.left.prevent="focusPreviousButton($event, index, 'template')"
            @keydown.right.prevent="focusNextButton($event, index, 'template')"
          >
            {{ template.name }}
            <span v-if="template.command" class="block font-light text-xs text-gray-300">
              {{ template.command }}
            </span>
          </button>
          <!-- Template TextInput -->
          <div v-if="state.templates.has(template.name) && template.textInput" class="mt-2">
            <label class="block text-sm font-medium text-gray-100 mb-1">{{
              template.textInput.label
            }}</label>
            <input
              :ref="(el) => (inputRefsTemplates[template.name] = el as HTMLInputElement)"
              v-model="state.inputs.templates[template.name]"
              :placeholder="template.textInput.placeholder"
              type="text"
              class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @keyup.enter="handleKeyboardNavigation"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Command Output -->
    <div class="fixed bottom-0 left-0 right-0 p-6 flex justify-center z-50">
      <div
        class="w-full max-w-3xl bg-gray-900/60 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
      >
        <!-- Terminal Header -->
        <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
          <div class="flex gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500" />
            <div class="w-3 h-3 rounded-full bg-yellow-500" />
            <div class="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div class="text-gray-400 text-sm flex-1 text-center">Terminal</div>
        </div>

        <!-- Terminal Content -->
        <div class="p-4 gap-4 flex items-baseline">
          <div
            class="flex-1 font-mono text-gray-200 whitespace-pre-wrap focus:outline-none relative"
            contenteditable="true"
            @input="handleCmdEdit"
            ref="cmdEditableDiv"
          >
            {{ state.editedCmd }}
          </div>

          <!-- Refresh Button -->
          <button
            v-if="state.showRefresh"
            @click="resetEditedCmd"
            class="flex items-center gap-2 px-3 py-1.5 text-sm rounded bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
          >
            <!-- Refresh Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Reset
          </button>

          <!-- Copy Button -->
          <button
            @click="handleCopy"
            class="flex items-center gap-2 px-3 py-1.5 text-sm rounded bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
            :class="{ 'bg-green-700 hover:bg-green-700': state.copied }"
          >
            <span v-if="state.copied">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </span>
            {{ state.copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import type {
  Category,
  Framework,
  FrameworkState,
  Option,
  Template,
} from '@/utils/frameworks/type.ts'
import { laravel } from '@/utils/frameworks/laravel.ts'
import BaseLine from '@/components/BaseLine.vue'
import { sail } from '@/utils/frameworks/sail.ts'

const FRAMEWORKS: Framework[] = [...laravel, ...sail]

const state: FrameworkState = reactive({
  searchQuery: '',
  framework: null,
  category: null,
  option: null,
  templates: new Set(),
  inputs: { main: '', templates: {} },
  copied: false,
  errors: {},
  editedCmd: '', // Added for editable command
  showRefresh: false, // Flag to show refresh button
})

const inputRefsSearch = ref<HTMLInputElement | null>(null)
const inputRefsMain = ref<HTMLInputElement | null>(null)
const inputRefsTemplates = reactive<Record<string, HTMLInputElement | null>>(
  {} as Record<string, HTMLInputElement | null>,
)
const cmdEditableDiv = ref<HTMLDivElement | null>(null)

const handleKeyboardShortcuts = (event: KeyboardEvent) => {
  // Ctrl+Del => Reset & scroll top
  if (event.ctrlKey && event.key === 'Delete') {
    event.preventDefault()
    reset()
    inputRefsSearch.value!.focus()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Ctrl+F => Focus search & scroll top
  if (event.ctrlKey && event.key === 'f') {
    event.preventDefault()
    if (inputRefsSearch.value) {
      inputRefsSearch.value.focus()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Ctrl+Enter => Blur & copy
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    document.querySelectorAll('input, textarea').forEach((input) => {
      ;(input as HTMLElement).blur()
    })
    void handleCopy()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyboardShortcuts)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboardShortcuts)
})

const updateState = (updates: Partial<typeof state>) => {
  Object.assign(state, updates)
}

const reset = () => {
  updateState({
    searchQuery: '',
    framework: null,
    category: null,
    option: null,
    templates: new Set(),
    inputs: { main: '', templates: {} },
    copied: false,
    errors: {},
    editedCmd: '', // Reset editedCmd
    showRefresh: false,
  })
}

const selectFramework = (fw: Framework) => {
  updateState({
    framework: fw,
    category: null,
    option: null,
    templates: new Set(),
    inputs: { main: '', templates: {} },
  })
  nextTick(() => {
    const firstCategoryButton = document.querySelector('[data-section="category"]') as HTMLElement
    if (firstCategoryButton) {
      firstCategoryButton.focus()
      firstCategoryButton.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })
}

const selectCategory = (cat: Category) => {
  updateState({
    category: cat,
    option: null,
    templates: new Set(),
    inputs: { main: '', templates: {} },
  })
  nextTick(() => {
    const firstOptionButton = document.querySelector('[data-section="option"]') as HTMLElement
    if (firstOptionButton) {
      firstOptionButton.focus()
      firstOptionButton.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })
}

const selectOption = (opt: Option) => {
  updateState({
    option: opt,
    templates: new Set(),
    inputs: { main: '', templates: {} },
  })
  nextTick(() => {
    if (state.option?.textInput && inputRefsMain.value) {
      inputRefsMain.value.focus()
      inputRefsMain.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      const firstTemplateButton = document.querySelector('[data-section="template"]') as HTMLElement
      if (firstTemplateButton) {
        firstTemplateButton.focus()
        firstTemplateButton.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  })
}

const toggleTemplate = (template: Template) => {
  const name = template.name
  if (template.multiSelect) {
    if (state.templates.has(name)) {
      state.templates.delete(name)
      if (template.textInput) {
        delete state.inputs.templates[name]
      }
    } else {
      state.templates.add(name)
    }
  } else {
    if (state.templates.has(name)) {
      state.templates.delete(name)
      if (template.textInput) {
        delete state.inputs.templates[name]
      }
    } else {
      // Since multiSelect is false, clear other templates
      state.templates.clear()
      state.inputs.templates = {}
      state.templates.add(name)
    }
  }
  nextTick(() => {
    if (state.templates.has(name) && template.textInput) {
      const input = inputRefsTemplates[name]
      if (input) {
        input.focus()
        input.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  })
}

const focusPreviousButton = (event: KeyboardEvent, currentIndex: number, section: string) => {
  event.preventDefault()
  const buttons = Array.from(
    document.querySelectorAll(`[data-section="${section}"]`),
  ) as HTMLElement[]
  const newIndex = (currentIndex - 1 + buttons.length) % buttons.length
  buttons[newIndex].focus()
}

const focusNextButton = (event: KeyboardEvent, currentIndex: number, section: string) => {
  event.preventDefault()
  const buttons = Array.from(
    document.querySelectorAll(`[data-section="${section}"]`),
  ) as HTMLElement[]
  const newIndex = (currentIndex + 1) % buttons.length
  buttons[newIndex].focus()
}

const cmd = computed(() => {
  if (!state.framework || !state.option) {
    return ''
  }

  // Start with the base command
  let baseCommand = `${state.framework.id} ${state.option.id}`

  if (state.option.textInput && state.inputs.main) {
    let mainInput = state.inputs.main
    if (state.option.inputTransformer) {
      mainInput = state.option.inputTransformer(mainInput)
    }
    baseCommand += ` ${mainInput}`
  }

  const templateCommands: string[] = []

  if (state.option.templates && state.templates.size > 0) {
    state.templates.forEach((templateName) => {
      const template = state.option?.templates?.find((t) => t.name === templateName)
      if (template) {
        let templateCommand = ''

        if (template.command) {
          templateCommand = template.command

          if (template.textInput && state.inputs.templates[templateName]) {
            let templateInput = state.inputs.templates[templateName]
            if (template.inputTransformer) {
              templateInput = template.inputTransformer(templateInput)
            }

            if (templateCommand.includes('{input}')) {
              // Replace '{input}' placeholder with transformed input
              templateCommand = templateCommand.replace('{input}', templateInput)
            } else if (templateCommand.endsWith('=')) {
              // Append transformed input after '='
              templateCommand += `${templateInput}`
            } else {
              // Append transformed input with a space
              templateCommand += ` ${templateInput}`
            }
          }
        } else {
          // If no command is specified, use the template name
          templateCommand = `${templateName}`

          if (template.textInput && state.inputs.templates[templateName]) {
            let templateInput = state.inputs.templates[templateName]
            if (template.inputTransformer) {
              templateInput = template.inputTransformer(templateInput)
            }
            templateCommand += `=${templateInput}`
          }
        }

        templateCommands.push(templateCommand)
      }
    })
  }

  // Combine the base command with any template commands
  if (templateCommands.length > 0) {
    return `${baseCommand} ${templateCommands.join(' ')} `
  } else {
    return baseCommand + ' '
  }
})

// Initialize editedCmd with the value of cmd
watch(
  cmd,
  (newCmd) => {
    state.editedCmd = newCmd
    state.showRefresh = false
  },
  { immediate: true },
)

const handleCmdEdit = (event: Event) => {
  const target = event.target as HTMLElement
  state.editedCmd = target.innerText
  state.showRefresh = true
}

let currentTimeout: number | null = null
const handleCopy = async () => {
  if (state.editedCmd) {
    if (currentTimeout) {
      clearTimeout(currentTimeout)
      state.copied = false

      await new Promise((resolve) => setTimeout(resolve, 150))
    }
    await navigator.clipboard.writeText(state.editedCmd)
    state.copied = true
    currentTimeout = setTimeout(() => (state.copied = false), 2000)
  }
}

const resetEditedCmd = () => {
  state.editedCmd = cmd.value
  state.showRefresh = false
}

const performSearch = () => {
  const query = state.searchQuery.trim().toLowerCase()
  if (!query) {
    return
  }

  let found = false

  // Search Options
  for (const framework of FRAMEWORKS) {
    for (const [catId, category] of Object.entries(framework.categories)) {
      for (const [optId, option] of Object.entries(category.options)) {
        if (optId.toLowerCase().includes(query) || option.name.toLowerCase().includes(query)) {
          updateState({
            framework,
            category: { id: catId, ...category },
            option: { id: optId, ...option },
          })
          found = true
          break
        }
      }
      if (found) break
    }
    if (found) break
  }

  if (!found) {
    // Search Categories
    for (const framework of FRAMEWORKS) {
      for (const [catId, category] of Object.entries(framework.categories)) {
        if (catId.toLowerCase().includes(query) || category.name.toLowerCase().includes(query)) {
          updateState({
            framework,
            category: { id: catId, ...category },
            option: null,
          })
          found = true
          break
        }
      }
      if (found) break
    }
  }

  if (!found) {
    // Search Frameworks
    for (const framework of FRAMEWORKS) {
      if (
        framework.id.toLowerCase().includes(query) ||
        framework.name.toLowerCase().includes(query)
      ) {
        updateState({
          framework,
          category: null,
          option: null,
        })
        found = true
        break
      }
    }
  }

  if (!found) {
    // No matches, reset selection
    updateState({
      framework: null,
      category: null,
      option: null,
    })
  }

  if (found) {
    nextTick(() => {
      let targetElement: HTMLElement | null = null

      if (state.option) {
        targetElement = document.querySelector('[data-section="option"]') as HTMLElement
      } else if (state.category) {
        targetElement = document.querySelector('[data-section="category"]') as HTMLElement
      } else if (state.framework) {
        targetElement = document.querySelector('[data-section="framework"]') as HTMLElement
      }

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
  }
}

const handleKeyboardNavigation = async (event: Event) => {
  const currentElement = event.target as HTMLElement
  const inputs = Array.from(
    document.querySelectorAll('input, textarea, [tabindex]:not([tabindex="-1"])'),
  ) as HTMLElement[]
  const currentIndex = inputs.indexOf(currentElement)

  if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
    inputs[currentIndex + 1].focus()
    inputs[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' })
  } else {
    if (currentElement.id !== 'inputSearch') {
      void handleCopy()
    }
  }
}

watch(
  () => state.searchQuery,
  () => {
    if (state.searchQuery) {
      performSearch()
    } else {
      reset()
    }
  },
)
</script>
