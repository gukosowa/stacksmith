<template>
  <header class="border-b border-gray-800 bg-gray-950 px-1 sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3">
      <nav class="flex gap-4 items-center text-sm">
        <AppLogo />
        <NavLink to="/" icon="cmd">CMD</NavLink>
        <NavLink to="/text" icon="text">Text</NavLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppLogo from './AppLogo.vue'
import NavLink from './NavLink.vue'
</script>