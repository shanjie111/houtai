<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useLoginStore } from '@/stores'

const loginStore = useLoginStore()
const token = loginStore.token
</script>

<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
        <!-- 左上角卡片 -->
        <el-card shadow="hover" style="background-color: #f5f6f8">
          <div class="user" style="padding-left: 60px">
            <img src="../../assets/user.png" alt="" />
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="aole">管理员</p>
            </div>
          </div>
          <div class="login-info" style="padding-left: 60px">
            <p>上次登陆时间： <span>2023-10-11</span></p>
            <p>上次登陆地点： <span>北京</span></p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-top: 20px"></el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.home {
  background-color: #fff;
  padding: 10px;
  width: 100%;
  height: 100%;
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .userInfo {
      .name {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 40px;
      }
      .aole {
        color: #666;
      }
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 120px;
      }
    }
  }
}
</style>
