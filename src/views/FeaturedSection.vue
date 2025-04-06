<template>
  <section class="featured-section">
    <div class="container">
      <h2 class="section-title">精选视频</h2>
      <div class="video-grid">
        <div v-for="video in featuredVideos" :key="video.id" class="video-card" @click.prevent="navigateToVideo(video)">
          <div class="video-avatar">
            <img :src="video.avatar" :alt="video.title">
            <div class="play-overlay">
              <i class="el-icon-video-play"></i>
            </div>
          </div>
          <div class="video-info">
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getFeaturedVideos } from '@/apis/resource';

const router = useRouter();

interface Featured {
  id: number;
  title: string;
  description: string;
  avatar: string;
}

const featuredVideos = ref<Featured[]>([]);

onMounted(async () => {

  try {
    const response = await getFeaturedVideos();
    featuredVideos.value = response.data;
  } catch (error) {
    console.error('获取精选视频数据失败:', error);
  }
});

const navigateToVideo = (video: Featured) => {
  router.push({
    path: '/video',
    query: {id: video.id}
  });
};


</script>

<style scoped>
.featured-section {
  padding: 40px 0;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.section-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2em;
  color: #333;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.video-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.video-card:hover {
  transform: translateY(-5px);
}

.video-avatar {
  position: relative;
  padding-top: 56.25%; /* 16:9 比例 */
}

.video-avatar img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 3em;
  opacity: 0.8;
}

.video-info {
  padding: 15px;
}

.video-info h3 {
  margin: 0 0 10px;
  font-size: 1.2em;
  color: #333;
}

.video-info p {
  margin: 0;
  color: #666;
  font-size: 0.9em;
}
</style>
