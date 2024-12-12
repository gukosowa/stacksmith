<template>
  <Transition name="slide-up" mode="out-in">
    <div
      v-if="categories"
      class="w-full max-w-md md:max-w-2xl xl:max-w-3xl grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <button
        v-for="([id, cat], index) in Object.entries(categories)"
        :key="id"
        :data-section="'category'"
        :data-index="index"
        :class="[
          'flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl py-2 px-6 border items-center justify-center flex group relative transition-base',
          'focus:outline-none focus:ring-4 focus:ring-green-500',
          selectedId === id
            ? 'border-green-500 border-2 shadow-lg shadow-green-500/50 bg-gradient-to-br from-green-500/30 to-green-700/20'
            : 'border-gray-700 hover:shadow-lg hover:shadow-green-500/20 hover:border-green-500',
        ]"
        @click="$emit('select', { id, ...cat })"
        @keydown.left.prevent="focusPreviousButton($event, index)"
        @keydown.right.prevent="focusNextButton($event, index)"
      >
        <span class="text-gray-100 text-center text-md font-medium relative z-10 group-hover:text-green-200">
          {{ cat.name }}
        </span>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Category } from '@/types/editor'
import { useKeyboardNavigation } from '@/composables/useKeyboardNavigation'

defineProps<{
  categories?: Record<string, Category>
  selectedId?: string
}>()

defineEmits<{
  (e: 'select', category: Category & { id: string }): void
}>()

const { focusPreviousButton, focusNextButton } = useKeyboardNavigation('category')
</script>