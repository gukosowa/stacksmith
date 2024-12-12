<template>
  <TransitionGroup
    name="list"
    tag="div"
    class="w-full max-w-md md:max-w-2xl xl:max-w-3xl flex gap-4"
  >
    <SelectionButton
      v-for="(fw, index) in frameworks"
      :key="fw.id"
      :data-section="'framework'"
      :data-index="index"
      :is-selected="selectedId === fw.id"
      variant="blue"
      @click="$emit('select', fw)"
      @keydown.left.prevent="focusPreviousButton($event, index)"
      @keydown.right.prevent="focusNextButton($event, index)"
    >
      <span class="text-gray-100 text-center text-md font-medium group-hover:text-blue-200">
        {{ fw.icon }} {{ fw.name }}
      </span>
    </SelectionButton>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useKeyboardNavigation } from '@/composables/useKeyboardNavigation'
import SelectionButton from '@/components/ui/SelectionButton.vue'
import type { Framework } from '@/types/editor'

defineProps<{
  frameworks: Framework[]
  selectedId?: string
}>()

defineEmits<{
  (e: 'select', framework: Framework): void
}>()

const { focusPreviousButton, focusNextButton } = useKeyboardNavigation('framework')
</script>