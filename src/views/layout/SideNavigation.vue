<template>
  <nav class="side-nav">
    <div class="nav-section">
      <h3 class="nav-title">推荐</h3>
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <i class="el-icon-s-home"></i>
            <span class="nav-text">首页</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/hot" class="nav-link">
            <i class="el-icon-s-opportunity"></i>
            <span class="nav-text">热门</span>
          </router-link>
        </li>
      </ul>
    </div>
    
    <div class="nav-section">
      <h3 class="nav-title">分类</h3>
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/category/movie" class="nav-link">
            <i class="el-icon-film"></i>
            <span class="nav-text">电影</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/category/tv" class="nav-link">
            <i class="el-icon-monitor"></i>
            <span class="nav-text">电视剧</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/category/animation" class="nav-link">
            <i class="el-icon-picture-outline"></i>
            <span class="nav-text">动画</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/category/documentary" class="nav-link">
            <i class="el-icon-notebook-2"></i>
            <span class="nav-text">纪录片</span>
          </router-link>
        </li>
      </ul>
    </div>
    
    <div class="nav-section">
      <h3 class="nav-title">收藏</h3>
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/favorites" class="nav-link">
            <i class="el-icon-star-on"></i>
            <span class="nav-text">我的收藏</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/history" class="nav-link">
            <i class="el-icon-time"></i>
            <span class="nav-text">观看历史</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
// 侧边导航栏组件
</script>

<style scoped>
.side-nav {
  height: 100%;
  padding: 20px 0;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 24px;
}

.nav-title {
  font-size: 14px;
  color: #909399;
  padding: 0 16px;
  margin: 0 0 8px 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: #333;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-link:hover {
  background-color: #e6f7ff;
  color: #1890ff;
}

.nav-link.router-link-active {
  background-color: #e6f7ff;
  color: #1890ff;
  font-weight: 500;
}

.nav-link i {
  margin-right: 12px;
  font-size: 18px;
}

@media (max-width: 768px) {
  .nav-text {
    display: none;
  }
  
  .nav-link {
    justify-content: center;
    padding: 12px 0;
  }
  
  .nav-link i {
    margin-right: 0;
  }
  
  .nav-title {
    text-align: center;
    padding: 0;
    font-size: 12px;
  }
}
</style>