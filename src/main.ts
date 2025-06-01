import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/styles/main.css';
import envConfig from '@/config/env';

// 启用 Mock服务，因为和 dash.js 冲突，所以暂时关闭
// if (envConfig.mockEnabled) {
//   import('./mock').then((mock) => {
//     console.log('Mock服务已加载');
//   });
// }

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount('#app');
