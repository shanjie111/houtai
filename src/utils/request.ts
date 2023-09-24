import axios, { type Method } from 'axios'
import { ElMessage } from 'element-plus'
import { useLoginStore, useUserStore } from '@/stores'
// import { useRouter } from 'vue-router'
import router from '../router'

// 创建axios实例
const instance = axios.create({
  // 基地址
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时时间
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (req) => {
    // 统一添加请求头
    const loginStore = useLoginStore()
    const token = loginStore.token

    if (token) {
      // 统一添加请求头
      req.headers.Authorization = `Bearer ${token}`
    }
    // return
    return req
  },
  (err) => {
    Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  //状态码是200的时候
  (res) => {
    // 如果code不是200的时候
    if (res.data.success) {
      return res.data
    } else {
      ElMessage.error(res.data.message)
      return Promise.reject(new Error(res.data.message))
    }
  },
  // 状态码不是200
  (err) => {
    // 获取pinia仓库
    const loginStore = useLoginStore()
    const userStore = useUserStore()
    // 如果状态码是401
    if (err.response.status === 401) {
      // const router = useRouter()
      // console.log(router, 'router')
      // router是undefined
      // 提示用户
      // 清空用户数据
      loginStore.delUser()
      userStore.delList()
      // 退出登陆
      router.push('/login')
      ElMessage.error('登陆超时，请重新登陆')
    } else {
      ElMessage.error('获取消息失败')
    }
    return Promise.reject(new Error(err))
  }
)

type Data<T> = {
  code: number
  data: T
  message: string
  success: boolean
}

// 封装请求工具
const request = <T>(url: string, method: Method, submitData?: object) => {
  // 入参：请求地址  请求方法  请求参数
  // res的类型：取决于request方法的第2个泛型参数 R
  // res.data的类型：取决于request方法的第1个泛型参数 T
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLocaleLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
