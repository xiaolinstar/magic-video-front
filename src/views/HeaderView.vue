<template>
  <header>
    <nav class="navbar">
      <div class="logo">Magic Video</div>
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
      <div class="auth-buttons">
        <button @click="login">登录</button>
        <button @click="register">注册</button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value }
    });
  }
};

const login = () => {
  console.log('登录');
  // 实现登录功能
};

const register = () => {
  console.log('注册');
  // 实现注册功能
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