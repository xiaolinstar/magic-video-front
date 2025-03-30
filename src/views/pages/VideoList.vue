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
          <h3 class="video-title">{{ video.title }}</h3>
          <div class="video-meta">
            <span class="play-count"><i class="el-icon-view"></i> 8.2万</span>
            <span class="danmaku-count"><i class="el-icon-chat-dot-round"></i> 1024</span>
          </div>
          <p class="video-desc">{{ video.description }}</p>
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
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;
}

.video-card {
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  margin: 0 auto;
  max-width: 280px;
  width: 100%;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.video-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.video-cover-wrapper {
  position: relative;
  padding-top: 56.25%; /* 16:9 宽高比 */
  overflow: hidden;
}

.video-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.video-card:hover .video-cover {
  transform: scale(1.1);
}

.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
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
  transition: opacity 0.3s ease;
}

.play-icon-overlay i {
  font-size: 48px;
  color: #fff;
}

.video-card:hover .play-icon-overlay {
  opacity: 1;
}

.video-info {
  padding: 12px;
  background-color: #fff;
}

.video-title {
  margin: 0 0 8px 0;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 42px;
}

.video-meta {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  color: #666;
}

.play-count {
  margin-right: 12px;
}

.danmaku-count {
  color: #00a1d6;
}

.video-desc {
  margin: 0;
  font-size: 12px;
  color: #666;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 36px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .video-list-container {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
  }
  
  .video-title {
    font-size: 14px;
    height: 39px;
  }
  
  .video-meta {
    margin-bottom: 4px;
  }
  
  .video-desc {
    display: none;
  }
}

@media (max-width: 480px) {
  .video-list-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .video-info {
    padding: 8px;
  }
  
  .video-title {
    font-size: 13px;
    margin-bottom: 4px;
    -webkit-line-clamp: 1;
    height: 18px;
  }
}
</style>