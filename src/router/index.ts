import { createRouter, createWebHistory } from 'vue-router'
import CommandView from '../views/CommandView.vue'
import TextView from '../views/TextView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cmd',
      component: CommandView,
    },
    {
      path: '/text',
      name: 'text',
      component: TextView,
    },
  ],
})

export default router