<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from './views/HeaderView.vue'
import Footer from './views/Footer.vue'
</script>

<template>
  <div class="app-container">
    <HeaderView />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
