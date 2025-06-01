<template>
  <div class="under-development">
    <div class="development-container">
      <i class="el-icon-loading development-icon"></i>
      <h2 class="development-title">开发中...</h2>
      <p class="development-message">该功能正在开发中，敬请期待！</p>
      <router-link to="/" class="back-home">返回首页</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// 开发中页面组件
</script>

<style scoped>
.under-development {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
  text-align: center;
}

.development-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.development-icon {
  font-size: 60px;
  color: #409EFF;
  margin-bottom: 20px;
  display: inline-block;
}

.development-title {
  font-size: 28px;
  color: #303133;
  margin-bottom: 16px;
}

.development-message {
  font-size: 16px;
  color: #606266;
  margin-bottom: 24px;
}

.back-home {
  display: inline-block;
  padding: 10px 20px;
  background-color: #409EFF;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.back-home:hover {
  background-color: #337ecc;
}
</style>