<template>
  <header>
    <nav class="navbar">
      <div class="logo">
        <router-link to="/">魔法视频</router-link>
      </div>
      <div class="search-container">
        <input type="text" placeholder="搜索视频..." v-model="searchQuery" />
        <button @click="search">搜索</button>
      </div>
      <ul class="nav-links">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/video">视频</router-link></li>
        <li><router-link to="/about">关于我们</router-link></li>
        <li><router-link to="/contact">联系我们</router-link></li>
      </ul>
      <div class="user-actions">
        <button v-if="showUploadButton" class="upload-btn" @click="goToUpload">
          <i class="el-icon-upload2"></i> 投稿
        </button>
        <div class="auth-buttons">
          <button @click="goToLogin">登录</button>
          <button @click="goToRegister">注册</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');
// 设置为false暂时关闭投稿按钮
const showUploadButton = ref(false);

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value }
    });
  }
};

// 跳转到登录页面
const goToLogin = () => {
  router.push('/login');
};

// 跳转到注册页面
const goToRegister = () => {
  router.push('/register');
};

// 跳转到上传页面
const goToUpload = () => {
  router.push('/upload');
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.search-container {
  display: flex;
  width: 30%;
}

.search-container input {
  width: 100%;
  padding: 8px;
  border-radius: 4px 0 0 4px;
  border: none;
}

.search-container button {
  padding: 8px 15px;
  border: none;
  border-radius: 0 4px 4px 0;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

.nav-links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0 10px;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.nav-links a.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid #4CAF50;
}

.user-actions {
  display: flex;
  align-items: center;
}

.upload-btn {
  display: flex;
  align-items: center;
  margin-right: 15px;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background-color: #FF6B6B;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-btn:hover {
  background-color: #FF5252;
}

.upload-btn i {
  margin-right: 5px;
}

.auth-buttons button {
  margin-left: 10px;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}
</style>