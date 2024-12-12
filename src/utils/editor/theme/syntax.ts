import { EditorView } from '@codemirror/view'
import { tags } from '@lezer/highlight'
import { monokai } from './colors'

export const syntaxTheme = EditorView.theme({}, {
  // Basic syntax
  [tags.comment]: { color: monokai.comment },
  [tags.string]: { color: monokai.yellow },
  [tags.number]: { color: monokai.purple },
  [tags.keyword]: { color: monokai.pink },
  [tags.operator]: { color: monokai.pink },
  [tags.definition(tags.variableName)]: { color: monokai.blue },
  [tags.function(tags.variableName)]: { color: monokai.green },
  
  // Language specific
  [tags.propertyName]: { color: monokai.blue },
  [tags.typeName]: { color: monokai.blue, fontStyle: 'italic' },
  [tags.className]: { color: monokai.green },
  [tags.special(tags.variableName)]: { color: monokai.blue }, // PHP variables
  [tags.processingInstruction]: { color: monokai.pink }, // PHP tags
  
  // Markup
  [tags.tagName]: { color: monokai.pink },
  [tags.attributeName]: { color: monokai.green },
  [tags.attributeValue]: { color: monokai.yellow },
  
  // Additional syntax
  [tags.heading]: { color: monokai.pink },
  [tags.link]: { color: monokai.blue },
  [tags.url]: { color: monokai.blue },
  [tags.meta]: { color: monokai.pink },
  [tags.regexp]: { color: monokai.yellow },
})