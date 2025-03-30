<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import HeaderView from '@/views/layout/HeaderView.vue'
import Footer from '@/views/Footer.vue'
import SideNavigation from '@/views/SideNavigation.vue'

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
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  display: flex;
  flex: 1;
}

.content-wrapper.full-width {
  width: 100%;
}

.side-navigation {
  width: 200px;
  flex-shrink: 0;
  background-color: #f8f9fa;
  border-right: 1px solid #e9ecef;
}

.main-content {
  flex: 1;
  max-width: 100%;
  padding: 0 20px;
}

.main-content.no-padding {
  padding: 0;
}

/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  background-color: #f8f9fa;
}

a {
  text-decoration: none;
  color: inherit;
}

@media (max-width: 768px) {
  .side-navigation {
    width: 60px;
  }
  
  .main-content {
    padding: 0 10px;
  }
}
</style>
