import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
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
      //beforeEnter: (to, from, next) => {
        //verificaToken(to, from, next);
     
      //}
    },
    {
      path: '/editarUser',
      name: 'editarUser',
      component: () => import('../views/EditarUser.vue')
    },

  ]
})

export default router
