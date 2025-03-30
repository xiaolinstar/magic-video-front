<template>
  <div class="auth-container">
    <div class="auth-left">
      <div class="logo-container">
        <router-link to="/" class="logo">魔法视频屋</router-link>
      </div>
      
      <div class="auth-form-container">
        <h2 class="auth-title">创建账号</h2>
        
        <form class="auth-form" @submit.prevent="handleRegister">
          <div class="form-group">
            <div class="input-icon">
              <i class="el-icon-user"></i>
            </div>
            <input 
              type="text" 
              v-model="registerForm.username" 
              placeholder="用户名" 
              class="auth-input"
              required
              @blur="validateUsername"
            />
            <div class="error-message" v-if="errors.username">{{ errors.username }}</div>
          </div>
          
          <div class="form-group">
            <div class="input-icon">
              <i class="el-icon-lock"></i>
            </div>
            <input 
              type="password" 
              v-model="registerForm.password" 
              placeholder="密码" 
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
              v-model="registerForm.confirmPassword" 
              placeholder="确认密码" 
              class="auth-input"
              required
              @blur="validatePasswordMatch"
            />
            <div class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</div>
          </div>
          
          <div class="form-group terms">
            <label class="terms-label">
              <input type="checkbox" v-model="registerForm.agreeTerms" required />
              <span>我同意 <a href="#" class="terms-link">服务条款</a> 和 <a href="#" class="terms-link">隐私政策</a></span>
            </label>
          </div>
          
          <button type="submit" class="auth-button" :disabled="isLoading || !registerForm.agreeTerms">
            {{ isLoading ? '注册中...' : '注册' }}
          </button>
        </form>
        
        <div class="social-login">
          <div class="divider">
            <span>其他注册方式</span>
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
          已有账号? <router-link to="/login" class="redirect-link">立即登录</router-link>
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
import { register as registerApi } from '@/apis/auth';

const router = useRouter();
const isLoading = ref(false);
const passwordVisible = ref(false);

const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
});

// 错误信息对象
const errors = reactive({
  username: '',
  confirmPassword: ''
});

// 用户名验证
const validateUsername = () => {
  errors.username = '';
  
  if (!registerForm.username) {
    errors.username = '用户名不能为空';
    return false;
  }
  
  if (registerForm.username.length < 3) {
    errors.username = '用户名长度不能少于3个字符';
    return false;
  }
  
  if (registerForm.username.length > 20) {
    errors.username = '用户名长度不能超过20个字符';
    return false;
  }
  
  // 用户名只能包含字母、数字、下划线
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(registerForm.username)) {
    errors.username = '用户名只能包含字母、数字和下划线';
    return false;
  }
  
  return true;
};

// 密码匹配验证
const validatePasswordMatch = () => {
  errors.confirmPassword = '';
  
  if (registerForm.password !== registerForm.confirmPassword) {
    errors.confirmPassword = '两次输入的密码不一致';
    return false;
  }
  
  return true;
};

const togglePasswordVisibility = () => {
  const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
  if (passwordInput) {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordVisible.value = !passwordVisible.value;
  }
};

const handleRegister = async () => {
  // 验证所有字段
  const isUsernameValid = validateUsername();
  const isPasswordMatchValid = validatePasswordMatch();
  
  if (!isUsernameValid || !isPasswordMatchValid) {
    return;
  }
  
  if (!registerForm.agreeTerms) {
    ElMessage.warning('请同意服务条款和隐私政策');
    return;
  }
  
  try {
    isLoading.value = true;
    
    // 调用注册API
    await registerApi(registerForm.username, registerForm.password);
    
    ElMessage.success('注册成功！请登录');
    
    // 跳转到登录页
    router.push('/login');
  } catch (error: any) {
    ElMessage.error(error.response?.data?.message || '注册失败，请稍后再试');
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

.terms {
  margin-bottom: 25px;
}

.terms-label {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.terms-label input {
  margin-right: 8px;
  margin-top: 3px;
}

.terms-link {
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

/* 添加错误信息样式 */
.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 5px;
  padding-left: 5px;
}

/* 确保表单组有足够的下边距来显示错误信息 */
.form-group {
  position: relative;
  margin-bottom: 25px;
}
</style>