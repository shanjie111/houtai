<script setup lang="ts">
import { ref } from 'vue'
import { getUserTableList } from '@/services/home'
import { onMounted } from 'vue'
import type { User } from '@/types/user'

const tableDatas = ref<User[]>([])

const list = async () => {
  const res = await getUserTableList()
  tableDatas.value = res.data
  // console.log(res.data)
}

onMounted(() => {
  list()
})
</script>

<template>
  <div class="user">
    <el-button
      type="primary"
      size="default"
      style="margin-bottom: 20px; margin-left: 20px"
      :header-cell-style="{ background: '#f0f0f0', color: '#333' }"
      >添加角色</el-button
    >
    <!-- 表格 -->
    <el-table
      :data="tableDatas"
      style="width: 100%"
      :header-cell-style="{
        background: '#f5f7fa',
        height: '60px',
        color: '#000000'
      }"
      size="large"
      border
    >
      <el-table-column prop="name" align="center" label="角色" width="300"></el-table-column>
      <el-table-column prop="state" align="center" label="启用" width="300"></el-table-column>
      <el-table-column prop="description" align="center" label="描述"></el-table-column>
      <el-table-column prop="date" align="center" label="操作">
        <template #default>
          <!-- TODO分配权限 -->
          <el-button text style="color: #409eff" color="pink" size="default">分配权限</el-button>
          <!-- 编辑功能 -->
          <el-button text style="color: #409eff" size="default">编辑</el-button>
          <!-- 删除功能 -->
          <el-popconfirm title="这是一段内容确定删除吗？">
            <template #reference>
              <el-button style="margin-left: 10px; color: #409eff" text size="default"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less" scoped>
.user {
  background-color: #fff;
  padding: 20px 0;
  width: 100%;
  height: 100%;
  /deep/ .el-table {
    width: 100%;
  }
}
</style>
