import type { Framework } from '@/utils/frameworks/type.ts'
import { toPascalCase } from '@/utils/utils.ts'

export const sail: Framework[] = [
  {
    id: 'sail',
    name: 'Sail',
    icon: '🐳',
    categories: {
      container: {
        id: 'container',
        name: 'Container Management',
        icon: '🚀',
        options: {
          up: {
            id: 'up',
            name: 'Start Docker Containers',
            templates: [{ name: '-d', multiSelect: true, description: 'Start in detached mode' }],
          },
          stop: {
            id: 'stop',
            name: 'Stop Docker Containers',
            templates: [],
          },
          down: {
            id: 'down',
            name: 'Stop and Remove Docker Containers',
            templates: [
              { name: '-v', multiSelect: true, description: 'Remove containers and volumes' },
            ],
          },
          restart: {
            id: 'restart',
            name: 'Restart Docker Containers',
            templates: [],
          },
          ps: {
            id: 'ps',
            name: 'Show Container Status',
            templates: [],
          },
        },
      },
      cli: {
        id: 'cli',
        name: 'CLI Tools',
        icon: '💻',
        options: {
          shell: {
            id: 'shell',
            name: 'Shell into Application Container',
            templates: [],
          },
          'root-shell': {
            id: 'root-shell',
            name: 'Shell into Application Container as Root',
            templates: [],
          },
          tinker: {
            id: 'tinker',
            name: 'Access Laravel Tinker REPL',
            templates: [],
          },
          php: {
            id: 'php',
            name: 'Run PHP Commands',
            templates: [{ name: '...', multiSelect: false, description: 'Additional arguments' }],
          },
          composer: {
            id: 'composer',
            name: 'Run Composer Commands',
            templates: [],
          },
          artisan: {
            id: 'artisan',
            name: 'Run Artisan Commands',
            templates: [],
          },
          npm: {
            id: 'npm',
            name: 'Run NPM Commands',
            templates: [],
          },
          node: {
            id: 'node',
            name: 'Run Node Commands',
            templates: [],
          },
        },
      },
      tools: {
        id: 'tools',
        name: 'Tools',
        icon: '🛠️',
        options: {
          mysql: {
            id: 'mysql',
            name: 'MySQL CLI',
            templates: [],
          },
          redis: {
            id: 'redis',
            name: 'Redis CLI',
            templates: [],
          },
          test: {
            id: 'test',
            name: 'Run Tests',
            templates: [],
          },
          phpunit: {
            id: 'phpunit',
            name: 'Run PHPUnit Tests',
            templates: [],
          },
          pint: {
            id: 'pint',
            name: 'Run Laravel Pint',
            templates: [],
          },
          share: {
            id: 'share',
            name: 'Share Site Using Expose',
            templates: [],
          },
          logs: {
            id: 'logs',
            name: 'View Container Logs',
            templates: [{ name: '-f', multiSelect: true, description: 'Follow container logs' }],
          },
        },
      },
      general: {
        id: 'general',
        name: 'General Commands',
        icon: '⚙️',
        options: {
          '--help': {
            id: '--help',
            name: 'Show Help',
            templates: [],
          },
          'sail:install': {
            id: 'sail:install',
            name: 'Install Laravel Sail’s Default Docker Compose File',
            templates: [],
          },
          'sail:publish': {
            id: 'sail:publish',
            name: 'Publish the Laravel Sail Docker Files',
            templates: [],
          },
          'sail:add': {
            id: 'sail:add',
            name: 'Add a Service to the Docker Compose File',
            templates: [],
          },
        },
      },
    },
  },
]
