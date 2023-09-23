<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const to = () => {
  router.push('/')
}
</script>

<template>
  <div class="tcy-404 container">
    <div class="centered">
      <img src="../../assets/404.png" alt="404 Error" />
      <h2>抱歉，您访问的页面出错了</h2>
      <p>您可能输错了网址，或该网页已删除或不存在</p>
      <button @click="to">返回首页</button>
    </div>
  </div>
</template>

<style scoped lang="less">
.tcy-404 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 可视窗口高度，可以根据需求调整 */
}

.centered {
  text-align: center;
  h2 {
    font-size: 32px;
    color: #333333;
    text-align: center;
    letter-spacing: 5px;
    padding-top: 33px;
    padding-bottom: 25px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    color: #666666;
    letter-spacing: 1px;
    text-align: center;
    padding-bottom: 35px;
  }
  button {
    width: 220px;
    height: 56px;
    background-color: #7caced;
    border: none;
    color: #fff;
    font-size: 20px;
  }
}
</style>
