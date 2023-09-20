<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores'
const userStore = useCounterStore()

const list = ref([
  {
    path: '/home',
    name: 'home',
    label: '首页',
    icon: 'House',
    url: '/home'
  },
  {
    path: '/user',
    name: 'user',
    label: '用户管理',
    icon: 'user',
    url: 'UserManage/UserManage'
  },
  {
    path: '/page1',
    name: 'page1',
    label: '页面1',
    icon: 'setting',
    url: 'Other/PageOne'
  },
  {
    path: '/page2',
    name: 'page2',
    label: '页面2',
    icon: 'setting',
    url: 'Other/PageTwo'
  }
])

import { useRouter } from 'vue-router'
const router = useRouter()
const chlickMenu = (item: { path: string; name: string }) => {
  // console.log(item)
  router.push({
    name: item.name
  })
}
</script>

<template>
  <el-aside :width="userStore.isCollapse ? '160px' : '64px'">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#fff"
      :collapse="!userStore.isCollapse"
      :collapse-transition="false"
    >
      <img :class="userStore.isCollapse ? 'imgs' : 'image'" src="../assets/logo.png" alt="" />
      <!-- 没有子级 -->
      <el-menu-item
        v-for="item in list"
        :key="item.path"
        :index="item.path"
        @click="chlickMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style lang="less" scoped>
.imgs {
  width: 160px;
  height: 60px;
}

.image {
  width: 64px;
  height: 60px;
}
.icons {
  width: 18px;
  height: 18px;
}

.el-menu {
  border-right: none;
}
</style>
