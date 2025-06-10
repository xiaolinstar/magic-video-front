<template>
  <div class="carousel-section">
    <el-carousel :interval="3000" height="60vh" indicator-position="none" arrow="hover" :autoplay="true">
      <el-carousel-item v-for="slide in slides" :key="Number(slide.id)">
        <div class="carousel-item" @click="navigateToVideo(slide.id)">
          <div class="avatar-container">
            <el-image :src="slide.coverImage" fit="contain" class="slide-avatar" />
          </div>
          <div class="slide-content">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getSlides } from '@/apis/slide';
import { onMounted } from 'vue';
import type {ISlide} from "@/common/types/slide";

const router = useRouter();

const slides = ref<ISlide[]>([]);

onMounted(() => {
    getSlides().then(
        (response) => {
        console.log('获取轮播图数据成功:', response.data);
        slides.value = response.data;
      }
    ).catch (error => console.error('获取轮播图数据失败:'))

});

const navigateToVideo = (videoId: bigint) => {
  console.log('跳转到视频详情页:', videoId);
  router.push({
    path: '/video',
    query: {id: videoId.toString()}
  });
};
</script>

<style scoped>
.carousel-section {
  width: 100%;
  margin-bottom: 40px;
  padding: 0;
}

.el-carousel {
  width: 100%;
}

/* 修改覆盖样式，确保轮播功能正常 */
:deep(.el-carousel__container) {
  width: 100%;
}

:deep(.el-carousel__item) {
  width: 100% !important;
}

:deep(.el-carousel__indicators) {
  z-index: 10;
}

:deep(.el-carousel__arrow) {
  font-size: 20px;
  width: 40px;
  height: 40px;
}

.carousel-item {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  background-color: #0e0e0e; /* 添加黑色背景 */
}

.avatar-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-avatar {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* 保持图像比例 */
  display: block;
  margin: 0 auto;
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 50px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: #fff;
  text-align: left;
}

.slide-content h2 {
  font-size: 42px;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.slide-content p {
  font-size: 22px;
  margin-bottom: 30px;
  max-width: 80%;
  line-height: 1.5;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}


/* 响应式设计 */
@media (max-width: 1200px) {
  .slide-content h2 {
    font-size: 36px;
    margin-bottom: 15px;
  }
  
  .slide-content p {
    font-size: 20px;
    margin-bottom: 25px;
  }
}

@media (max-width: 992px) {
  .slide-content {
    padding: 40px;
  }
  
  .slide-content h2 {
    font-size: 32px;
  }
  
  .slide-content p {
    font-size: 18px;
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .carousel-section {
    padding: 0;
  }
  
  .slide-content {
    padding: 30px;
  }
  
  .slide-content h2 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  
  .slide-content p {
    font-size: 16px;
    margin-bottom: 15px;
    max-width: 95%;
  }
  
  :deep(.el-carousel__arrow) {
    font-size: 16px;
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 576px) {
  .slide-content {
    padding: 20px;
  }
  
  .slide-content h2 {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .slide-content p {
    font-size: 14px;
    margin-bottom: 10px;
    max-width: 100%;
  }
  
  :deep(.el-carousel__arrow) {
    font-size: 14px;
    width: 25px;
    height: 25px;
  }
}

@media (max-width: 480px) {
  .slide-content {
    padding: 15px;
  }
  
  .slide-content h2 {
    font-size: 20px;
    margin-bottom: 5px;
  }
  
  .slide-content p {
    font-size: 12px;
    margin-bottom: 8px;
    line-height: 1.3;
  }
}

@media (max-width: 375px) {
  .slide-content h2 {
    font-size: 18px;
  }
  
  .slide-content p {
    font-size: 11px;
  }
  
  :deep(.el-carousel__arrow) {
    display: none;
  }
}
</style>
