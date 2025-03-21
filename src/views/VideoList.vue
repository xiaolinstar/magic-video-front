<template>
  <div class="video-container">
    <div class="video-item" v-for="video in videos" :key="video.name">
      <router-link :to="`/video?name=${video.name}`">
        <el-image :src="video.avatar" fit="cover" class="video-cover" />
        <div class="video-info">
          <h3>{{ video.title }}</h3>
          <p>{{ video.description }}</p>
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
.video-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}

.video-item {
  width: calc(20% - 20px);
  min-width: 200px;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.video-item:hover {
  transform: translateY(-5px);
}

.video-cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.video-info {
  padding: 10px;
  background-color: white;
}

.video-info h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.video-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

@media (max-width: 768px) {
  .video-item {
    width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .video-item {
    width: 100%;
  }
}
</style>