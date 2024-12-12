<template>
  <div 
    class="absolute inset-0 pointer-events-none transition-all duration-200"
    :class="[
      variant === 'blue' && 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20',
      variant === 'green' && 'ring-2 ring-green-500 shadow-lg shadow-green-500/20',
      variant === 'red' && 'ring-2 ring-red-500 shadow-lg shadow-red-500/20',
      isSelected && 'opacity-100',
      !isSelected && 'opacity-0'
    ]"
  >
    <div 
      class="absolute inset-0 rounded-lg"
      :class="[
        variant === 'blue' && 'bg-blue-500/10',
        variant === 'green' && 'bg-green-500/10',
        variant === 'red' && 'bg-red-500/10'
      ]"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isSelected: boolean
  variant: 'blue' | 'green' | 'red'
}>()
</script>