<template>
  <RouterLink
    :to="to"
    class="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 outline-none ring-blue-400/50 focus-visible:ring-2"
    :class="[
      $route.path === to
        ? 'text-blue-400 bg-gray-800/50'
        : 'hover:text-blue-400 hover:bg-gray-800/50',
    ]"
  >
    <component :is="getIcon" class="w-4 h-4" />
    <span><slot /></span>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import CmdIcon from '../icons/CmdIcon.vue'
import TextIcon from '../icons/TextIcon.vue'

const props = defineProps<{
  to: string
  icon: 'cmd' | 'text'
}>()

const getIcon = computed(() => {
  const icons = {
    cmd: CmdIcon,
    text: TextIcon
  }
  return icons[props.icon]
})</script>