<template>
  <div class="w-full max-w-md md:max-w-2xl xl:max-w-3xl flex gap-2 animate-fade-in">
    <div class="relative flex-1">
      <input
        ref="inputRef"
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search (e.g., 'migr' for migrations)"
        @keyup.enter="$emit('keyboardNav', $event)"
      />
      <button
        v-if="modelValue"
        tabindex="-1"
        @click="$emit('update:modelValue', '')"
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
      @click="$emit('reset')"
      tabindex="-1"
      class="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      Reset
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'reset'): void
  (e: 'keyboardNav', event: Event): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({ inputRef })
</script>