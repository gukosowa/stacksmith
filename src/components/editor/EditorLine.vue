<template>
  <div class="flex">
    <div class="w-12 text-right pr-2 text-gray-500 select-none">{{ lineNumber }}</div>
    <div class="flex-1 whitespace-pre" :class="{ 'bg-gray-800/30': isSelected }">{{ content }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  lineNumber: number
  content: string
  isSelected: boolean
}>()
</script>