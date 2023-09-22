import type { LoginForm, LoginOk } from '@/types/login'
import request from '../utils/request'

export const loginAsync = (data: LoginForm) => {
  return request<LoginOk>('/sys/login', 'POST', data)
}
