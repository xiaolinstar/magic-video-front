# 视频点播微服务-前端项目
使用云服务器部署或者Docker部署，支撑CI/CD

## 快速启动
### 安装依赖
```sh
npm install
```

### 开发环境热启动

```sh
npm run dev
```

### 生产环境构建

```sh
npm run build
```

## 容器化部署
使用Docker容器化相关程序。Node作为基础镜像，使用Nginx对构建生成的项目dist反向代理


## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
