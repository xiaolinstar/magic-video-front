<script setup lang="ts">
import { onMounted, reactive, watch, ref, onUnmounted } from 'vue';
import dashjs from 'dashjs';
import { listVideoResources } from '@/apis/resource';
import { useRoute } from 'vue-router';

interface IVideo {
  mp4: string;  // mp4资源地址
  m3u8: string; // hls资源地址
  mpd: string;  // dash资源地址
  name: string; // 资源名称
  title: string; // 资源标题
  description: string; // 资源描述
  avatar: string; // 资源封面图
}

const dashVideoRef = ref()
const route = useRoute()
let player: dashjs.MediaPlayerClass | null = null;

/**
 * 响应式视频表单
 */
const form = reactive({
  id: 0,
  videos: [] as IVideo[]
})

const updateVideo = async() => {
  let currVideo: IVideo = form.videos[form.id];
  
  // 如果已存在播放器实例，先销毁
  if (player) {
    player.reset();
  }

  // 初始化DASH播放器
  player = dashjs.MediaPlayer().create();
  player.initialize(dashVideoRef.value, currVideo.mpd, true);
  player.setAutoPlay(true);
  
  // 添加错误处理
  player.on(dashjs.MediaPlayer.events.ERROR, function(e: any) {
    console.error('DASH播放器错误:', e);
  });
  
  console.log("当前播放视频名称", currVideo.name);
  console.log("当前播放视频资源", currVideo.mpd);
}

watch(() => [form.id], () => {
  console.log('[change id]', form.id);
  updateVideo()
})

onMounted(() => {
  listVideoResources()
      .then(response => {
        form.videos = response.data;
        updateVideo();
      })
      .catch(error => console.log("拉取视频资源失败，请联系管理员"));
})

// 组件卸载时清理播放器资源
onUnmounted(() => {
  if (player) {
    player.reset();
    player = null;
  }
});
</script>

<template>
  <div class="main clearfix">
    <div class="flex">
      <div class="v">
        <video ref="dashVideoRef" width="1200" height="700" controls></video>
      </div>
      <el-card class="list">
        <template #header>
          视频列表
        </template>
        <el-scrollbar height="600px" class="videos">
          <div class="video" v-for="(v, i) in form.videos" :key="i">
            <div @click="() => form.id = i" class="video-item" :class="{ active: form.id === i }">
              <el-image :src="v.avatar" class="video-thumbnail" />
              <div class="video-info">
                <span class="name">{{ v.title }}</span>
                <span class="desc">{{ v.description }}</span>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.main {
  background-image: url(../assets/background.jpg);
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.flex {
  display: flex;
}

.v {
  margin: 50px 0 0 50px;
}

.list {
  margin: 50px;
  width: 20vw;
}

.control {
  margin: 50px 0 0 50px;
  display: flex;
}

.box-card {
  margin-bottom: 20px;
}

.video {
  margin-bottom: 20px;
}

.video-item {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  padding: 8px;
}

.video-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.video-item.active {
  background-color: rgba(76, 175, 80, 0.2);
  border-left: 3px solid #4CAF50;
}

.video-thumbnail {
  width: 100%;
  border-radius: 4px;
}

.video-info {
  text-align: center;
  margin-top: 8px;
}

.name {
  font-size: 16px;
  margin-right: 10px;
  display: block;
  font-weight: bold;
}

.desc {
  color: #999;
  font-size: 13px;
  display: block;
  margin-top: 4px;
}

#xg {
  width: 1000px;
  margin: 50px;
}
</style>
@/apis/resource