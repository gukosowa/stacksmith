<template>
  <div class="min-h-screen w-full text-gray-100">
    <header class="border-b border-gray-800 bg-gray-950">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex gap-6 items-center">
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-2xl font-bold tracking-tight"
          >
            Stacksmith
          </span>
          <RouterLink
            to="/"
            class="hover:text-blue-400 transition-colors"
            active-class="text-blue-400"
          >
            Home
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="w-full px-4 py-8 bg-gray-950 relative">
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
