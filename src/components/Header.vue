<script setup lang="ts">
import { useLoginStore, useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// 点击按钮控制左侧菜单的缩放
import { useCounterStore } from '@/stores'
const countStore = useCounterStore()
const handleCollapse = () => {
  countStore.updataIsCollapse()
}

// 左上角显示的地址
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const route = useRoute()

// 用户数据
import type { UserData } from '@/types/home'
import { nextTick } from 'vue'
const userStore = useUserStore()
const data = ref({} as UserData)
onBeforeMount(async () => {
  await userStore.fetchUserAsync()
  data.value = await userStore.list
})

nextTick(() => {
  data.value = userStore.list
})

// 退出登陆
const loginStore = useLoginStore()
const router = useRouter()
const delItem = () => {
  ElMessage.success('退出成功')
  loginStore.delUser()
  userStore.delList()
  router.push('/login')
}

// 背景颜色
import { onUnmounted } from 'vue'
import { onBeforeMount } from 'vue'
const color = ref({
  background: '#fff'
})

const timer = setTimeout(() => {
  if (data.value.staffPhoto) {
    color.value.background = '#fff'
  } else {
    color.value.background = '#04c9be'
  }
}, 800)

onUnmounted(() => {
  clearTimeout(timer)
})

// 更改密码
import type { LoginFormPaaa, LoginRulesPass } from '@/types/home'
const dialogVisible = ref(false)
const isForm = () => {
  dialogVisible.value = true
}
// 数据
const formModel = ref<LoginFormPaaa>({
  oldPassword: '',
  newPassword: '',
  rePassword: ''
})

// 校验信息
const formRules = ref<LoginRulesPass>({
  oldPassword: [
    { required: true, message: '旧密码不能为空', trigger: 'blur' },
    { min: 6, max: 16, message: '最少6位为多16位', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { min: 6, max: 16, message: '最少6位为多16位', trigger: 'blur' }
  ],
  rePassword: [
    { required: true, message: '重新输入新密码', trigger: 'blur' },
    { min: 6, max: 16, message: '最少6位为多16位', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === formModel.value.newPassword) {
          callback()
        } else {
          callback(new Error('新密码和重复密码不一致'))
        }
      },
      trigger: 'blur'
    }
  ]
})

// 修改成功
const formRef = ref()
import { passUserAsync } from '@/services/home'
const formPass = () => {
  formRef.value.validate(async (isOk: boolean) => {
    if (isOk) {
      const res = await passUserAsync(formModel.value)
      console.log(res)
    }
  })
}
// 点击取消清空数据
const btnClose = () => {
  formRef.value.resetFields()
  dialogVisible.value = false
}
</script>

<template>
  <el-header>
    <div class="l-contnet">
      <el-button size="small" plain @click="handleCollapse">
        <el-icon><Menu /></el-icon>
      </el-button>
      <h3>{{ route.meta.username }}</h3>
    </div>
    <div class="r-contnet">
      <el-dropdown trigger="click" :hide-on-click="false">
        <!-- 有图片 -->
        <span v-if="data.staffPhoto" class="el-dropdown-link">
          <img class="user" :src="data.staffPhoto" alt="" />
          <span>{{ data.username }}</span>
        </span>
        <!-- 没有图片 -->
        <span v-else class="el-dropdown-link">
          <span class="username">{{ data.username?.charAt(0) }}</span>
          <span>{{ data.username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>首页</el-dropdown-item>
            <a href="#" @click="isForm">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </a>
            <a target="_blank" href="https://heimahr.itheima.net/">
              <el-dropdown-item>项目地址</el-dropdown-item>
            </a>
            <el-dropdown-item>
              <el-popconfirm
                title="确认要退出登录吗?"
                confirm-button-text="确认"
                cancel-button-text="取消"
                :hide-icon="true"
                @confirm="delItem"
              >
                <template #reference>
                  <span>退出登录</span>
                </template>
              </el-popconfirm>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>

  <!-- 修改密码 -->
  <el-dialog v-model="dialogVisible" @close="btnClose" title="修改密码" :width="500" draggable>
    <el-form ref="formRef" label-width="100px" :model="formModel" :rules="formRules">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input size="large" v-model="formModel.oldPassword" password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input size="large" v-model="formModel.newPassword" password></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="rePassword">
        <el-input size="large" v-model="formModel.rePassword" password></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 30px; margin-bottom: -10px">
        <el-button @click="formPass" type="primary" style="margin-right: 20px">确认</el-button>
        <el-button @click="btnClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 30px;
}
.r-contnet {
  .el-dropdown-link {
    display: flex;
    text-align: center;
    align-items: center;
    margin-right: 40px;
    // 头像
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .username {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
      background: v-bind('color.background');
      color: #fff;
      margin-right: 20px;
    }
  }
}

.l-contnet {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #000;
  }
}
</style>
