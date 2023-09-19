import axios, { type Method } from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const instance = axios.create({
  // 基地址
  baseURL: import.meta.env.VITE_APP_CALLBACK,
  // 超时时间
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (req) => {
    // 统一添加请求头
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
    if (res.data.code !== 200) {
      ElMessage.error('获取消息失败')
      return
    }
    return res.data
  },
  (err) => {
    ElMessage.error('获取消息失败')
    return Promise.reject(new Error(err))
  }
)

type Data<T> = {
  code: number
  data: T
  message: string
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
