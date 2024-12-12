<template>
  <div class="min-h-screen w-full text-gray-100 bg-gray-950">
    <AppHeader />
    <main class="w-full relative bg-gray-950">
      <RouterView v-slot="{ Component }">
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { useRouteHistory } from '@/composables/useRouteHistory'

onMounted(() => {
  useRouteHistory()
})</script>