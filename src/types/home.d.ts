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
