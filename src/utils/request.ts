import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import envConfig from '@/config/env';

// 创建axios实例
const service = axios.create({
  baseURL: envConfig.baseUrl,
  timeout: envConfig.apiTimeout
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      // 设置请求头
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    
    // 如果返回的状态码不是0，则判断为错误
    if (res.code !== 0) {
      ElMessage.error(res.message || '请求失败');
      
      // 401: 未登录或token过期
      if (res.code === 401) {
        // 可以在这里处理登出逻辑
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      return Promise.reject(new Error(res.message || '请求失败'));
    } else {
      return res;
    }
  },
  (error) => {
    ElMessage.error(error.message || '请求失败');
    return Promise.reject(error);
  }
);

export default service;