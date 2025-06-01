<template>
  <div class="video-list-container limited-rows">
    <div class="video-card" v-for="(video, index) in displayedVideos" :key="video.name">
      <!-- 添加视频类型标签，根据 showTypeTag 配置控制显示 -->
      <div class="video-type-tag" v-if="showTypeTag && video.type">
        {{ getVideoTypeText(video.type) }}
      </div>
      
      <router-link :to="`/video?id=${video.id}`" class="video-link">
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
            <span class="play-count"><i class="el-icon-view"></i>8.2万</span>
            <span class="danmaku-count"><i class="el-icon-chat-dot-round"></i>1024</span>
            <!-- 添加视频类型显示，根据 showTypeTag 配置控制显示 -->
            <span class="video-type" v-if="showTypeTag && video.type">{{ getVideoTypeText(video.type) }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import type { IVideo } from '@/common/types/video';

const props = defineProps({
  videos: {
    type: Array as () => IVideo[],
    required: true
  },
  maxRows: {
    type: Number,
    default: 3
  },
  // 添加新的配置属性，控制是否显示视频类型标签
  showTypeTag: {
    type: Boolean,
    default: true // 默认显示类型标签，保持向后兼容
  }
});

// 获取视频类型的中文描述
const getVideoTypeText = (type: string) => {
  switch (type) {
    case 'movie': return '电影';
    case 'tvshow': return '电视剧';
    case 'video': return '视频';
    default: return '';
  }
};

const itemsPerRow = ref(5); // 根据屏幕大小估算每行显示的视频数量

// 计算当前应该显示的视频
const displayedVideos = computed(() => {
  // 限制显示的视频数量，根据行数计算
  const maxItems = props.maxRows * itemsPerRow.value;
  return props.videos.slice(0, maxItems);
});

// 监听窗口大小变化，调整每行显示的视频数量
const updateItemsPerRow = () => {
  const width = window.innerWidth;
  if (width > 1200) {
    itemsPerRow.value = 5;
  } else if (width > 768) {
    itemsPerRow.value = 4;
  } else if (width > 480) {
    itemsPerRow.value = 3;
  } else {
    itemsPerRow.value = 2;
  }
};

// 初始化和窗口大小变化时更新
updateItemsPerRow();
window.addEventListener('resize', updateItemsPerRow);

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerRow);
});
</script>

<style scoped>
/* 视频列表容器 */
.video-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  width: 100%;
}

/* 视频卡片 */
.video-card {
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* 视频链接 */
.video-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 视频封面包装器 */
.video-cover-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 宽高比 */
  overflow: hidden;
}

/* 视频封面图片 */
.video-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 视频时长 */
.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 12px;
}

/* 播放图标覆盖层 */
.play-icon-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;
}

.play-icon-overlay i {
  font-size: 48px;
  color: white;
}

.video-cover-wrapper:hover .play-icon-overlay {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.3);
}

/* 视频信息 */
.video-info {
  padding: 12px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* 视频标题 */
.video-title {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  height: 2.8em; /* 固定高度为两行 */
}

/* 视频元数据 */
.video-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 13px;
  color: #999;
  margin-top: auto;
}

.play-count, .danmaku-count {
  display: flex;
  align-items: center;
  margin-right: 12px;
}

.play-count i, .danmaku-count i {
  margin-right: 4px;
  font-size: 14px;
}

/* 视频类型标签 */
.video-type-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 161, 214, 0.8);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 2;
}

.video-type {
  margin-left: auto;
  color: #00a1d6;
  font-size: 12px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .video-list-container {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
  }
  
  .video-title {
    font-size: 14px;
  }
  
  .video-meta {
    font-size: 12px;
  }
}
</style>