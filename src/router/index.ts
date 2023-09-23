import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '@/stores'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404/404.vue')
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('@/views/404/404.vue')
    }
  ]
})

// 导航前置守卫
router.beforeEach((to, form, next) => {
  NProgress.start()
  const loginStore = useLoginStore()
  const whiteList = ['/login', '/404', '/:catchAll(.*)']
  if (loginStore.token === undefined) {
    if (!whiteList.includes(to.path)) {
      return '/404'
    }
  }
  // 存在token
  if (loginStore.token !== undefined) {
    // 跳转到主页
    if (to.path === '/login') {
      // 跳转到主页
      next('/') // 中转到主页
      // next（地址）并没有执行后置守卫
      NProgress.done()
    } else {
      next() // 放行
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login') // 中转到登录页
      NProgress.done()
    }
  }
})

// 后置守卫
router.afterEach(() => {
  NProgress.done()
})

export default router
