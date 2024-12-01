export function toPascalCase(input: string | unknown): string {
  if (!input || typeof input !== 'string') {
    return '' // Handle undefined, null, or non-string inputs
  }

  return input
    .replace(/(\w)(\w*)/g, (_, firstChar, rest) => firstChar.toUpperCase() + rest.toLowerCase())
    .replace(/\s+/g, '') // Remove spaces
}
