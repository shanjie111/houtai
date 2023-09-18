import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const isCollapse = ref(true)
  const updataIsCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  return { isCollapse, updataIsCollapse }
})
