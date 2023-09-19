import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // 点击按钮控制左侧菜单缩放
  const isCollapse = ref(true)
  const updataIsCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  return { isCollapse, updataIsCollapse }
})
