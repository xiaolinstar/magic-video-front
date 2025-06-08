<template>
  <div class="video-list-container">
    <div 
      v-for="collection in displayedCollections" 
      :key="collection.id" 
      class="video-card"
      @click="playCollection(collection)"
    >
      <div class="video-cover-wrapper">
        <img :src="collection.coverImage" :alt="collection.title" class="video-cover" />
        <div class="play-icon-overlay">
          <i class="play-icon">▶</i>
        </div>
        <div v-if="showTypeTag" class="video-type-tag">
          {{ getCollectionTypeText(collection.type) }}
        </div>
        <div v-if="collection.releaseYear" class="year-tag">
          {{ collection.releaseYear }}
        </div>
      </div>
      <div class="video-info">
        <h3 class="video-title">{{ collection.title }}</h3>
        <p class="video-description">{{ collection.description }}</p>
        <div class="video-meta">
          <span class="video-type">{{ getCollectionTypeText(collection.type) }}</span>
          <span v-if="collection.releaseYear" class="video-rating">{{ collection.releaseYear }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import type { ICollection } from '@/common/types/video';

interface Props {
  collections: ICollection[];
  maxRows?: number;
  showTypeTag?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxRows: 3,
  showTypeTag: true
});

const router = useRouter();
const itemsPerRow = ref(5); // 根据屏幕大小估算每行显示的视频数量

// 计算显示的集合数量
const displayedCollections = computed(() => {
  const maxItems = props.maxRows * itemsPerRow.value;
  return props.collections.slice(0, maxItems);
});

// 获取集合类型文本
const getCollectionTypeText = (type: string): string => {
  switch (type) {
    case 'movie-series':
      return '电影';
    case 'tv-series':
      return '剧集';
    default:
      return '精选剪辑';
  }
};

// 点击集合，跳转到第一个视频
const playCollection = (collection: ICollection) => {

  // TODO：根据 CollectionId，从服务端获取直接相关联的视频资源
  if (collection.items && collection.items.length > 0) {
    const firstItem = collection.items[0];
    let videoId: number;
    
    if (firstItem.type === 'movie' || firstItem.type === 'clip') {
      // 电影系列：直接跳转到第一部电影
      videoId = firstItem.id;
    } else if (firstItem.type === 'season') {
      // 剧集系列：跳转到第一季第一集
      const seasonId = firstItem.id;
      
      // 根据seasonId构造第一集的ID
      // 从mock数据可以看出，第一集的ID规律是：seasonId * 10 + 1
      // 例如：seasonId 20011 -> 第一集ID 200101
      // 例如：seasonId 10051 -> 第一集ID 100501

      videoId = Math.floor(seasonId / 10) * 100 + 1;
    } else {
      console.warn('未知的项目类型:', (firstItem as any).type);
      return;
    }
    console.log('videoId:', videoId); // 打印 videoId，用于调试

    // 跳转到： /video?id=xxxx123
    router.push({
      name: 'video',
      query: { id: videoId }
    });
  }
};

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
  cursor: pointer;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
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

.play-icon {
  font-size: 48px;
  color: white;
  font-style: normal;
}

.video-cover-wrapper:hover .play-icon-overlay {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.3);
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

/* 年份标签 */
.year-tag {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 12px;
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
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  height: 2.8em; /* 固定高度为两行 */
}

/* 视频描述 */
.video-description {
  font-size: 13px;
  color: #666;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  flex-grow: 1;
}

/* 视频元数据 */
.video-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #999;
  margin-top: auto;
}

.video-type {
  color: #00a1d6;
  font-size: 12px;
}

/* 视频评分 */
.video-rating {
  color: #ff6b35;
  font-size: 12px;
  font-weight: 500;
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