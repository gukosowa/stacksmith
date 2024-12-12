<template>
  <div
    v-if="!isReady"
    class="absolute inset-0 bg-gray-900 flex items-center justify-center"
  >
    <div class="flex items-center gap-3">
      <div class="w-3 h-3 rounded-full bg-blue-500 animate-ping"></div>
      <span class="text-gray-400">Loading editor...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isReady: boolean
}>()</script>