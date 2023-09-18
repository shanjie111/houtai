<script setup lang="ts"></script>

<template>
  <div class="common-layout">
    <el-container>
      <Aside></Aside>
      <el-container>
        <Header></Header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.el-container {
  flex-wrap: wrap;
  align-content: flex-start;
}
.common-layout {
  height: 100%;
  & > .el-container {
    height: 100%;
    & > .el-aside {
      width: 150px;
      height: 100%;
      background-color: #545c64;
    }
  }
}
</style>
