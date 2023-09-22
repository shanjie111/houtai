import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LoginOk } from '@/types/login'

export const useLoginStore = defineStore(
  'login',
  () => {
    // 存储token
    const token = ref<LoginOk>() // 创建一个 ref 对象，初始值为空字符串

    // 存储token
    const setToken = (newToken: LoginOk) => {
      token.value = newToken // 更新 ref 对象的值
    }

    // 删除token
    const delUser = () => {
      token.value = undefined
    }

    return { token, setToken, delUser }
  },
  {
    // 将token自动存入本地
    persist: true
  }
)
