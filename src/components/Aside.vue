<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores'
const userStore = useCounterStore()

// 获取到左侧菜单的数据
import { useRoute } from 'vue-router'
const route = useRoute()
const itemList = ref({} as any)
itemList.value = route.matched[0].children

// 渲染左侧菜单
import { useRouter } from 'vue-router'
const router = useRouter()
const chlickMenu = (item: {
  path: string
  name: string
  mete: { icon: string; username: string }
}) => {
  // console.log(item)
  router.push({
    path: item.path
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
      :default-active="1"
    >
      <img :class="userStore.isCollapse ? 'imgs' : 'image'" src="../assets/logo.png" alt="" />
      <el-menu-item
        v-for="(item, index) in itemList"
        :key="item.name"
        :index="index + 1"
        @click="chlickMenu(item)"
      >
        <component
          class="icons"
          :is="item.meta.icon"
          style="margin-right: 20px; margin-left: 10px"
        ></component>
        <span>{{ item.meta.username }}</span>
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
