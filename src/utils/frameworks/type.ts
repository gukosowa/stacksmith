export type Template = {
  name: string
  command?: string
  multiSelect?: boolean
  textInput?: { label: string; placeholder: string }
  inputTransformer?: (input: string) => string
}

export type Option = {
  id?: string
  name: string
  textInput?: { label: string; placeholder: string }
  templates?: Template[]
  inputTransformer?: (input: string) => string
}

export type Category = {
  id?: string
  name: string
  icon?: string
  options: Record<string, Option>
}

export type Framework = {
  id: string
  name: string
  icon?: string
  categories: Record<string, Category>
}

export type FrameworkState = {
  searchQuery: string
  framework: Framework | null
  category: Category | null
  option: Option | null
  templates: Set<string>
  inputs: {
    main: string
    templates: Record<string, string>
  }
  copied: boolean
  errors: Record<string, string>
}
