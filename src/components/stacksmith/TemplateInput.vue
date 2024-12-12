<template>
  <div class="relative">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="template.textInput?.placeholder"
      class="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-base"
      @keyup.enter="$emit('keyboardNav', $event)"
    />
    <label v-if="template.textInput?.label" class="block text-sm font-medium text-gray-400 mt-1">
      {{ template.textInput.label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import type { Template } from '@/types/editor'

defineProps<{
  template: Template
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'keyboardNav', event: Event): void
}>()
</script>