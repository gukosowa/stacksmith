import { createRouter, createWebHistory } from 'vue-router'
import Stacksmith from '../views/Stacksmith.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Stacksmith,
    },
  ],
})

export default router
