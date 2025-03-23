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
        <button @click="showLoginDialog">登录</button>
        <button @click="showRegisterDialog">注册</button>
      </div>
    </nav>
  </header>
  
<!-- 登录对话框 -->
  <el-dialog v-model="loginDialogVisible" title="用户登录" width="30%">
    <el-form :model="loginForm" label-width="80px" :rules="loginRules" ref="loginFormRef">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" @keyup.enter="login"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="loginDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="login" :loading="loginLoading">登录</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 注册对话框 -->
  <el-dialog v-model="registerDialogVisible" title="用户注册" width="30%">
    <el-form :model="registerForm" label-width="80px" :rules="registerRules" ref="registerFormRef">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="registerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="register" :loading="registerLoading">注册</el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElForm } from 'element-plus';
import { register as registerApi, login as loginApi } from '@/apis/auth';

const router = useRouter();
const searchQuery = ref('');

const registerDialogVisible = ref(false);
const registerLoading = ref(false);
const registerFormRef = ref<InstanceType<typeof ElForm>>();

const loginDialogVisible = ref(false);
const loginLoading = ref(false);
const loginFormRef = ref<InstanceType<typeof ElForm>>();

// 注册表单数据
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

// 登陆表单数据
const loginForm = reactive({
  username: '',
  password: ''
});


// 注册表单验证规则
const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应为3-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应为6-20个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

// 登陆表单验证规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}


const search = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value }
    });
  }
};

// 实现登录功能
const login = () => {
  console.log('登录');
  
  loginFormRef.value?.validate(async (valid: any) => {
    if (valid) {
      try {
        loginLoading.value = true;
        const response = await loginApi(loginForm.username, loginForm.password);
        
        // 存储用户信息和token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        ElMessage.success('登录成功！');
        loginDialogVisible.value = false;
        
        // 重置表单
        loginForm.username = '';
        loginForm.password = '';
        
        // 可选：刷新页面或重定向到首页
        // router.push('/');
      } catch (error: any) {
        ElMessage.error(error.response?.data?.message || '登录失败，用户名或密码错误');
      } finally {
        loginLoading.value = false;
      }
    }
  })


};

const showLoginDialog = () => {
  loginDialogVisible.value = true;
};

const showRegisterDialog = () => {
  registerDialogVisible.value = true;
};


/**
 * 处理用户注册逻辑
 * 1. 验证表单数据
 * 2. 调用注册API
 * 3. 处理注册结果
 * 4. 重置表单状态
 * @returns {Promise<void>}
 */
const register = async (): Promise<void> => {
  registerFormRef.value?.validate(async (valid: any) => {
    if (valid) {
      try {
        registerLoading.value = true;
        const response = await registerApi(registerForm.username, registerForm.password);
        ElMessage.success('注册成功！');
        console.log(response);
        registerDialogVisible.value = false;
        // 重置表单
        registerForm.username = '';
        registerForm.password = '';
        registerForm.confirmPassword = '';
      } catch (error: any) {
        ElMessage.error(error.response?.data?.message || '注册失败，请稍后再试');
      } finally {
        registerLoading.value = false;
      }
    }
  });
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>