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
              { name: 'Ignore case', command: '-i', multiSelect: true },
              { name: 'Match whole word', command: '-w', multiSelect: true },
              { name: 'Invert match', command: '-v', multiSelect: true },
              { name: 'Show line numbers', command: '-n', multiSelect: true },
              { name: 'Count matches', command: '-c', multiSelect: true },
              { name: 'Show matching files', command: '-l', multiSelect: true },
              { name: 'Show non-matching files', command: '-L', multiSelect: true },
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
                name: 'Show lines after match',
                command: '-A',
                textInput: { label: 'Lines After', placeholder: '3' },
                multiSelect: true,
              },
              {
                name: 'Show lines before match',
                command: '-B',
                textInput: { label: 'Lines Before', placeholder: '3' },
                multiSelect: true,
              },
              {
                name: 'Show lines around match',
                command: '-C',
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
              { name: 'Extended regular expressions', command: '-E', multiSelect: true },
              { name: 'Fixed strings search', command: '-F', multiSelect: true },
              { name: 'Perl regular expressions', command: '-P', multiSelect: true },
            ],
          },
          output: {
            id: 'output',
            name: 'Output Control',
            textInput: { label: 'Pattern', placeholder: 'search term' },
            templates: [
              { name: 'Colorize output', command: '--color', multiSelect: true },
              { name: 'Show only matches', command: '-o', multiSelect: true },
              { name: 'Hide filenames', command: '-h', multiSelect: true },
              { name: 'Show filenames', command: '-H', multiSelect: true },
            ],
          },
          performance: {
            id: 'performance',
            name: 'Performance',
            textInput: { label: 'Pattern', placeholder: 'search term' },
            templates: [
              {
                name: 'Stop after N matches',
                command: '-m',
                textInput: { label: 'Max Count', placeholder: '5' },
                multiSelect: true,
              },
              { name: 'Quiet mode', command: '-q', multiSelect: true },
              { name: 'Suppress error messages', command: '-s', multiSelect: true },
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
              { name: 'Search recursively', command: '-r', multiSelect: true },
              { name: 'Follow symbolic links', command: '-R', multiSelect: true },
              {
                name: 'Include files',
                command: '--include',
                textInput: { label: 'Include Pattern', placeholder: '*.txt' },
                multiSelect: true,
              },
              {
                name: 'Exclude files',
                command: '--exclude',
                textInput: { label: 'Exclude Pattern', placeholder: '*.log' },
                multiSelect: true,
              },
              {
                name: 'Exclude directories',
                command: '--exclude-dir',
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
              { name: 'Process binary as text', command: '-a', multiSelect: true },
              { name: 'Skip binary files', command: '-I', multiSelect: true },
              { name: 'Force binary as text', command: '--binary-files=text', multiSelect: true },
              {
                name: 'Ignore binary files',
                command: '--binary-files=without-match',
                multiSelect: true,
              },
            ],
          },
        },
      },
    },
  },
]
