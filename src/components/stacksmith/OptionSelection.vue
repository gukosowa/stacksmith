<template>
  <Transition name="slide-up" mode="out-in">
    <div
      v-if="options"
      class="w-full max-w-md md:max-w-2xl xl:max-w-3xl grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <button
        v-for="([id, opt], index) in Object.entries(options)"
        :key="id"
        :data-section="'option'"
        :data-index="index"
        :class="[
          'flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl py-2 px-6 border items-center justify-center flex group relative transition-base',
          'focus:outline-none focus:ring-4 focus:ring-red-500',
          selectedId === id
            ? 'border-red-500 border-2 shadow-lg shadow-red-500/50 bg-gradient-to-br from-red-500/30 to-red-700/20'
            : 'border-gray-700 hover:shadow-lg hover:shadow-red-500/20 hover:border-red-500',
        ]"
        @click="$emit('select', { id, ...opt })"
        @keydown.left.prevent="focusPreviousButton($event, index)"
        @keydown.right.prevent="focusNextButton($event, index)"
      >
        <span class="text-gray-100 text-center text-md font-medium relative z-10 group-hover:text-red-200">
          {{ opt.name }}
          <span class="block font-light text-xs text-gray-300">{{ id }}</span>
        </span>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Option } from '@/types/editor'
import { useKeyboardNavigation } from '@/composables/useKeyboardNavigation'

defineProps<{
  options: Record<string, Option>
  selectedId?: string
}>()

defineEmits<{
  (e: 'select', option: Option & { id: string }): void
}>()

const { focusPreviousButton, focusNextButton } = useKeyboardNavigation('option')
</script>