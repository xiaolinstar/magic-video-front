FROM node:alpine3.19 as build-stage

# 作者信息
LABEL authors="xlxing@bupt.edu.cn"

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有文件到工作目录
COPY . .

# 构建生产环境下到Vue项目
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

# 启动Nginx服务
CMD ["nginx", "-g", "daemon off;"]


