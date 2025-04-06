<template>
  <div class="video-list-container">
    <div class="video-card" v-for="video in videos" :key="video.name">
      <router-link :to="`/video?id=${videos.indexOf(video)}`" class="video-link">
        <div class="video-cover-wrapper">
          <el-image :src="video.avatar" fit="cover" class="video-cover" />
          <div class="video-duration">05:23</div>
          <div class="play-icon-overlay">
            <i class="el-icon-video-play"></i>
          </div>
        </div>
        <div class="video-info">
          <h3 class="video-title" :title="video.title">{{ video.title }}</h3>
          <div class="video-meta">
            <span class="play-count"><i class="el-icon-view"></i> 8.2万</span>
            <span class="danmaku-count"><i class="el-icon-chat-dot-round"></i> 1024</span>
          </div>
          <p class="video-desc" :title="video.description">{{ video.description }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IVideo {
  mp4: string;  // mp4资源地址
  m3u8: string; // hls资源地址
  mpd: string;  // dash资源地址
  name: string; // 资源名称
  title: string; // 资源标题
  description: string; // 资源描述
  avatar: string; // 资源封面图
}

defineProps({
  videos: {
    type: Array as () => IVideo[],
    required: true
  }
});
</script>

<style scoped>
.video-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
}

.video-card {
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.video-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.video-cover-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
  overflow: hidden;
}

.video-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.play-icon-overlay {
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
  transition: opacity 0.3s;
}

.play-icon-overlay i {
  font-size: 48px;
  color: white;
}

.video-card:hover .play-icon-overlay {
  opacity: 1;
}

.video-info {
  padding: 12px;
}

.video-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  height: 44px; /* 固定高度，约两行文字 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制在2行内 */
  -webkit-box-orient: vertical;
}

.video-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #909399;
}

.video-desc {
  margin: 0;
  font-size: 13px;
  color: #606266;
  line-height: 1.5;
  height: 40px; /* 固定高度，约两行文字 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制在2行内 */
  -webkit-box-orient: vertical;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .video-list-container {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .video-list-container {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
  }
  
  .video-info {
    padding: 8px;
  }
  
  .video-title {
    font-size: 14px;
    height: 40px;
  }
  
  .video-desc {
    font-size: 12px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .video-list-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .play-icon-overlay i {
    font-size: 36px;
  }
}
</style>