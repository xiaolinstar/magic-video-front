<template>
  <div class="carousel-section">
    <el-carousel :interval="5000" type="card" height="400px">
      <el-carousel-item v-for="banner in banners" :key="banner.id">
        <div class="carousel-item" @click="navigateToBanner(banner)">
          <el-image :src="banner.image" fit="cover" class="banner-image" />
          <div class="banner-content">
            <h2>{{ banner.title }}</h2>
            <p>{{ banner.description }}</p>
            <button class="watch-btn">立即观看</button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getBanners } from '@/apis/banner';
import { onMounted } from 'vue';


const router = useRouter();

interface IBanner {
  id: number;
  title: string;
  description: string;
  image: string;
}

const banners = ref<IBanner[]>([]);

onMounted(async () => {
  try {
    const response = await getBanners();
    banners.value = response.data;
  } catch (error) {
    console.error('获取轮播图数据失败:', error);
  }
});

const navigateToBanner = (banner: IBanner) => {
  router.push({
    path: '/video',
    query: {id: banner.id}
  });
};
</script>

<style scoped>
.carousel-section {
  margin-bottom: 40px;
}

.carousel-item {
  position: relative;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.banner-image {
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.carousel-item:hover .banner-image {
  transform: scale(1.05);
}

.banner-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
  color: white;
  text-align: left;
}

.banner-content h2 {
  font-size: 24px;
  margin-bottom: 10px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
}

.banner-content p {
  font-size: 16px;
  margin-bottom: 15px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
}

.watch-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.watch-btn:hover {
  background-color: #45a049;
}

/* 自定义 Element Plus 轮播图样式 */
:deep(.el-carousel__item) {
  border-radius: 8px;
}

:deep(.el-carousel__arrow) {
  background-color: rgba(0, 0, 0, 0.5);
}

:deep(.el-carousel__arrow:hover) {
  background-color: rgba(0, 0, 0, 0.7);
}

:deep(.el-carousel__indicators) {
  bottom: 20px;
}

:deep(.el-carousel__button) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
}

:deep(.el-carousel__indicator.is-active .el-carousel__button) {
  background-color: #4CAF50;
}

@media (max-width: 768px) {
  .banner-content h2 {
    font-size: 20px;
  }
  
  .banner-content p {
    font-size: 14px;
  }
}
</style>