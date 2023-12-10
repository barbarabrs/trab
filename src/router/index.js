import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
    
      component: () => import('../views/LoginUser.vue')
    },
    {
      path: '/cadastrar',
      name: 'cadastrar',
     
      component: () => import('../views/CadastrarUser.vue')
    },
    {
      path: '/areaLogada',
      name: 'areaLogada',
     
      component: () => import('../views/AreaLogada.vue')
    }
  ]
})

export default router
