<template>
  <div class="relative w-full">
    <div class="relative">
      <input
        type="text"
        ref="inputRef"
        v-model="query"
        @focus="open"
        @blur="handleBlur"
        @keydown.down.prevent="highlightNext"
        @keydown.up.prevent="highlightPrev"
        @keydown.enter.prevent="selectHighlighted"
        @keydown.esc="close"
        :placeholder="selectedItem.name"
        class="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        @click="toggle"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div
      v-show="isOpen"
      class="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
    >
      <div v-if="filteredItems.length === 0" class="px-3 py-2 text-gray-400 text-sm">
        No matches found
      </div>
      <div v-else class="max-h-48 overflow-y-auto">
        <button
          v-for="(item, index) in filteredItems"
          :key="item.id"
          @mousedown.prevent="select(item)"
          @mousemove="highlightedIndex = index"
          :class="[
            'w-full px-3 py-2 text-left text-sm transition-colors',
            highlightedIndex === index
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-300 hover:bg-gray-700/50',
          ]"
          type="button"
        >
          {{ item.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Language } from '@/types/editor'

const props = defineProps<{
  items: Language[]
  selectedItem: Language
}>()

const emit = defineEmits<{
  (e: 'select', item: Language): void
}>()

const query = ref('')
const isOpen = ref(false)
const highlightedIndex = ref(0)

const filteredItems = computed(() => {
  if (!query.value) return props.items
  const searchQuery = query.value.toLowerCase()
  return props.items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery) || item.id.toLowerCase().includes(searchQuery)
  )
})

const select = (item: Language) => {
  emit('select', item)
  query.value = ''
  close()
}

const selectHighlighted = () => {
  if (filteredItems.value[highlightedIndex.value]) {
    select(filteredItems.value[highlightedIndex.value])
  }
}

const highlightNext = () => {
  if (filteredItems.value.length === 0) return
  highlightedIndex.value = (highlightedIndex.value + 1) % filteredItems.value.length
}

const highlightPrev = () => {
  if (filteredItems.value.length === 0) return
  highlightedIndex.value =
    (highlightedIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length
}

const open = () => {
  isOpen.value = true
  highlightedIndex.value = 0
}

const close = () => {
  isOpen.value = false
  highlightedIndex.value = 0
}

const toggle = () => {
  isOpen.value ? close() : open()
}

const handleBlur = () => {
  setTimeout(close, 100)
}
</script>