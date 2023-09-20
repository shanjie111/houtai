import type { User } from '@/types/user'
import request from '../utils/request'
import type { Home } from '@/types/home'

export const getHomeTable = () => {
  return request<Home[]>('/home/getTableData', 'GET')
}

export const getUserTableList = () => {
  return request<User[]>('/user/getTableData', 'GET')
}
