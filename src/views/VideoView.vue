<script setup lang="ts">
import { onMounted, reactive, watch, ref } from 'vue';
import Hls from 'hls.js';
import {listVideoResources} from '@/apis/videos'
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

const HlsVideoRef = ref()
const route = useRoute()
/**
 * 响应式视频表单
 */
const form = reactive({
  id: 0,
  videos: [] as IVideo[]
})

const updateVideo = async() => {

  let currVideo: IVideo = form.videos[form.id];

  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.attachMedia(HlsVideoRef.value);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      hls.loadSource(currVideo.m3u8);
    });
    console.log("当前播放视频名称", currVideo.name)
    console.log("当前播放视频资源", currVideo.m3u8);
  } else {
    console.log("当前浏览器不支持播放HLS")
  }
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
</script>

<template>
  <div class="main clearfix">

    <div class="flex">
      <div class="v">
        <video  ref="HlsVideoRef" width="1200" height="700" controls></video>
      </div>
      <el-card class="list">
        <template #header>
          视频列表
        </template>
        <el-scrollbar height="600px" class="videos">
          <div class="video" v-for="(v, i) in form.videos" :key="i">
            <div @click="() => form.id = i">
              <el-image :src="v.avatar" />
              <div style="text-align: center">
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

.name {
  font-size: 16px;
  margin-right: 10px;
}

.desc {
  color: #999;
  font-size: 13px;
}

#xg {
  width: 1000px;
  margin: 50px;
}
</style>
