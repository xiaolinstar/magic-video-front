import { defineConfig, loadEnv } from 'vite';
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  console.log('当前模式:', mode);
  const env = loadEnv(mode, process.cwd());
  console.log('加载的环境变量:', env);

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      port: 3000,
      open: true,
      proxy: env.VITE_USE_MOCK === 'true' ? {} : {
        // 当不使用mock数据时，配置代理
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // 生产环境移除console
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  };
});
