import type { UserData } from '@/types/home'
import request from '../utils/request'
// 首页

// 获取用户信息
export const someuserAsync = () => {
  return request<UserData>('/sys/profile', 'GET')
}

// 修改密码
export const passUserAsync = (data: {
  oldPassword: string
  newPassword: string
  rePassword?: string
}) => {
  return request('/sys/user/updatePass', 'PUT', data)
}
