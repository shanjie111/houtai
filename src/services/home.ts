import type { UserData } from '@/types/home'
import request from '../utils/request'

// 获取用户信息
export const someuserAsync = () => {
  return request<UserData>('/sys/profile', 'GET')
}
