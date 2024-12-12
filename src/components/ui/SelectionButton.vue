<template>
  <button
    class="relative w-full px-6 py-2 bg-gray-800/80 backdrop-blur border border-gray-700 rounded-lg transition-colors duration-200 group"
    :class="[focusRingColor]"
    v-bind="$attrs"
  >
    <SelectionOverlay :is-selected="isSelected" :variant="variant" />
    <div class="relative z-10">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SelectionOverlay from './SelectionOverlay.vue'

const props = defineProps<{
  isSelected: boolean
  variant: 'blue' | 'green' | 'red'
}>()

const focusRingColor = computed(() => ({
  'focus:outline-none focus:ring-4': true,
  'focus:ring-blue-500/50': props.variant === 'blue',
  'focus:ring-green-500/50': props.variant === 'green',
  'focus:ring-red-500/50': props.variant === 'red'
}))</script>