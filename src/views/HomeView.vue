<template>
  <div class="home">
    <!-- 轮播图（Banner） -->
    <Carousel />

    <!-- 视频推荐列表 -->
    <div class="video-section">
      <h2>推荐视频</h2>
      <VideoList :videos="recommendedVideos" />
    </div>

    <!-- 分类浏览 -->
    <CategorySection />

    <!-- 新剧展示 -->
    <div class="video-section">
      <h2>新剧</h2>
      <VideoList :videos="latestVideos" />
    </div>

    <!-- 精选专题 -->
    <FeaturedSection />

    <!-- 经典好剧展示 -->
    <div class="video-section">
      <h2>经典好剧</h2>
      <VideoList :videos="classicVideos" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { listVideoResources } from '@/apis/resource';
// 修正组件导入路径，使用绝对路径
import Carousel from '@/views/Carousel.vue';
import VideoList from '@/views/pages/VideoList.vue';
import CategorySection from '@/views/CategorySection.vue';
import FeaturedSection from '@/views/FeaturedSection.vue';

interface IVideo {
  mp4: string;  // mp4资源地址
  m3u8: string; // hls资源地址
  mpd: string;  // dash资源地址
  name: string; // 资源名称
  title: string; // 资源标题
  description: string; // 资源描述
  avatar: string; // 资源封面图
}

const recommendedVideos = ref<IVideo[]>([]);
const latestVideos = ref<IVideo[]>([]);
const classicVideos = ref<IVideo[]>([]);

// 获取视频资源并更新数据
onMounted(() => {
  listVideoResources()
    .then(response => {
      const videos = response.data as IVideo[];
      
      // 确保视频数据有效
      if (videos && videos.length > 0) {
        // 分配视频到不同区域
        // const totalVideos = videos.length;
        // const videosPerSection = Math.floor(totalVideos / 3);

        // recommendedVideos.value = videos.slice(0, videosPerSection);
        // latestVideos.value = videos.slice(videosPerSection, videosPerSection * 2);
        // classicVideos.value = videos.slice(videosPerSection * 2);
        recommendedVideos.value = videos.slice(0);
        latestVideos.value = videos.slice();
        classicVideos.value = videos.slice();
      }
    })
    .catch(error => console.log("拉取视频资源失败，请联系管理员"));
});
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.video-section {
  margin-bottom: 30px;
}

.video-section h2 {
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 2px solid #4CAF50;
}
</style>@/apis/resource