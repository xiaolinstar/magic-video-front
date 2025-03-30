<template>
  <div class="auth-container">
    <div class="auth-left">
      <div class="logo-container">
        <router-link to="/" class="logo">魔法视频屋</router-link>
      </div>
      
      <div class="auth-form-container">
        <h2 class="auth-title">登录账号</h2>
        
        <form class="auth-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <div class="input-icon">
              <i class="el-icon-user"></i>
            </div>
            <input 
              type="text" 
              v-model="loginForm.username" 
              placeholder="用户名/邮箱" 
              class="auth-input"
              required
            />
          </div>
          
          <div class="form-group">
            <div class="input-icon">
              <i class="el-icon-lock"></i>
            </div>
            <input 
              type="password" 
              v-model="loginForm.password" 
              placeholder="密码" 
              class="auth-input"
              required
            />
            <div class="password-toggle" @click="togglePasswordVisibility">
              <i class="el-icon-view"></i>
            </div>
          </div>
          
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="loginForm.remember" />
              <span>记住我</span>
            </label>
            <a href="#" class="forgot-password">忘记密码?</a>
          </div>
          
          <button type="submit" class="auth-button" :disabled="isLoading">
            {{ isLoading ? '登录中...' : '登录' }}
          </button>
        </form>
        
        <div class="social-login">
          <div class="divider">
            <span>其他登录方式</span>
          </div>
          <div class="social-icons">
            <button class="social-icon google">
              <i class="el-icon-s-platform"></i>
            </button>
            <button class="social-icon wechat">
              <i class="el-icon-s-custom"></i>
            </button>
          </div>
        </div>
        
        <div class="auth-redirect">
          还没有账号? <router-link to="/register" class="redirect-link">立即注册</router-link>
        </div>
      </div>
    </div>
    
    <div class="auth-right">
      <div class="auth-image"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { login as loginApi } from '@/apis/auth';

const router = useRouter();
const isLoading = ref(false);
const passwordVisible = ref(false);

const loginForm = reactive({
  username: '',
  password: '',
  remember: false
});

const togglePasswordVisibility = () => {
  const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
  if (passwordInput) {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordVisible.value = !passwordVisible.value;
  }
};

const handleLogin = async () => {
  try {
    isLoading.value = true;
    
    // 调用登录API
    const response = await loginApi(loginForm.username, loginForm.password);
    
    // 存储用户信息和token
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    ElMessage.success('登录成功！');
    
    // 跳转到首页
    router.push('/');
  } catch (error: any) {
    ElMessage.error(error.response?.data?.message || '登录失败，用户名或密码错误');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  min-height: 100vh;
  background-color: #fff;
}

.auth-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  max-width: 500px;
}

.logo-container {
  margin-bottom: 60px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #00c16e;
  text-decoration: none;
}

.auth-form-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.auth-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
}

.auth-form {
  margin-bottom: 30px;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.auth-input {
  width: 100%;
  padding: 12px 15px 12px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.auth-input:focus {
  border-color: #00c16e;
  outline: none;
}

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  cursor: pointer;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.remember-me {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.remember-me input {
  margin-right: 8px;
}

.forgot-password {
  font-size: 14px;
  color: #00c16e;
  text-decoration: none;
}

.auth-button {
  width: 100%;
  padding: 12px;
  background-color: #00c16e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-button:hover {
  background-color: #00a85e;
}

.auth-button:disabled {
  background-color: #a0e5c8;
  cursor: not-allowed;
}

.social-login {
  margin-top: 20px;
  margin-bottom: 30px;
}

.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.divider:before,
.divider:after {
  content: '';
  flex: 1;
  border-top: 1px solid #eee;
}

.divider span {
  padding: 0 15px;
  font-size: 14px;
  color: #999;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.social-icon i {
  font-size: 20px;
}

.google i {
  color: #DB4437;
}

.wechat i {
  color: #07C160;
}

.auth-redirect {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.redirect-link {
  color: #00c16e;
  text-decoration: none;
  font-weight: 500;
}

.auth-right {
  flex: 1.2;
  background-color: #f5fdf8;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.auth-image {
  width: 80%;
  height: 80%;
  background-image: url('/src/assets/girl-background.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 992px) {
  .auth-right {
    display: none;
  }
  
  .auth-left {
    max-width: 100%;
  }
}

@media (max-width: 576px) {
  .auth-left {
    padding: 20px;
  }
  
  .logo-container {
    margin-bottom: 40px;
  }
  
  .auth-title {
    font-size: 24px;
  }
}
</style>