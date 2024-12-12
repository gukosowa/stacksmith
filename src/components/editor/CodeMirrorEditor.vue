<template>
  <div class="relative w-full h-[80vh] rounded-lg overflow-hidden border border-gray-800">
    <div ref="editorContainer" class="w-full h-full bg-gray-900"></div>
    <EditorLoading :is-ready="editorState.isReady" />
    <EditorShortcuts />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import EditorLoading from './EditorLoading.vue'
import EditorShortcuts from './EditorShortcuts.vue'
import { useEditor } from '@/composables/useEditor'
import type { EditorProps } from '@/types/editor'
import '@/assets/editor-theme.css'
import { EDITOR_CONFIG } from '@/utils/storage/constants.ts'

const props = defineProps<EditorProps>()
const editorContainer = ref<HTMLElement>()
const { width, height } = useElementSize(editorContainer)
const editorState = reactive({ isReady: false })

onMounted(() => {
  if (!editorContainer.value) return

  const editor = useEditor(
    editorContainer.value,
    props.language?.value ?? EDITOR_CONFIG.defaultLanguage,
  )
  editor.createEditor().then(() => {
    editorState.isReady = editor.isReady.value
  })

  // Watch for language changes
  watch(
    () => props.language?.value,
    (newLang) => {
      if (!newLang) return
      editor.updateLanguage(newLang)
    },
    { immediate: true },
  )

  // Watch for size changes
  watch([width, height], () => {
    editor.resize()
  })

  const preventUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.returnValue = '' // Required for certain browsers to display a confirmation dialog
  }

  window.addEventListener('beforeunload', preventUnload)

  onUnmounted(() => {
    window.removeEventListener('beforeunload', preventUnload)
  })
})
</script>
