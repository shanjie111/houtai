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
          meta: {
            username: '首页',
            icon: 'House'
          },
          component: () => import('../views/Home/index.vue')
        },
        {
          path: '/depaetment',
          name: 'depaetment',
          meta: {
            username: '组织',
            icon: 'user'
          },
          component: () => import('../views/department/index.vue')
        },
        {
          path: '/role',
          name: 'role',
          meta: {
            username: '角色',
            icon: 'setting'
          },
          component: () => import('../views/role/index.vue')
        },
        {
          path: '/employee',
          name: 'employee',
          meta: {
            username: '员工',
            icon: 'setting'
          },
          component: () => import('../views/employee/index.vue')
        },
        {
          path: '/permission',
          name: 'permission',
          meta: {
            username: '权限',
            icon: 'setting'
          },
          component: () => import('../views/permission/index.vue')
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
const whiteList = ['/login', '/404', '/:catchAll(.*)']

router.beforeEach((to, form, next) => {
  NProgress.start()
  const loginStore = useLoginStore()
  // 存在token
  if (loginStore.token) {
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
