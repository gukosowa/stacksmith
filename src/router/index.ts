import { createRouter, createWebHistory } from 'vue-router'
import StacksmithPage from '../views/StacksmithPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StacksmithPage,
    },
  ],
})

export default router
