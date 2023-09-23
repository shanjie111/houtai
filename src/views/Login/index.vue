<script setup lang="ts">
import { ref } from 'vue'
import type { LoginForm, LoginRules } from '@/types/login'
import { loginAsync } from '@/services/login'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores'
import { ElMessage } from 'element-plus'

// 表单绑定的数据
const form = ref<LoginForm>({
  mobile: import.meta.env.VITE_APP_ENV === 'development' ? '13800000002' : '',
  password: import.meta.env.VITE_APP_ENV === 'development' ? 'hm#qd@23!' : '',
  isAgree: import.meta.env.VITE_APP_ENV === 'development' ? true : false
})

// 表单校验规则
const rules = ref<LoginRules>({
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 16, message: '请输入6-16位的密码', trigger: 'blur' }
  ],
  isAgree: [
    {
      validator: (rule, value, callback) => {
        if (value) {
          callback()
        } else {
          callback(new Error('请勾选用户平台使用协议'))
        }
      },
      trigger: 'change'
    }
  ]
})

// 获取到模板的ref
const formRef = ref<any>(null)

const router = useRouter()
const loginStore = useLoginStore()
// 点击登陆按钮
const login = () => {
  formRef.value!.validate(async (isOk: boolean) => {
    if (isOk) {
      // 校验成功
      const res = await loginAsync(form.value)
      console.log(res.data)
      if (res.success === true) {
        ElMessage({
          message: res.message,
          type: 'success'
        })
        loginStore.setToken(res.data)
        router.push('/')
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1 style="font-weight: 700; margin-bottom: 20px">登录</h1>
      <!-- 登陆卡片 -->
      <el-card shadow="never" class="login-card" style="background-color: #f5f6f8">
        <!--登录表单-->
        <el-form ref="formRef" :model="form" :rules="rules">
          <!-- 手机号 -->
          <el-form-item prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password" style="margin-top: 20px">
            <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <!-- 复选框 -->
          <el-form-item prop="isAgree" style="margin-top: 20px">
            <el-checkbox v-model="form.isAgree">用户平台使用协议</el-checkbox>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item style="margin-top: 20px">
            <el-button type="primary" style="width: 350px" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/84a827346a7b664375f07f28c9ad1ec.jpg) no-repeat
      center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center / contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
