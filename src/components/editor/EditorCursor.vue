<template>
  <div
    class="absolute w-[2px] bg-blue-500 animate-pulse"
    :style="{
      left: `${position.x}ch`,
      top: `${position.y}em`,
      height: '1.2em',
    }"
  ></div>
</template>

<script setup lang="ts">
defineProps<{
  position: { x: number; y: number }
}>()
</script>