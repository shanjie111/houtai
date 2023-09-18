import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/Home/index.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/User/index.vue')
        },
        {
          path: '/page1',
          name: 'page1',
          component: () => import('../views/Page1/index.vue')
        },
        {
          path: '/page2',
          name: 'page2',
          component: () => import('../views/Page2/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/index.vue')
    }
  ]
})

export default router
