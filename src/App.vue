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
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  display: flex;
  flex: 1;
  max-width: 100%;
  width: 100%;
  position: relative;
}

.side-navigation {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background-color: #fff;
  z-index: 100;
  width: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-content {
  flex: 1;
  max-width: calc(100% - 200px);
  width: calc(100% - 200px);
  padding: 0 0 0 30px;
  box-sizing: border-box;
  margin: 0 auto;
  overflow-y: auto;
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
    width: 60px;
  }
  
  .main-content {
    max-width: calc(100% - 60px);
    width: calc(100% - 60px);
    padding: 0 15px;
  }
}
</style>
