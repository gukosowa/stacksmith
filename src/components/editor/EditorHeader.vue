<template>
  <div class="flex items-center gap-4 mb-4">
    <select
      :value="selectedLanguage.id"
      @change="$emit('select', languages.find(lang => lang.id === $event.target.value))"
      class="w-48 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-base"
    >
      <option v-for="lang in languages" :key="lang.id" :value="lang.id">
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Language } from '@/types/editor'

defineProps<{
  languages: Language[]
  selectedLanguage: Language
}>()

defineEmits<{
  (e: 'select', lang: Language): void
}>()
</script>