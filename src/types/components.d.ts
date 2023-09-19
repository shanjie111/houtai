import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'

// 定义封装组件全局类型
declare module 'vue' {
  interface GlobalComponents {
    Header: typeof Header
    Aside: typeof Aside
  }
}
