<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
  {
    path: '/user',
    name: 'user',
    label: '用户管理',
    icon: 'user',
    url: 'UserManage/UserManage'
  },
  {
    label: '其他',
    icon: 'location',
    path: 'other',
    children: [
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
    ]
  }
])

// 没有子级
const noChildren = () => {
  return list.value.filter((item) => !item.children)
}

// 有子级
const hasChildren = () => {
  return list.value.filter((item) => item.children)
}
</script>

<template>
  <el-aside width="200px">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#fff"
      :collapse="false"
    >
      <img class="imgs" src="../assets/logo.png" alt="" />
      <!-- 没有子级 -->
      <el-menu-item v-for="item in noChildren()" :key="item.path" :index="item.path">
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>

      <!-- 有子级 -->
      <el-sub-menu v-for="item in hasChildren()" :key="item.path" :index="item.path">
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(subitem, subindex) in item.children"
            :key="subindex"
            :index="subitem.path"
          >
            <component class="icons" :is="subitem.icon"></component>
            <span>{{ subitem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style lang="less" scoped>
.imgs {
  width: 150px;
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
