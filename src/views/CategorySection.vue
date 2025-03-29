<template>
  <div class="category-section">
    <h2 class="section-title">分类浏览</h2>
    <div class="category-container">
      <div 
        class="category-item" 
        v-for="category in categories" 
        :key="category.id"
        @click="navigateToCategory(category.id)"
      >
        <div class="category-icon" :style="{ backgroundImage: `url(${category.bgImage})` }">
          <i :class="category.icon"></i>
        </div>
        <div class="category-name">{{ category.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Category {
  id: number;
  name: string;
  icon: string;
  bgImage: string; // 添加背景图片属性
}

const categories = ref<Category[]>([
  { id: 1, name: '电影', icon: 'el-icon-video-camera', bgImage: 'src/assets/电影.svg' },
  { id: 2, name: '电视剧', icon: 'el-icon-monitor', bgImage: 'src/assets/电影.svg' },
  { id: 3, name: '综艺', icon: 'el-icon-star-on', bgImage: 'src/assets/电影.svg' },
  { id: 4, name: '动漫', icon: 'el-icon-picture', bgImage: 'src/assets/电影.svg' },
  { id: 5, name: '纪录片', icon: 'el-icon-camera', bgImage: 'src/assets/电影.svg' },
  { id: 6, name: '少儿', icon: 'el-icon-present', bgImage: 'src/assets/电影.svg' },
  { id: 7, name: '音乐', icon: 'el-icon-headset', bgImage: 'src/assets/电影.svg' },
  { id: 8, name: '教育', icon: 'el-icon-reading', bgImage: 'src/assets/电影.svg' }
]);

const navigateToCategory = (categoryId: number) => {
  router.push({
    path: '/category',
    query: { id: categoryId }
  });
};
</script>

<style scoped>
.category-section {
  margin-bottom: 30px;
  padding: 20px 0;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.section-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 2px solid #4CAF50;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
}

.category-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 0 20px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-item:hover {
  transform: translateY(-5px);
}

.category-item:hover .category-icon {
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.category-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.category-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.category-icon i {
  font-size: 24px;
  color: white;
  position: relative;
  z-index: 2;
}

.category-name {
  font-size: 14px;
  color: #333;
  text-align: center;
}

@media (max-width: 768px) {
  .category-container {
    gap: 15px;
  }
  
  .category-item {
    width: 80px;
  }
  
  .category-icon {
    width: 50px;
    height: 50px;
  }
}
</style>