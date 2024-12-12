<template>
  <button
    class="flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-colors"
    :class="[
      active ? 'bg-green-700 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600',
      'text-gray-200'
    ]"
    @click="$emit('click')"
  >
    <component :is="getIcon" class="h-4 w-4" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RefreshIcon from '../icons/RefreshIcon.vue'
import CopyIcon from '../icons/CopyIcon.vue'
import CheckIcon from '../icons/CheckIcon.vue'

const props = defineProps<{
  icon: 'refresh' | 'copy'
  active?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()

const getIcon = computed(() => {
  if (props.icon === 'copy' && props.active) {
    return CheckIcon
  }
  return {
    refresh: RefreshIcon,
    copy: CopyIcon
  }[props.icon]
})</script>