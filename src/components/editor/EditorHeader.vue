<template>
  <div class="flex items-center gap-4 mb-4">
    <select
      :value="selectedLanguage.value.id"
      @change="onSelect($event.target as HTMLSelectElement)"
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
import type { ComputedRef } from 'vue'

const props = defineProps<{
  languages: Language[]
  selectedLanguage: ComputedRef<Language>
}>()

const emit = defineEmits<{
  (e: 'select', lang: Language): void
}>()

const onSelect = (select: HTMLSelectElement) => {
  const lang = props.languages.find((lang) => lang.id === select.value) as Language
  console.log({ lang })
  emit('select', lang)
}
</script>
