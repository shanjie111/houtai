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
import { onMounted } from 'vue'
const userStore = useUserStore()
const data = ref({} as UserData)
onMounted(async () => {
  await userStore.fetchUserAsync()
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
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>项目地址</el-dropdown-item>
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
      background: #04c9be;
      color: #fff;
      margin-right: 40px;
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
