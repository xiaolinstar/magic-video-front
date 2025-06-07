<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import HeaderView from '@/views/layout/HeaderView.vue'
import Footer from '@/views/layout/Footer.vue'
import SideNavigation from '@/views/layout/SideNavigation.vue'

const route = useRoute();
</script>

<template>
  <div class="app-container">
    <HeaderView v-if="!route.meta.hideHeader" />
    <div class="content-wrapper" :class="{ 'full-width': route.meta.hideSidebar }">
      <SideNavigation v-if="!route.meta.hideSidebar" class="side-navigation" />
      <main class="main-content" :class="{ 'no-padding': route.meta.hideSidebar }">
        <RouterView />
      </main>
    </div>
    <Footer v-if="!route.meta.hideFooter" />
  </div>
</template>

<style>
/* 应用根容器样式，使用 flex 布局，垂直排列子元素，最小高度为视口高度 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 内容包装器样式，使用 flex 布局，占据剩余空间，宽度为 100% */
.content-wrapper {
  display: flex;
  flex: 1;
  max-width: 100%;
  width: 100%;
  position: relative;
}

/* 侧边导航栏样式，使用粘性定位，固定在页面顶部，高度为视口高度 */
.side-navigation {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.8); /* 改为半透明背景 */
  z-index: 100;
  width: 120px; /* 从200px减小到160px，更窄 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* 减轻阴影效果 */
}

.main-content {
  flex: 1;
  max-width: calc(100% - 160px); /* 相应调整 */
  width: calc(100% - 160px); /* 相应调整 */
  padding: 0 0 0 30px;
  box-sizing: border-box;
  margin: 0 auto;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .side-navigation {
    width: 45px; /* 从60px减小到45px */
  }
  
  .main-content {
    max-width: calc(100% - 45px); /* 相应调整 */
    width: calc(100% - 45px); /* 相应调整 */
    padding: 0 15px;
  }
}
.main-content.no-padding {
  padding: 0;
  width: 100%;
  max-width: 100%;
}

.full-width .main-content {
  max-width: 100%;
  width: 100%;
}

/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  background-color: #f8f9fa;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: inherit;
}

@media (max-width: 768px) {
  .side-navigation {
    width: 50px; /* 从60px减小到50px */
  }
  
  .main-content {
    max-width: calc(100% - 50px); /* 相应调整 */
    width: calc(100% - 50px); /* 相应调整 */
    padding: 0 15px;
  }
}
</style>
