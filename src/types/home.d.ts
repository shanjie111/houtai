export type Home = { name: string; todayBuy: number; monthBuy: number; totalBuy: number }

/**
 * 响应数据
 */
export interface UserData {
  /**
   * 用户的城市信息
   */
  city: string
  /**
   * 用户所在公司名
   */
  company: string
  /**
   * 用户所在公司id
   */
  companyId: string
  /**
   * 用户手机号
   */
  mobile: string
  /**
   * 用户权限点对象
   */
  roles: Roles
  /**
   * 用户头像
   */
  staffPhoto: string
  /**
   * 用户id
   */
  userId: number
  /**
   * 用户名
   */
  username: string
  [property: string]: any
}

/**
 * 用户权限点对象
 */
export interface Roles {
  /**
   * 路由权限点数组，每个字符串, 是用项目设置的, 标记英文字符串
   */
  menus: string[]
  /**
   * 按钮权限点数组，每个字符串, 是用项目设置的, 标记英文字符串
   */
  points: string[]
  [property: string]: any
}

export interface LoginFormPaaa {
  oldPassword: string
  newPassword: string
  rePassword: string
}
// 修改密码
export interface LoginRulesPass {
  oldPassword: {
    required?: boolean
    message: string
    trigger: string
    min?: number
    max?: number
  }[]
  newPassword: {
    required?: boolean
    message: string
    trigger: string
    min?: number
    max?: number
  }[]
  rePassword: {
    required?: boolean
    message?: string
    trigger?: string
    min?: number
    max?: number
    validator?: (rule: any, value: any, callback: (error?: Error) => void) => void
  }[]
}

export type LoginOk = {
  code?: number
  message?: string
  data: string
  success?: boolean
}
