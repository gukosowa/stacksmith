<template>
  <div class="min-h-screen flex flex-col items-center gap-8 px-5 py-4 bg-gray-950">
    <div class="w-full max-w-7xl animate-fade-in">
      <EditorHeader
        :languages="editorState.languages"
        :selected-language="editorState.currentLanguageObject"
        @select="handleLanguageSelect"
      />
      <div class="animate-slide-up">
        <CodeMirrorEditor :language="editorState.currentLanguage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeMirrorEditor from '@/components/editor/CodeMirrorEditor.vue'
import EditorHeader from '@/components/editor/EditorHeader.vue'
import { useEditorState } from '@/composables/useEditorState'
import type { Language } from '@/types/editor'

const editorState = useEditorState()

const handleLanguageSelect = (lang: Language) => {
  editorState.setLanguage(lang.id)
}</script>