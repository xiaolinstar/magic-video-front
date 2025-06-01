<script setup lang="ts">
import { onMounted, reactive, watch, ref, onUnmounted, computed } from 'vue';
import dashjs from 'dashjs';
import { listVideoResources } from '@/apis/resource';
import { useRoute, useRouter } from 'vue-router';
import type { IVideo } from '@/common/types/video';

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

// 获取当前播放的视频
const currentVideo = computed(() => {
  if (form.videos.length > 0 && form.id >= 0 && form.id < form.videos.length) {
    return form.videos[form.id];
  }
  return null;
});

// 获取视频类型的中文描述
const getVideoTypeText = (type: 'movie' | 'tvshow' | 'video') => {
  switch (type) {
    case 'movie': return '电影';
    case 'tvshow': return '电视剧';
    case 'video': return '视频资源';
    default: return '未知类型';
  }
};

// 根据ID获取相关电影信息
const getRelatedMovieById = (id: number) => {
  return form.videos.find(video => video.id === id);
};

// 播放相关电影
const playRelatedMovie = (id: number) => {
  const index = form.videos.findIndex(video => video.id === id);
  if (index !== -1) {
    form.id = index;
  }
};

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
  await router.replace({
    query: {...route.query, id: form.id.toString()}
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
        console.log("当前视频列表", form.videos); // 打印当前URL参数，包括name和id

        let videoId = route.query.id as string;
        if (videoId && !isNaN(Number(videoId))) {
          let id = Number(videoId);
          // 查找ID匹配的视频
          const videoIndex = form.videos.findIndex(video => video.id === id);
          if (videoIndex !== -1) {
            form.id = videoIndex;
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
          <span class="play-count">
            <i class="el-icon-video-play"></i> 
            播放量: 10.2万
          </span>
          <span class="publish-date">发布时间: 2023-05-15</span>
          <span class="video-type">类型: {{ getVideoTypeText(form.videos[form.id].type) }}</span>
        </div>
        <div class="video-description">
          {{ form.videos[form.id].description }}
        </div>
      </div>
    </div>
    
    <!-- 根据视频类型显示不同的侧边栏内容 -->
    <div class="sidebar-content">
      <!-- 电视剧：显示剧集信息 -->
      <div v-if="currentVideo && currentVideo.type === 'tvshow' && currentVideo.episodes" class="episode-list">
        <h2 class="section-title">剧集信息</h2>
        <el-scrollbar height="calc(100vh - 100px)" class="episode-list-scrollbar">
          <div class="episode-item" 
               v-for="episode in currentVideo.episodes" 
               :key="`${episode.season}-${episode.episode}`">
            <div class="episode-number">S{{ episode.season }}E{{ episode.episode }}</div>
            <div class="episode-details">
              <h3 class="episode-title">{{ episode.title }}</h3>
              <span class="episode-duration">{{ episode.duration }}</span>
            </div>
          </div>
        </el-scrollbar>
      </div>
      
      <!-- 电影：显示相关推荐电影 -->
      <div v-else-if="currentVideo && currentVideo.type === 'movie'" class="related-movies">
        <h2 class="section-title">相关推荐</h2>
        <el-scrollbar height="calc(100vh - 100px)" class="video-list-scrollbar">
          <div class="video-list">
            <div 
              v-for="relatedId in currentVideo.relatedMovies"
              :key="relatedId"
              class="recommended-video-item"
              @click="playRelatedMovie(relatedId)"
            >
              <div class="video-avatar-container">
                <el-image :src="getRelatedMovieById(relatedId)?.avatar" fit="cover" class="video-avatar" />
                <div class="play-icon"><i class="el-icon-video-play"></i></div>
              </div>
              <div class="video-details">
                <h3 class="video-item-title">{{ getRelatedMovieById(relatedId)?.title }}</h3>
                <!-- 移除下面这行 -->
                <!-- <p class="video-item-desc">{{ form.videos.find(video => video.id === relatedId)?.description }}</p> -->
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      
      <!-- 视频资源：显示所有视频列表 -->
      <div v-else class="recommended-videos">
        <h2 class="section-title">所有视频</h2>
        <el-scrollbar height="calc(100vh - 100px)" class="video-list-scrollbar">
          <div class="video-list">
            <div 
              v-for="(video, index) in form.videos" 
              :key="index"
              class="recommended-video-item"
              :class="{ active: form.id === index }"
              @click="form.id = index"
            >
              <div class="video-avatar-container">
                <el-image :src="video.avatar" fit="cover" class="video-avatar" />
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
  </div>
</template>

<style scoped>
.video-page {
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: 65% 1fr; /* 视频区域占据65%宽度 */
  gap: 24px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 48px);
}

.video-player-container {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 左对齐 */
  width: 100%;
  margin-left: 0; /* 确保靠左 */
}

/* 视频标题样式 */
.video-title-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #fff;
  text-align: left;
  width: 100%;
  padding: 16px 24px;
  background-color: #2b2b2b;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.video-player-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 宽高比 */
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-info-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 100%;
}

.video-stats {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 15px;
  color: #555;
}

.play-count {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.play-count i, .publish-date i {
  margin-right: 6px;
  color: #00a1d6;
}

.video-description {
  font-size: 15px;
  line-height: 1.7;
  color: #333;
  white-space: pre-wrap;
}

.recommended-videos {
  grid-column: 2;
  position: sticky;
  top: 24px;
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 2px solid #00a1d6;
}

.video-list-scrollbar {
  flex: 1;
  overflow: hidden;
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 12px;
}

.recommended-video-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 12px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  padding: 12px;
  height: 100px;
}

.recommended-video-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.recommended-video-item.active {
  border-left: 4px solid #00a1d6;
  background-color: #f0f8ff;
}

.video-avatar-container {
  position: relative;
  width: 120px;
  height: 76px;
  border-radius: 6px;
  overflow: hidden;
}

.video-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.play-icon i {
  font-size: 32px;
  color: #fff;
}

.recommended-video-item:hover .play-icon {
  opacity: 1;
}

.video-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.video-item-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
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
@media (max-width: 1200px) {
  .video-page {
    grid-template-columns: 1fr 280px;
    padding: 20px;
  }
  
  .recommended-video-item {
    grid-template-columns: 100px 1fr;
    height: 90px;
  }
  
  .video-avatar-container {
    width: 100px;
    height: 66px;
  }
}

@media (max-width: 992px) {
  .video-page {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .recommended-videos {
    grid-column: 1;
    position: static;
    height: auto;
    margin-top: 20px;
  }
  
  .video-list-scrollbar {
    height: auto !important;
    max-height: 600px;
  }
  
  .video-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }
  
  .recommended-video-item {
    height: 100px;
  }
}

@media (max-width: 768px) {
  .video-page {
    padding: 16px;
  }
  
  .video-title-header {
    font-size: 20px;
    padding: 14px 20px;
  }
  
  .video-info-container {
    padding: 16px;
  }
  
  .video-list {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 576px) {
  .video-page {
    padding: 12px;
  }
  
  .video-title-header {
    font-size: 18px;
    padding: 12px 16px;
  }
  
  .video-info-container {
    padding: 14px;
  }
  
  .video-description {
    font-size: 14px;
  }
  
  .video-list {
    grid-template-columns: 1fr;
  }
  
  .recommended-video-item {
    height: auto;
    min-height: 90px;
  }
}
</style>