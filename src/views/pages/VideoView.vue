<script setup lang="ts">
import { onMounted, reactive, watch, ref, onUnmounted } from 'vue';
import dashjs from 'dashjs';
import { listVideoResources } from '@/apis/resource';
import { useRoute, useRouter } from 'vue-router';

interface IVideo {
  mp4: string;  // mp4资源地址
  m3u8: string; // hls资源地址
  mpd: string;  // dash资源地址
  name: string; // 资源名称
  title: string; // 资源标题
  description: string; // 资源描述
  avatar: string; // 资源封面图
}

const dashVideoRef = ref()
const route = useRoute()
const router = useRouter()
let player: dashjs.MediaPlayerClass | null = null;

/**
 * 响应式视频表单
 */
const form = reactive({
  id: 0,
  videos: [] as IVideo[]
})

const updateVideo = async() => {
  if (form.videos.length === 0 || !form.videos[form.id]) return;
  
  let currVideo: IVideo = form.videos[form.id];
  
  // 如果已存在播放器实例，先销毁
  if (player) {
    player.reset();
  }

  // 初始化DASH播放器
  player = dashjs.MediaPlayer().create();
  player.initialize(dashVideoRef.value, currVideo.mpd, true);
  player.setAutoPlay(true);
  
  // 添加错误处理
  player.on(dashjs.MediaPlayer.events.ERROR, function(e: any) {
    console.error('DASH播放器错误:', e);
  });
  
  console.log("当前播放视频名称", currVideo.name);
  console.log("当前播放视频资源", currVideo.mpd);
  
  // 更新URL，不刷新页面
  router.replace({ 
    query: { ...route.query, id: form.id.toString() } 
  });
}

watch(() => [form.id], () => {
  console.log('[change id]', form.id);
  updateVideo()
})

// 组件挂载时拉取视频资源
onMounted(() => {
  console.log("onMounted");
  listVideoResources()
      .then(response => {
        form.videos = response.data;
        
        // 根据URL参数设置初始视频
        console.log("当前URL参数", route.query); // 打印当前URL参数，包括name和id
        let videoId = route.query.id as string;
        if (videoId && !isNaN(Number(videoId))) {
          let id = Number(videoId);
          if (id >= 0 && id < form.videos.length) {
            form.id = id;
          }
        }
        updateVideo();
      })
      .catch(error => console.log("拉取视频资源失败，请联系管理员"));
})

// 组件卸载时清理播放器资源
onUnmounted(() => {
  if (player) {
    player.reset();
    player = null;
  }
});
</script>

<template>
  <div class="video-page">
    <!-- 视频播放区域 -->
    <div class="video-player-container">
      <!-- 视频标题显示在视频上方 -->
      <h1 class="video-title-header" v-if="form.videos.length > 0 && form.videos[form.id]">
        {{ form.videos[form.id].title }}
      </h1>
      
      <div class="video-player-wrapper">
        <video ref="dashVideoRef" controls class="video-player"></video>
      </div>
      
      <!-- 视频信息区域 -->
      <div class="video-info-container" v-if="form.videos.length > 0 && form.videos[form.id]">
        <div class="video-stats">
          <span class="play-count"><i class="el-icon-video-play"></i> 播放量: 10.2万</span>
          <span class="publish-date">发布时间: 2023-05-15</span>
        </div>
        <div class="video-description">
          {{ form.videos[form.id].description }}
        </div>
      </div>
    </div>
    
    <!-- 推荐视频列表 -->
    <div class="recommended-videos">
      <h2 class="section-title">相关推荐</h2>
      <el-scrollbar height="calc(100vh - 100px)" class="video-list-scrollbar">
        <div class="video-list">
          <div 
            v-for="(video, index) in form.videos" 
            :key="index"
            class="recommended-video-item"
            :class="{ active: form.id === index }"
            @click="form.id = index"
          >
            <div class="video-thumbnail-container">
              <el-image :src="video.avatar" fit="cover" class="video-thumbnail" />
              <div class="play-icon"><i class="el-icon-video-play"></i></div>
            </div>
            <div class="video-details">
              <h3 class="video-item-title">{{ video.title }}</h3>
              <p class="video-item-desc">{{ video.description }}</p>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped>
.video-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 20px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 40px);
}

.video-player-container {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 视频标题样式 */
.video-title-header {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #fff;
  text-align: left; /* 从center改为left */
  width: 100%;
  padding: 12px 20px; /* 增加左右内边距 */
  background-color: #2b2b2b;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.video-player-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 宽高比 */
  background-color: #000;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-info-container {
  margin-top: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  width: 100%;
}

.video-stats {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
}

.play-count {
  margin-right: 16px;
}

.video-description {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
}

.recommended-videos {
  grid-column: 2;
  position: sticky;
  top: 20px;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
  padding-bottom: 8px;
  border-bottom: 2px solid #00a1d6;
}

.video-list-scrollbar {
  flex: 1;
  overflow: hidden;
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 10px;
}

.recommended-video-item {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recommended-video-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.recommended-video-item.active {
  border-left: 3px solid #00a1d6;
  background-color: #f0f8ff;
}

.video-item-title {
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 6px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-item-desc {
  font-size: 12px;
  color: #666;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式布局 */
@media (max-width: 992px) {
  .video-page {
    grid-template-columns: 1fr;
  }
  
  .recommended-videos {
    grid-column: 1;
    position: static;
    height: auto;
  }
  
  .video-list-scrollbar {
    height: auto !important;
  }
  
  .video-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 576px) {
  .video-page {
    padding: 10px;
  }
  
  .video-info-container {
    padding: 12px;
  }
  
  .video-title-header {
    font-size: 18px;
  }
  
  .video-list {
    grid-template-columns: 1fr;
  }
}
</style>
@/apis/resource