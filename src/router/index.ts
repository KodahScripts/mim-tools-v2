import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import VwCalculator from '../pages/VwCalculator.vue'
import UtaUploader from '../pages/UtaUploader.vue'
import CcUploader from '../pages/CcUploader.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/vw-calc',
      name: 'VW Calculator',
      component: VwCalculator,
    },
    {
      path: '/uta-upload',
      name: 'UTA Uploader',
      component: UtaUploader,
    },
    {
      path: '/cc-upload',
      name: 'CC Uploader',
      component: CcUploader,
    },
  ],
})

export default router
