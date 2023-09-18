import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'

declare module 'vue' {
  interface GlobalComponents {
    Header: typeof Header
    Aside: typeof Aside
  }
}
