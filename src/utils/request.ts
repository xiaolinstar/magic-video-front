import axios from 'axios';
import envConfig from '@/config/env';


const axiosService = axios.create({
  baseURL: envConfig.baseUrl,
  timeout: envConfig.apiTimeout,
});

// 请求拦截器
axiosService.interceptors.request.use(
  (config) => {
    console.log('Axios 请求拦截器', config.url);
    // 可以在这里添加mock请求的公共处理逻辑
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosService.interceptors.response.use(
  (response) => {
    console.log('Axios 响应拦截器', response.config.url);
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosService;