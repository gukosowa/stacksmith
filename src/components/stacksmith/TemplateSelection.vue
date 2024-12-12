<template>
  <Transition name="slide-up" mode="out-in">
    <div v-if="templates && templates.length > 0" class="w-full max-w-md md:max-w-2xl xl:max-w-3xl mt-4">
      <div class="text-lg font-medium text-gray-100 mb-2">{{ title }}</div>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="(template, index) in templates" :key="template.name" class="relative">
          <button
            @click="$emit('toggle', template)"
            :data-section="'template'"
            :data-index="index"
            :class="[
              'w-full py-2 px-4 bg-gray-800 border rounded-lg text-gray-100 transition-base',
              'focus:outline-none focus:ring-4 focus:ring-blue-500',
              selectedTemplates.has(template.name)
                ? 'border-blue-500 border-2 shadow-lg shadow-blue-500/50 bg-gradient-to-br from-blue-500/30 to-blue-700/20'
                : 'border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20',
            ]"
            @keydown.left.prevent="focusPreviousButton($event, index)"
            @keydown.right.prevent="focusNextButton($event, index)"
          >
            {{ template.name }}
            <span v-if="template.command" class="block font-light text-xs text-gray-300">
              {{ template.command }}
            </span>
          </button>

          <Transition name="fade">
            <TemplateInput
              v-if="selectedTemplates.has(template.name) && template.textInput"
              :template="template"
              :model-value="inputs[template.name] || ''"
              @update:model-value="$emit('update:inputs', { ...inputs, [template.name]: $event })"
              @keyboard-nav="$emit('keyboardNav', $event)"
              class="mt-2"
            />
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Template } from '@/types/editor'
import { useKeyboardNavigation } from '@/composables/useKeyboardNavigation'
import TemplateInput from './TemplateInput.vue'

defineProps<{
  title: string
  templates: Template[]
  selectedTemplates: Set<string>
  inputs: Record<string, string>
}>()

defineEmits<{
  (e: 'toggle', template: Template): void
  (e: 'update:inputs', value: Record<string, string>): void
  (e: 'keyboardNav', event: Event): void
}>()

const { focusPreviousButton, focusNextButton } = useKeyboardNavigation('template')
</script>