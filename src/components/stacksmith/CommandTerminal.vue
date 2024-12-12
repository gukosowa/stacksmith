<template>
  <Transition name="terminal">
    <div class="fixed bottom-0 left-0 right-0 p-6 flex justify-center z-50">
      <div class="w-full max-w-3xl bg-gray-900/60 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
        <TerminalHeader />
        <div class="p-4 gap-4 flex items-baseline">
          <div
            class="flex-1 font-mono text-gray-200 whitespace-pre-wrap focus:outline-none relative"
            contenteditable="true"
            @input="handleInput"
            ref="cmdEditableDiv"
          >
            {{ modelValue }}
          </div>

          <div class="flex gap-2">
            <TerminalButton
              v-if="showRefresh"
              @click="$emit('reset')"
              icon="refresh"
            >
              Reset
            </TerminalButton>

            <TerminalButton
              @click="$emit('copy')"
              :active="copied"
              icon="copy"
            >
              {{ copied ? 'Copied!' : 'Copy' }}
            </TerminalButton>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TerminalHeader from './TerminalHeader.vue'
import TerminalButton from './TerminalButton.vue'

const props = defineProps<{
  modelValue: string
  command: string
  copied: boolean
  showRefresh: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'copy'): void
  (e: 'reset'): void
}>()

const cmdEditableDiv = ref<HTMLDivElement | null>(null)

const handleInput = (event: Event) => {
  const target = event.target as HTMLElement
  emit('update:modelValue', target.innerText)
}
</script>