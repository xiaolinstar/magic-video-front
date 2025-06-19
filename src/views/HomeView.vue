<template>
  <div class="home">
    <!-- 轮播图 -->
    <Carousel />

    <!-- 视频推荐列表 -->
    <div class="video-section">
      <h2>推荐视频</h2>
      <VideoList :collections="recommendedCollections" :maxRows="3" :showTypeTag="false" />
    </div>

    <!-- 新剧展示 -->
    <div v-if="false"  class="video-section">
      <h2>新剧上映</h2>
      <VideoList :collections="latestCollections" :maxRows="2" :showTypeTag="true" />
    </div>

    <!-- 经典好剧展示 -->
    <div v-if="false"  class="video-section">
      <h2>经典好剧</h2>
      <VideoList :collections="classicCollections" :maxRows="2" :showTypeTag="true"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  getClassicVideos,
  getLatestVideos,
  getRecommendVideos,
} from '@/apis/resource';
// 修正组件导入路径，使用绝对路径
import Carousel  from '@/views/Carousel.vue';
import VideoList  from '@/views/pages/VideoList.vue';
import type { ICollection } from '@/common/types/video';

const recommendedCollections = ref<ICollection[]>([]);
const latestCollections = ref<ICollection[]>([]);
const classicCollections = ref<ICollection[]>([]);

// 获取视频资源并更新数据
onMounted(() => {
  getRecommendVideos()
      .then(response => {
        recommendedCollections.value = response.data;
      })
      .catch(error => console.log("获取推荐视频失败"));
  /*
  getLatestVideos()
      .then(response => {
        latestCollections.value = response.data;
      })
      .catch(error => console.log("获取最新视频失败"));

  getClassicVideos()
      .then(response => {
        classicCollections.value = response.data;
      })
      .catch(error => console.log("获取经典视频失败"));

  */
});
</script>

<style scoped>
.home {
  padding: 0; /* 移除内边距 */
  max-width: 100%;
  width: 100%;
  margin: 0; /* 移除外边距 */
  overflow-x: hidden; /* 防止水平滚动 */
}

.video-section {
  margin: 0px 160px;
  padding: 0 20px;
}

.video-section h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  padding-left: 15px;
}

.video-section h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background-color: #00a1d6;
  border-radius: 2px;
}

/* 分类标签样式 */
.category-tabs {
  margin: 20px 20px 0;
}

:deep(.el-tabs__item) {
  font-size: 16px;
  padding: 0 20px;
}

:deep(.el-tabs__active-bar) {
  background-color: #00a1d6;
}

:deep(.el-tabs__item.is-active) {
  color: #00a1d6;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .video-section {
    margin: 0 20px;
    padding: 0 15px;
  }
}

@media (max-width: 992px) {
  .video-section {
    margin: 0 10px;
    padding: 0 15px;
  }

  .video-section h2 {
    font-size: 22px;
    margin-bottom: 15px;
  }
}

@media (max-width: 768px) {
  .video-section {
    margin: 0px 10px 0px 10px;
    padding: 0 10px;
  }

  .video-section h2 {
    font-size: 20px;
    margin-bottom: 12px;
  }

  :deep(.el-tabs__item) {
    font-size: 14px;
    padding: 0 15px;
  }
}

@media (max-width: 576px) {
  .video-section {
    margin: 0 5px;
    padding: 0 5px;
  }

  .video-section h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .video-section h2::before {
    height: 16px;
  }

  :deep(.el-tabs__item) {
    font-size: 13px;
    padding: 0 10px;
  }
}
</style>@/apis/resource