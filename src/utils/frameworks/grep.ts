import type { Framework } from '@/utils/frameworks/type.ts'

export const grep: Framework[] = [
  {
    id: 'grep',
    name: 'Grep',
    icon: '🔍',
    categories: {
      basic: {
        id: 'basic',
        name: 'Basic',
        icon: '📝',
        options: {
          pattern: {
            id: 'pattern',
            name: 'Pattern Search',
            textInput: { label: 'Pattern', placeholder: 'search term' },
            templates: [
              { name: '-i, --ignore-case', multiSelect: true },
              { name: '-w, --word-regexp', multiSelect: true },
              { name: '-v, --invert-match', multiSelect: true },
              { name: '-n, --line-number', multiSelect: true },
              { name: '-c, --count', multiSelect: true },
              { name: '-l, --files-with-matches', multiSelect: true },
              { name: '-L, --files-without-match', multiSelect: true },
            ],
          },
        },
      },
      context: {
        id: 'context',
        name: 'Context',
        icon: '📄',
        options: {
          context: {
            id: 'context',
            name: 'Context Control',
            textInput: { label: 'Pattern', placeholder: 'search term' },
            templates: [
              {
                name: '-A, --after-context',
                textInput: { label: 'Lines After', placeholder: '3' },
                multiSelect: true,
              },
              {
                name: '-B, --before-context',
                textInput: { label: 'Lines Before', placeholder: '3' },
                multiSelect: true,
              },
              {
                name: '-C, --context',
                textInput: { label: 'Lines Around', placeholder: '3' },
                multiSelect: true,
              },
            ],
          },
        },
      },
      advanced: {
        id: 'advanced',
        name: 'Advanced',
        icon: '⚡',
        options: {
          regex: {
            id: 'regex',
            name: 'Regular Expressions',
            textInput: { label: 'Pattern', placeholder: 'search term' },
            templates: [
              { name: '-E, --extended-regexp', multiSelect: true },
              { name: '-F, --fixed-strings', multiSelect: true },
              { name: '-P, --perl-regexp', multiSelect: true },
            ],
          },
          output: {
            id: 'output',
            name: 'Output Control',
            textInput: { label: 'Pattern', placeholder: 'search term' },
            templates: [
              { name: '--color', multiSelect: true },
              { name: '-o, --only-matching', multiSelect: true },
              { name: '-h, --no-filename', multiSelect: true },
              { name: '-H, --with-filename', multiSelect: true },
            ],
          },
          performance: {
            id: 'performance',
            name: 'Performance',
            textInput: { label: 'Pattern', placeholder: 'search term' },
            templates: [
              {
                name: '-m, --max-count',
                textInput: { label: 'Max Count', placeholder: '5' },
                multiSelect: true,
              },
              { name: '-q, --quiet', multiSelect: true },
              { name: '-s, --no-messages', multiSelect: true },
            ],
          },
        },
      },
      files: {
        id: 'files',
        name: 'File Control',
        icon: '📁',
        options: {
          directory: {
            id: 'directory',
            name: 'Directory Options',
            textInput: { label: 'Pattern', placeholder: 'search term' },
            templates: [
              { name: '-r, --recursive', multiSelect: true },
              { name: '-R, --dereference-recursive', multiSelect: true },
              {
                name: '--include',
                textInput: { label: 'Include Pattern', placeholder: '*.txt' },
                multiSelect: true,
              },
              {
                name: '--exclude',
                textInput: { label: 'Exclude Pattern', placeholder: '*.log' },
                multiSelect: true,
              },
              {
                name: '--exclude-dir',
                textInput: { label: 'Exclude Directory', placeholder: 'node_modules' },
                multiSelect: true,
              },
            ],
          },
          binary: {
            id: 'binary',
            name: 'Binary Files',
            textInput: { label: 'Pattern', placeholder: 'search term' },
            templates: [
              { name: '-a, --text', multiSelect: true },
              { name: '-I, --binary-files=without-match', multiSelect: true },
              { name: '--binary-files=text', multiSelect: true },
              { name: '--binary-files=without-match', multiSelect: true },
            ],
          },
        },
      },
    },
  },
]
