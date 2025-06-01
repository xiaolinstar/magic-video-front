<!--
 * @description 热门视频页面组件
 * @file PopularView.vue
 * @module views/pages/PopularView
 * @author MagicVideo Team
 * @createDate 2023
 * @description 该组件用于展示热门视频内容，包括视频封面、标题、描述和热度数据，
 *              并提供点击跳转到视频详情页的功能。
 * @dependency getPopularVideos API
-->

<template>
  <div class="popular-page">
    <div class="page-header">
      <h1 class="page-title">热门视频</h1>
      <p class="page-subtitle">当下最热门的视频内容</p>
    </div>
    
    <div class="filter-bar">
      <div class="filter-options">
        <span class="filter-label">排序方式：</span>
        <el-radio-group v-model="sortBy" size="small">
          <el-radio-button label="trending">热度</el-radio-button>
          <el-radio-button label="newest">最新</el-radio-button>
          <el-radio-button label="views">播放量</el-radio-button>
        </el-radio-group>
      </div>
      
      <div class="time-filter">
        <span class="filter-label">时间范围：</span>
        <el-select v-model="timeRange" size="small" placeholder="选择时间范围">
          <el-option label="今日" value="today"></el-option>
          <el-option label="本周" value="week"></el-option>
          <el-option label="本月" value="month"></el-option>
          <el-option label="全部" value="all"></el-option>
        </el-select>
      </div>
    </div>
    
    <div class="popular-videos-container">
      <div v-for="(video, index) in popularVideos" :key="video.id" class="popular-video-card">
        <div class="rank-badge">{{ index + 1 }}</div>
        <div class="video-content" @click="navigateToVideo(video)">
          <div class="video-thumbnail">
            <el-image :src="video.avatar" fit="cover" class="thumbnail-image" />
            <div class="play-overlay">
              <i class="el-icon-video-play"></i>
            </div>
          </div>
          
          <div class="video-details">
            <h3 class="video-title">{{ video.title }}</h3>
            <p class="video-description">{{ video.description }}</p>
            
            <div class="video-stats">
              <span class="stat-item">
                <i class="el-icon-view"></i> {{ formatNumber(video.views) }} 播放
              </span>
              <span class="stat-item">
                <i class="el-icon-star-on"></i> {{ formatNumber(video.likes) }} 点赞
              </span>
              <span class="stat-item">
                <i class="el-icon-chat-dot-round"></i> {{ formatNumber(video.comments) }} 评论
              </span>
              <span class="publish-date">{{ video.publishDate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getPopularVideos } from '@/apis/resource';

const router = useRouter();
const sortBy = ref('trending');
const timeRange = ref('week');

interface PopularVideo {
  id: number;
  title: string;
  description: string;
  avatar: string;
  views?: number;
  likes?: number;
  comments?: number;
  publishDate?: string;
}

const popularVideos = ref<PopularVideo[]>([]);

onMounted(async () => {
  try {
    const response = await getPopularVideos();
    popularVideos.value = response.data;
  } catch (error) {
    console.error('获取热门视频数据失败:', error);
  }
});

const navigateToVideo = (video: PopularVideo) => {
  router.push({
    path: '/video',
    query: { id: video.id.toString() }
  });
};

const formatNumber = (num: number | undefined): string => {
  if (!num) return '0';
  
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toString();
};
</script>

<style scoped>
.popular-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.filter-label {
  margin-right: 10px;
  color: #666;
}

.popular-videos-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.popular-video-card {
  display: flex;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.rank-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 1;
}

.video-content {
  display: flex;
  width: 100%;
  cursor: pointer;
}

.video-thumbnail {
  width: 280px;
  height: 158px;
  position: relative;
  flex-shrink: 0;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.play-overlay i {
  font-size: 3rem;
  color: white;
}

.video-content:hover .play-overlay {
  opacity: 1;
}

.video-details {
  padding: 15px;
  flex-grow: 1;
}

.video-title {
  font-size: 1.3rem;
  margin: 0 0 10px 0;
  color: #333;
}

.video-description {
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  color: #888;
  font-size: 0.9rem;
}

.stat-item {
  display: flex;
  align-items: center;
}

.stat-item i {
  margin-right: 5px;
}

.publish-date {
  margin-left: auto;
}

@media (max-width: 768px) {
  .video-content {
    flex-direction: column;
  }
  
  .video-thumbnail {
    width: 100%;
    height: 200px;
  }
  
  .filter-bar {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}
</style>