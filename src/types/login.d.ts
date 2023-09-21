export interface LoginForm {
  mobile: string
  password: string
  isAgree: boolean
}

export interface LoginRules {
  mobile: {
    required?: boolean
    message: string
    trigger: string
    pattern?: RegExp
  }[]
  password: {
    required?: boolean
    message: string
    trigger: string
    min?: number
    max?: number
  }[]
  isAgree: {
    validator: (rule: any, value: any, callback: (error?: Error) => void) => void
    trigger: string
  }[]
}
