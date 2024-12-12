<template>
  <div class="w-full max-w-md md:max-w-2xl xl:max-w-3xl animate-fade-in">
    <div class="relative">
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="textInput.placeholder"
        class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        @keyup.enter="$emit('keyboardNav', $event)"
      />
      <label v-if="textInput.label" class="block text-sm font-medium text-gray-400 mt-1">
        {{ textInput.label }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  textInput: { label: string; placeholder: string }
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'keyboardNav', event: Event): void
}>()
</script>