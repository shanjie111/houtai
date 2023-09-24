import { defineStore } from 'pinia'
import { someuserAsync } from '@/services/home'
import { ref } from 'vue'
import type { UserData } from '@/types/home'

export const useUserStore = defineStore(
  'user',
  () => {
    const list = ref<UserData>({} as UserData)

    // 在这里执行异步操作，例如获取用户信息
    const fetchUserAsync = async () => {
      const res = await someuserAsync()
      list.value = res.data
    }

    const delList = () => {
      localStorage.removeItem('user')
      list.value = {} as UserData
    }

    return { list, fetchUserAsync, delList }
  },
  {
    // 将 token 自动存入本地
    persist: true
  }
)
