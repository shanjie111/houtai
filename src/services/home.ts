import requset from '../utils/request'
import type { home } from '@/types/home'

export const getTableList = () => {
  requset<home>('/home/getTableData', 'GET')
}
