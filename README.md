# 视频点播微服务-前端项目

## 待办Todos

* [ ]  使用云服务器部署或者 Docker 部署，支持 CI/CD
* [X]  文档完善
* [X]  使用 docker-compose 启动容器
* [X]  页面弹性化，自适应屏幕变化
* [ ]  在 Carousel 视频的 videoId 与 列表中的 videoId 不一致，无法准确跳转。
* [ ]  删除 vue-tsc --noEmit && vite build --mode production 构建指令
* [ ]  阿里云 腾讯云 本地媒体转码服务对比

## 更新日志
2025-03-29 模拟资源数据，前端界面展示不报错
2025-02-19 创建 dev 分支，在开发环境启动项目 `npm run dev`
2025-02-17 文档完善，开发环境和生产环境启动项目

## 开始

项目克隆

```shell
git clone https://github.com/xiaolinstar/magic-video-front.git
```

进入项目

```shell
cd magic-video-front
```

安装依赖

```sh
npm install
```

### 开发环境

> 无后端交互，前端 mock 数据

开发环境热启动，快速体验

```sh
vite --mode development
```

### 开发直连环境

> 与后端地址直连，需先启动 magic-video-backend 后端服务，提供接口支持

前后端本地联调模式

```sh
vite --mode development.direct
```

### 生产环境容器化部署

build 构建分发包 dist，然后使用 Nginx 静态资源代理

在项目目录下，构建

```sh
npm run build
```

基于项目根目录下的 Dockerfile 构建镜像

```shell
docker build -t xxl1997/magic-web-front:0.0.1-SNAPSHOT .
```

Windows 上的 Docker-Desktop 可能不支持上述命令，执行

```shell
# buildx 构建
docker buildx build -t xxl1997/magic-web-front:0.0.1-SNAPSHOT .
```

基于 docker-compose 启动项目，项目根目录下执行

```shell
docker compose up -d
```

项目卸载

```shell
docker compose down
```

## 概要设计

```mermaid
classDiagram
    %% 合集类 (ICollection)
    class ICollection {
        +id: number
        +title: string
        +type: 'movie-series' | 'tv-series' | 'anthology'
        +description: string
        +coverImage: string
        +releaseYear: number?
        +items: ICollectionItem[]
        +relatedCollections: number[]?
    }
    
    %% 合集项接口 (ICollectionItem)
    <<interface>> ICollectionItem
    ICollectionItem : +type: 'movie' | 'season'
    ICollectionItem : +order: number
    ICollectionItem : +title?: string
    
    %% 视频资源基类 (IVideoResource)
    class IVideoResource {
        +id: number
        +title: string
        +originalTitle?: string
        +description: string
        +coverImage: string
        +type: 'movie' | 'episode' | 'clip'
        +releaseDate?: string
        +duration: number
        +genres?: string[]
        +rating?: number
        +cast?: string[]
        +directors?: string[]
        +tags?: string[]
        +collectionId?: number
        +seasonNumber?: number
        +episodeNumber?: number
    }
    
    %% 季类 (ISeason)
    class ISeason {
        +id: number
        +collectionId: number
        +seasonNumber: number
        +title?: string
        +description?: string
        +coverImage?: string
        +releaseDate?: string
        +episodes: IEpisode[]
    }
    
    %% 剧集类 (IEpisode)
    class IEpisode {
        +id: number
        +seasonId: number
        +episodeNumber: number
        +title: string
        +duration: number
        +thumbnail?: string
        +plot?: string
    }
    
    %% 播放源类 (IPlaybackSource)
    class IPlaybackSource {
        +videoId: number
        +sources: IVideoSource[]
    }
    
    %% 视频源类 (IVideoSource)
    class IVideoSource {
        +src: string
        +type: 'mp4' | 'hls' | 'dash'
        +resolution: string
        +bitrate?: number
    }
    
    %% 具体实现类
    class MovieItem {
        +type: 'movie'
        +movieId: number
    }
    
    class SeasonItem {
        +type: 'season'
        +seasonId: number
    }
    
    class Movie {
        +awards?: string[]
    }
    
    class Episode {
        +plot?: string
    }
    
    %% 关系定义
    ICollection "1" --> "0..*" ICollectionItem : 包含
    ICollectionItem <|.. MovieItem : 实现
    ICollectionItem <|.. SeasonItem : 实现
    
    IVideoResource <|-- Movie : 继承
    IVideoResource <|-- Episode : 继承
    
    ICollection "1" --> "0..*" IVideoResource : 包含 >
    ISeason "1" --> "1" ICollection : 属于 >
    ISeason "1" --> "0..*" IEpisode : 包含
    IEpisode "1" --> "1" ISeason : 属于 >
    IEpisode "1" --> "1" IPlaybackSource : 播放源
    IPlaybackSource "1" --> "1..*" IVideoSource : 包含
    
    MovieItem "1" --> "1" Movie : 关联
    SeasonItem "1" --> "1" ISeason : 关联
    
    IVideoResource "1" --> "0..*" IPlaybackSource : 播放源
```

## 参考

