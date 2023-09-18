<script setup lang="ts">
import { ref } from 'vue'

const getImgSrc = (user: string) => {
  return new URL(`../assets/${user}.png`, import.meta.url).href
}
</script>

<template>
  <el-header>
    <div class="l-contnet">
      <el-button size="small">
        <el-icon><Menu /></el-icon>
      </el-button>
      <h3>首页</h3>
    </div>
    <div class="r-contnet">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="getImgSrc('user')" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
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
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
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
