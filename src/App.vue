<template>
  <div class="min-h-screen w-full text-gray-100">
    <header class="border-b border-gray-800 bg-gray-950 px-1">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex gap-6 items-center text-sm">
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-2xl font-bold tracking-tight"
          >
            Stacksmith
          </span>
          <RouterLink
            to="/"
            class="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors outline-none ring-blue-400/50 focus-visible:ring-2"
            :class="[
              $route.path === '/'
                ? 'text-blue-400 bg-gray-800/50'
                : 'hover:text-blue-400 hover:bg-gray-800/50',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Home</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="w-full px-4 pb-8 pt-3 bg-gray-950 relative">
      <div
        class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-800 to-transparent opacity-50 pointer-events-none"
      ></div>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
