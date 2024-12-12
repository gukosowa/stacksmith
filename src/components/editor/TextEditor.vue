<template>
  <div class="relative font-mono text-sm">
    <div
      ref="editorRef"
      class="outline-none bg-gray-900 text-gray-100 p-4 rounded-lg"
      tabindex="0"
      @keydown="handleKeyDown"
      @click="handleClick"
    >
      <EditorLine
        v-for="(line, index) in lines"
        :key="index"
        :line-number="index + 1"
        :content="line"
        :is-selected="isLineSelected(index)"
      />
      <EditorCursor
        v-for="(cursor, index) in cursors"
        :key="index"
        :position="getCursorPosition(cursor)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import EditorLine from './EditorLine.vue'
import EditorCursor from './EditorCursor.vue'
import { useEditor } from '@/composables/useEditor'

const editorRef = ref<HTMLDivElement | null>(null)

const {
  content,
  cursors,
  selectedRanges,
  addCursor,
  moveCursor,
  insertText,
  deleteText,
  handleKeyDown,
} = useEditor()

const lines = computed(() => content.value.split('\n'))

const getCursorPosition = (cursor: number) => {
  let line = 0
  let col = cursor

  for (const lineContent of lines.value) {
    if (col <= lineContent.length) {
      return { x: col, y: line }
    }
    col -= lineContent.length + 1 // +1 for newline
    line++
  }

  return { x: col, y: line }
}

const isLineSelected = (lineIndex: number) => {
  return selectedRanges.value.some(
    (range) => range.start.line <= lineIndex && lineIndex <= range.end.line
  )
}

const handleClick = (event: MouseEvent) => {
  if (!editorRef.value) return

  const rect = editorRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  // Calculate cursor position based on click coordinates
  const charWidth = 8 // Approximate width of a monospace character
  const lineHeight = 20 // Approximate line height

  const col = Math.floor(x / charWidth)
  const line = Math.floor(y / lineHeight)

  if (event.altKey) {
    // Add new cursor
    addCursor({ line, col })
  } else {
    // Move primary cursor
    moveCursor({ line, col })
  }
}
</script>