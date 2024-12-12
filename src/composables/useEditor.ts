import { ref } from 'vue'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { getLanguageExtension } from '@/utils/editor/languages'
import { editorTheme } from '@/utils/editor/theme'
import { EditorDB } from '@/utils/storage/db'
import { EDITOR_CONFIG } from '@/utils/storage/constants'

const db = new EditorDB()

export function useEditor(container: HTMLElement, initialLanguage: string = EDITOR_CONFIG.defaultLanguage) {
  const isReady = ref(false)
  let view: EditorView | null = null

  const createEditorState = (content: string, language: string) => {
    return EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        getLanguageExtension(language),
        editorTheme,
        EditorView.updateListener.of(async (update) => {
          if (update.docChanged) {
            await db.saveContent(EDITOR_CONFIG.defaultId, update.state.doc.toString())
          }
        }),
      ],
    })
  }

  const createEditor = async () => {
    try {
      await db.init()
      const savedContent = await db.getContent(EDITOR_CONFIG.defaultId)
      const state = createEditorState(savedContent, initialLanguage)

      view = new EditorView({
        state,
        parent: container,
      })

      isReady.value = true
    } catch (error) {
      console.error('Error creating editor:', error)
      isReady.value = false
    }
  }

  const updateLanguage = async (newLang: string) => {
    if (!view) return

    try {
      const currentContent = view.state.doc.toString()
      const state = createEditorState(currentContent, newLang)
      view.setState(state)
    } catch (error) {
      console.error('Error updating language:', error)
    }
  }

  const resize = () => {
    if (!view) return
    try {
      view.requestMeasure()
    } catch (error) {
      console.error('Error resizing editor:', error)
    }
  }

  return {
    isReady,
    createEditor,
    updateLanguage,
    resize,
  }
}