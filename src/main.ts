import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/styles/main.css';
import envConfig from '@/config/env';

// 在开发环境且启用mock时引入mock服务
// if (envConfig.mockEnabled) {
//   import('./mock').then((mock) => {
//     console.log('Mock服务已加载');
//   });
// }

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount('#app');
