<template>
  <div class="min-h-screen flex flex-col items-center gap-8 p-4">
    <!-- Search Section -->
    <div class="w-full max-w-md flex gap-2">
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
        class="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        Reset
      </button>
    </div>

    <!-- Framework Selection -->
    <div class="w-full max-w-md flex gap-4">
      <button
        v-for="fw in FRAMEWORKS"
        :key="fw.id"
        :class="[
          'flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl py-2 px-6 border items-center justify-center flex group relative transition-all duration-150',
          state.framework?.id === fw.id
            ? 'border-blue-500 shadow-lg shadow-blue-500/20'
            : 'border-gray-700 hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-500',
        ]"
        @click="
          updateState({
            framework: fw,
            category: null,
            option: null,
            templates: new Set(),
            inputs: { main: '', templates: {} },
          })
        "
      >
        <span
          class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        />
        <span
          class="text-gray-100 text-center text-md font-medium relative z-10 group-hover:text-blue-200"
        >
          {{ fw.name }}
        </span>
      </button>
    </div>

    <!-- Category Selection -->
    <div v-if="state.framework" class="w-full max-w-md grid grid-cols-2 gap-4">
      <button
        v-for="(cat, id) in state.framework.categories"
        :key="id"
        :class="[
          'flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl py-2 px-6 border items-center justify-center flex group relative transition-all duration-150',
          state.category?.id === id
            ? 'border-green-500 shadow-lg shadow-green-500/20'
            : 'border-gray-700 hover:shadow-lg hover:shadow-green-500/20 hover:border-green-500',
        ]"
        @click="
          updateState({
            category: { id, ...cat },
            option: null,
            templates: new Set(),
            inputs: { main: '', templates: {} },
          })
        "
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

    <!-- Option Selection -->
    <div v-if="state.category" class="w-full max-w-md grid grid-cols-2 gap-4">
      <button
        v-for="(opt, id) in state.category.options"
        :key="id"
        :class="[
          'flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl py-2 px-6 border items-center justify-center flex group relative transition-all duration-150',
          state.option?.id === id
            ? 'border-red-500 shadow-lg shadow-red-500/20'
            : 'border-gray-700 hover:shadow-lg hover:shadow-red-500/20 hover:border-red-500',
        ]"
        @click="
          updateState({
            option: { id, ...opt },
            templates: new Set(),
            inputs: { main: '', templates: {} },
          })
        "
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
    <div v-if="state.option && state.option.textInput" class="w-full max-w-md">
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

    <!-- Templates -->
    <div
      v-if="state.option && state.option.templates && state.option.templates.length > 0"
      class="w-full max-w-md mt-4"
    >
      <div class="text-lg font-medium text-gray-100 mb-2">{{ state.option.name }} Templates</div>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="template in state.option.templates" :key="template.name" class="relative">
          <button
            @click="toggleTemplate(template)"
            :class="[
              'w-full py-2 px-4 bg-gray-800 border rounded-lg text-gray-100 focus:outline-none transition-all duration-150',
              state.templates.has(template.name)
                ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                : 'border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20',
            ]"
          >
            {{ template.name }}
          </button>
          <!-- Template TextInput -->
          <div v-if="state.templates.has(template.name) && template.textInput" class="mt-2">
            <label class="block text-sm font-medium text-gray-100 mb-1">{{
              template.textInput.label
            }}</label>
            <input
              :ref="(el) => (inputRefsTemplates[template.name] = el)"
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
    <div class="fixed bottom-6 left-0 right-0 p-6 flex justify-center">
      <div class="w-full max-w-3xl bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
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
          <div class="flex-1 font-mono text-gray-200 whitespace-pre-wrap break-all">
            {{ cmd }}
          </div>
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
import { ref, reactive, computed, watch, nextTick, type Component } from 'vue'

type Template = {
  name: string
  multiSelect?: boolean
  textInput?: { label: string; placeholder: string }
}

type Option = {
  id?: string
  name: string
  textInput?: { label: string; placeholder: string }
  templates?: Template[]
  inputTransformer?: (input: string) => string
}

type Category = {
  id?: string
  name: string
  icon?: string
  options: Record<string, Option>
}

type Framework = {
  id: string
  name: string
  icon?: string
  categories: Record<string, Category>
}

type FrameworkState = {
  searchQuery: string
  framework: Framework | null
  category: Category | null
  option: Option | null
  templates: Set<string>
  inputs: {
    main: string
    templates: Record<string, string>
  }
  copied: boolean
  errors: Record<string, string>
}

const toPascalCase = (str: string): string => {
  return str
    .replace(/_/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, '')
}

const FRAMEWORKS: Framework[] = [
  {
    id: 'php artisan',
    name: 'Laravel',
    icon: '🚀',
    categories: {
      scaffold: {
        name: 'Scaffold',
        icon: '🏗️',
        options: {
          'make:migration': {
            name: 'Migration',
            textInput: { label: 'Migration Name', placeholder: 'create_users_table' },
            inputTransformer: (input: string) => toPascalCase(input),
            templates: [
              { name: 'create', multiSelect: true },
              { name: 'table', multiSelect: true },
              { name: 'update', multiSelect: true },
            ],
          },
          'make:model': {
            name: 'Model',
            textInput: { label: 'Model Name', placeholder: 'User' },
            templates: [
              { name: 'migration', multiSelect: true },
              { name: 'controller', multiSelect: true },
              { name: 'factory', multiSelect: true },
            ],
          },
        },
      },
      command: {
        name: 'Command',
        icon: '⚡',
        options: {
          serve: {
            name: 'Server',
            templates: [
              {
                name: 'port',
                textInput: { label: 'Port', placeholder: '8000' },
                multiSelect: false,
              },
              {
                name: 'host',
                textInput: { label: 'Host', placeholder: '127.0.0.1' },
                multiSelect: false,
              },
            ],
          },
        },
      },
    },
  },
]

const state: FrameworkState = reactive({
  searchQuery: '',
  framework: null,
  category: null,
  option: null,
  templates: new Set(),
  inputs: { main: '', templates: {} },
  copied: false,
  errors: {},
})

const inputRefsSearch = ref<HTMLInputElement | null>(null)
const inputRefsMain = ref<HTMLInputElement | null>(null)
const inputRefsTemplates = reactive<Record<string, Component | null>>(
  {} as Record<string, HTMLInputElement | null>,
)

const updateState = (updates: Partial<typeof state>) => {
  Object.assign(state, updates)
}

const reset = () => {
  console.log('reset')
  updateState({
    searchQuery: '',
    framework: null,
    category: null,
    option: null,
    templates: new Set(),
    inputs: { main: '', templates: {} },
    copied: false,
    errors: {},
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
}

const cmd = computed(() => {
  if (!state.framework || !state.option) {
    return ''
  }

  let command = `${state.framework.id} ${state.option.id}`

  if (state.option.textInput && state.inputs.main) {
    let mainInput = state.inputs.main
    if (state.option.inputTransformer) {
      mainInput = state.option.inputTransformer(mainInput)
    }
    command += ` ${mainInput}`
  }

  if (state.option.templates && state.templates.size > 0) {
    state.templates.forEach((templateName) => {
      const template = state.option?.templates?.find((t) => t.name === templateName)
      if (template) {
        if (template.textInput && state.inputs.templates[templateName]) {
          command += ` --${templateName}=${state.inputs.templates[templateName]}`
        } else {
          command += ` --${templateName}`
        }
      }
    })
  }

  return command
})

let currentTimeout: number | null = null
const handleCopy = async () => {
  if (cmd.value) {
    if (currentTimeout) {
      clearTimeout(currentTimeout)
      state.copied = false

      await new Promise((resolve) => setTimeout(resolve, 150))
    }
    await navigator.clipboard.writeText(cmd.value)
    state.copied = true
    currentTimeout = setTimeout(() => (state.copied = false), 2000)
  }
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
}

const handleKeyboardNavigation = async (event: Event) => {
  const currentElement = event.target as HTMLElement
  const inputs = Array.from(
    document.querySelectorAll('input, textarea, [tabindex]:not([tabindex="-1"])'),
  ) as HTMLElement[]
  const currentIndex = inputs.indexOf(currentElement)

  if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
    inputs[currentIndex + 1].focus()
  } else {
    if (currentElement.id !== 'inputSearch') {
      currentElement.blur()
      void handleCopy()
    }
  }
}

watch(
  () => state.searchQuery,
  () => {
    performSearch()
  },
)
</script>
