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
        <div class="category-icon">
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
}

const categories = ref<Category[]>([
  { id: 1, name: '电影', icon: 'el-icon-video-camera' },
  { id: 2, name: '电视剧', icon: 'el-icon-monitor' },
  { id: 3, name: '综艺', icon: 'el-icon-star-on' },
  { id: 4, name: '动漫', icon: 'el-icon-picture' },
  { id: 5, name: '纪录片', icon: 'el-icon-camera' },
  { id: 6, name: '少儿', icon: 'el-icon-present' },
  { id: 7, name: '音乐', icon: 'el-icon-headset' },
  { id: 8, name: '教育', icon: 'el-icon-reading' }
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
  background-color: #4CAF50;
  color: white;
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
}

.category-icon i {
  font-size: 24px;
  color: #4CAF50;
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