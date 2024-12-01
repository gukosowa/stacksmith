<template>
  <hr
    :class="[
      'w-full border-none h-px bg-gradient-to-r from-transparent to-transparent',
      {
        'via-blue-500': color === 'blue',
        'via-green-500': color === 'green',
        'via-red-500': color === 'red',
      },
    ]"
  />
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: 'blue',
    validator: (value: string) => ['blue', 'green', 'red'].includes(value),
  },
})
</script>

<style scoped></style>
