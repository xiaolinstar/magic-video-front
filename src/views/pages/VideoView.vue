<script setup lang="ts">
import { onMounted, reactive, watch, ref, onUnmounted, computed } from 'vue';
import Player from 'xgplayer';
import HlsPlugin from 'xgplayer-hls';
import 'xgplayer/dist/index.min.css';
import { useRoute, useRouter } from 'vue-router';
import type {
  IVideo,
  ICollection,
  ISeason,
  IPlaybackSource,
  IVideoItem,
  IEpisode,
} from '@/common/types/video';
import { getVideoSet } from "@/apis/resource";

const videoPlayerRef = ref()
const route = useRoute()
const router = useRouter()

// TODO 显示推荐视频
const showRecommendedVideos = ref(false)

// 添加Apple设备检测
const isAppleDevice = computed(() => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
});

let player: any = null;

/**
 * 响应式数据
 */
const form = reactive({
  currentVideoId: 0n,
  videos: [] as IVideo[],
  collections: [] as ICollection[],
  seasons: [] as ISeason[],
  playbackSources: [] as IPlaybackSource[]
})

// 获取当前播放的视频资源
const currentVideo  = computed((): IVideo | undefined => {
  console.log("computed, currentVideoId:", form.currentVideoId);
  return form.videos.find(video => video.id === form.currentVideoId);
});

const currentPlaybackSource = computed((): IPlaybackSource | undefined => {
  return form.playbackSources.find(source => source.videoId === form.currentVideoId);
});

const currentSeason = computed(() => {
  if (!currentVideo || currentVideo.value?.type !== 'episode') return null;
  // 通过 collectionId 找到对应的季
  return form.seasons.find(season => season.id === currentVideo.value?.seasonId);
});

// 获取相关推荐合集
const relatedCollections = computed(() => {
  if (!currentVideo.value) return [];

  const currentCollection = form.collections.find(c => c.id === currentVideo.value?.collectionId);
  if (!currentCollection || !currentCollection.relatedCollections) return [];

  return form.collections.filter(c =>
    currentCollection.relatedCollections!.includes(c.id)
  );
});


// 格式化时长（秒转换为时分秒）
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  } else {
    return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  }
};

// 判断是否需要滚动条
const needsScroll = computed(() => {
  if (currentVideo.value && currentVideo.value.type === 'episode' && currentSeason.value) {
    return currentSeason.value.episodes && currentSeason.value.episodes.length > 5;
  } else if (currentVideo.value && currentVideo.value.type === 'movie') {
    return relatedCollections.value && relatedCollections.value.length > 5;
  } else if (showRecommendedVideos.value) {
    return form.videos && form.videos.length > 5;
  }
  return false;
});

// 获取视频类型的中文描述
const getVideoTypeText = (type: 'movie' | 'episode' | 'clip'): string => {
  switch (type) {
    case 'movie': return '电影';
    case 'episode': return '剧集';
    case 'clip': return '剪辑';
    default: return '未知类型';
  }
};

// 播放指定视频
const playVideo = (videoId: bigint) => {
  const video = form.videos.find(v => v.id === videoId);
  if (!video) return;

  form.currentVideoId = videoId;
};

// 播放指定合集（播放合集中的第一个项目）
const playCollection = (collectionId: bigint) => {
  const collection = form.collections.find(c => c.id === collectionId);
  if (!collection || collection.items.length === 0) return;

  const firstSeasonItem = collection.items[0];

  if (firstSeasonItem.type === 'movie' || firstSeasonItem.type === 'clip') {
    // 播放电影
    const movie = form.videos.find(r => r.id === firstSeasonItem.id);
    if (movie) {
      form.currentVideoId = movie.id;
    }
  } else if (firstSeasonItem.type === 'season') {
    // 播放季的第一集
    let season: ISeason | undefined = form.seasons.find(s => s.id === firstSeasonItem.id);

    if (season !== undefined && season.episodes.length > 0) {
      const firstEpisode = season.episodes[0];
      const episodeResource = form.videos.find(r =>
        r.type === 'episode' &&
        r.collectionId === season?.collectionId &&
        r.seasonNumber === season?.seasonNumber &&
        r.episodeNumber === firstEpisode.episodeNumber
      );
      if (episodeResource) {
        form.currentVideoId = episodeResource.id;
      }
    }
  }
};

// 根据剧集编号播放剧集
const playEpisodeByNumber = (episodeNumber: number) => {
  if (!currentVideo.value || !currentSeason.value) return;

  let seasonId = currentSeason.value.id;
  // 查找对应的剧集资源
  let checkOutVideo: IVideo | undefined = form.videos.find(v =>
    v.type === 'episode' &&
    v.seasonId === seasonId &&
    v.episodeNumber === episodeNumber
  );

  if (checkOutVideo !== undefined) {
    form.currentVideoId = checkOutVideo.id;
  }
  console.log("episodeNumber:", episodeNumber);
  console.log("将要切换到的视频", checkOutVideo);
};

const updateVideo = async () => {
  const currentResource = currentVideo.value;
  const currentSource = currentPlaybackSource.value;

  console.log("currentResource:", currentResource); // 打印currentResource，用于调试
  console.log("currentSource:", currentSource); // 打印currentSource，用于调试

  if (!currentResource || !currentSource) return;

  // 如果已存在播放器实例，先销毁
  if (player) {
    player.destroy();
    player = null;
  }

  // 优先查找HLS源，如果没有则使用DASH源
  let videoSource = currentSource.sources.find(s => s.type === 'hls');
  if (!videoSource) {
    videoSource = currentSource.sources.find(s => s.type === 'dash');
  }
  
  console.log("videoSource:", videoSource); // 打印videoSource，用于调试
  if (!videoSource) return;

  // 根据视频源类型选择播放器配置
  const playerConfig: any = {
    el: videoPlayerRef.value,
    url: videoSource.src,
    autoplay: true,
    width: '100%',
    height: '100%',
    fluid: true,
    poster: currentResource.coverImage || '',
    playsinline: true,
    lang: 'zh-cn'
  };

  if (videoSource.type === 'hls') {
    // 检查是否原生支持HLS
    if (document.createElement('video').canPlayType('application/vnd.apple.mpegurl')) {
      console.log("当前环境支持HLS播放");
      // 原生支持HLS播放
      player = new Player(playerConfig);
    } else if (HlsPlugin.isSupported()) {
      // 使用HLS插件
      console.log("使用HLS插件");
      playerConfig.plugins = [HlsPlugin];
      playerConfig.hls = {
        retryCount: 3,
        retryDelay: 1000,
        loadTimeout: 10000
      };
      player = new Player(playerConfig);
    } else {
      console.error('当前环境不支持HLS播放');
      return;
    }
  } else {
    // 使用普通播放器
    player = new Player(playerConfig);
  }

  // 添加错误处理
  player.on('error', function (e: any) {
    console.error('播放器错误:', e);
  });

  console.log("当前播放资源:", videoSource.src);
  console.log("当前视频资源", currentVideo.value);
  console.log("当前视频剧集", currentSeason.value)

  // 更新URL，不刷新页面
  await router.replace({
    query: { ...route.query, id: form.currentVideoId.toString() }
  });
}

// 当 currentResourceId 观察到发生变化，则更新播放内容
watch(() => [form.currentVideoId], () => {
  console.log('[change resource id]', form.currentVideoId);
  updateVideo()
})

// 添加控制描述展开/收起的状态变量
const isDescriptionExpanded = ref(false);

// 切换描述展开/收起状态的函数
const toggleDescription = () => {
  isDescriptionExpanded.value = !isDescriptionExpanded.value;
};

// 组件挂载时拉取数据
onMounted(() => {
  console.log("onMounted");

  getVideoSet().then(
    response => {
      console.log('Restful Response', response);

      // 转换 videos 中的 id 为数字类型
      form.videos = response.data.videos.map((video: IVideo) => ({
        ...video,
        id: BigInt(video.id),
        // 若存在其他关联的 id 字段，也进行转换
        collectionId: video.collectionId? BigInt(video.collectionId) : null,
        seasonId: video.seasonId? BigInt(video.seasonId) : null,
      }));
// 转换 collections 中的 id 为数字类型
      form.collections = response.data.collections.map((collection: ICollection) => ({
        ...collection,
        id: BigInt(collection.id),
        directVideoId: collection.directVideoId? BigInt(collection.directVideoId) : null,
        // 若存在 relatedCollections 数组，也转换其中的 id
        relatedCollections: collection.relatedCollections?.map(id => BigInt(id)),
        items: collection.items.map((item: IVideoItem) => ({
          ...item,
          id: BigInt(item.id)
        }))
      }));

      // 转换 seasons 中的 id 为数字类型
      form.seasons = response.data.seasons.map((season: ISeason) => ({
        ...season,
        id: BigInt(season.id),
        collectionId: BigInt(season.collectionId),
        episodes: season.episodes.map((episode: IEpisode) => ({
          ...episode,
          id: BigInt(episode.id),
          seasonId: BigInt(season.id),
          episodeNumber: episode.episodeNumber
        }))
      }));

      // 转换 playbackSources 中的 id 为数字类型
      form.playbackSources = response.data.playbackSources.map((playbackSource: IPlaybackSource) => ({
        ...playbackSource,
        videoId: BigInt(playbackSource.videoId)
      }));
      console.log('form', form)
    }
  ).then(() => {
    // 根据URL参数设置初始视频
    let videoId = route.query.id as string;
    console.log("videoId:", videoId);
    if (videoId && BigInt(videoId)) {
      form.currentVideoId = BigInt(videoId);
    } else if (form.videos.length > 0) {
      // 默认第一个视频资源
      form.currentVideoId = 0n
    }
    updateVideo();
  })
});

onUnmounted(() => {
  if (player) {
    player.destroy();
    player = null;
  }
});
</script>

<template>
  <div class="video-page">
    <!-- 视频播放区域 -->
    <div class="video-player-container">
      <!-- 视频标题显示在视频上方 -->
      <h1 class="video-title-header" v-if="currentVideo">
        {{ currentVideo.title }}
      </h1>

      <div class="video-player-wrapper">
          <div ref="videoPlayerRef" class="video-player"></div>
        </div>

      <!-- 视频信息区域 -->
      <div class="video-info-container" v-if="currentVideo">
        <div class="video-stats">
          <span class="play-count">
            播放量: 10.2万
          </span>
          <span class="publish-date">
            发布时间: {{ currentVideo.releaseDate || "2025-05-25" }}
          </span>
          <span class="video-type">类型: {{ getVideoTypeText(currentVideo.type) }}</span>
          <span v-if="currentVideo.rating" class="video-rating">
            评分: {{ currentVideo.rating }}
          </span>
        </div>
        <div class="video-description" :class="{ 'expanded': isDescriptionExpanded }">
          {{ currentVideo.description }}
        </div>
        <div v-if="currentVideo.genres" class="video-genres">
          <span class="genre-tag" v-for="genre in currentVideo.genres" :key="genre">
            {{ genre }}
          </span>
        </div>
      </div>
    </div>

    <!-- 根据视频类型显示不同的侧边栏内容 -->
    <!-- 剧集：显示同季其他剧集 -->
    <div v-if="currentVideo && currentVideo.type === 'episode' && currentSeason" class="episode-list">
      <h2 class="section-title">{{ currentSeason.title || `第${currentSeason.seasonNumber}季` }}</h2>
      <!-- <p class="season-description">{{ currentSeason.description || "介绍待补充..." }}</p> -->
      <el-scrollbar height="calc(100vh - 150px)" class="episode-list-scrollbar">
        <div class="episode-grid">
          <div v-for="episode in currentSeason.episodes" :key="episode.episodeNumber" class="episode-card"
            :class="{ 'active': currentVideo.episodeNumber === episode.episodeNumber }"
            @click="playEpisodeByNumber(episode.episodeNumber)">
            <div class="episode-number">{{ episode.episodeNumber }}</div>
            <!--            <div class="episode-title">{{ episode.title }}</div>-->
            <div class="episode-duration">{{ formatDuration(episode.duration) }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!-- 电影：显示相关推荐电影 -->
    <div v-else-if="currentVideo && currentVideo.type === 'movie'" class="related-movies">
      <h2 class="section-title">相关推荐</h2>
      <el-scrollbar height="calc(100vh - 100px)" class="video-list-scrollbar">
        <div class="video-list">
          <div v-for="relatedCollection in relatedCollections" :key="Number(relatedCollection.id)"
            class="recommended-video-item" @click="playCollection(relatedCollection.id)">
            <div class="video-avatar-container">
              <el-image :src="relatedCollection.coverImage" fit="cover" class="video-avatar" />
              <div class="play-icon"><i class="el-icon-video-play"></i></div>
            </div>
            <div class="video-details">
              <h3 class="video-item-title">{{ relatedCollection.title }}</h3>
              <p class="video-item-desc">{{ relatedCollection.description }}</p>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!-- 默认：显示所有视频列表 -->
    <div v-else-if="showRecommendedVideos" class="recommended-videos">
      <h2 class="section-title">所有视频</h2>
      <el-scrollbar height="calc(100vh - 100px)" class="video-list-scrollbar">
        <div class="video-list">
          <div v-for="video in form.videos" :key="Number(video.id)" class="recommended-video-item"
               :class="{ active: form.currentVideoId === video.id }" @click="playVideo(video.id)">
            <div class="video-avatar-container">
              <el-image :src="video.coverImage" fit="cover" class="video-avatar" />
              <div class="play-icon"><i class="el-icon-video-play"></i></div>
            </div>
            <div class="video-details">
              <h3 class="video-item-title">{{ video.title }}</h3>
              <p class="video-item-desc">{{ video.description }}</p>
              <div class="video-meta">
                <span class="video-duration">{{ formatDuration(video.duration) }}</span>
                <span v-if="video.rating" class="video-rating">评分: {{ video.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped>
/* 视频页面样式，网格布局，视频占 70%，页面信息占据剩余的 30% */
.video-page {
  max-width: 100%;
  margin: 0 auto;
  padding: 35px;
  display: grid;
  grid-template-columns: 70% 0.8fr;
  /* 视频区域占据65%宽度 */
  gap: 24px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 48px);
}

.video-player-container {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 左对齐 */
  width: 100%;
  margin-left: 0;
  /* 确保靠左 */
}

/* 视频标题样式 */
.video-title-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #111010;
  text-align: left;
  width: 100%;
  padding: 16px 24px;
  background-color: #f8f2f2;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.video-player-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  /* 16:9 宽高比 */
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-info-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.video-stats {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 15px;
  color: #555;
}

.play-count,
.publish-date {
  margin-right: 20px;
  display: flex;
  align-items: center;
}


.video-description {
  font-size: 15px;
  line-height: 1.7;
  color: #333;
  white-space: pre-wrap;
}

.recommended-videos {
  grid-column: 2;
  position: sticky;
  top: 24px;
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 2px solid #00a1d6;
}

.video-list-scrollbar {
  flex: 1;
  overflow: hidden;
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 12px;
}

.recommended-video-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 12px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  padding: 12px;
  height: 100px;
}

.recommended-video-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.recommended-video-item.active {
  border-left: 4px solid #00a1d6;
  background-color: #f0f8ff;
}

.video-avatar-container {
  position: relative;
  width: 120px;
  height: 76px;
  border-radius: 6px;
  overflow: hidden;
}

.video-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.play-icon i {
  font-size: 32px;
  color: #fff;
}

.recommended-video-item:hover .play-icon {
  opacity: 1;
}

.video-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.video-item-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.video-item-desc {
  font-size: 12px;
  color: #666;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 剧集网格样式 - 基础样式 */
.episode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
  padding: 2px;
}

.episode-card {
  background: #2a2a2a;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.episode-card:hover {
  background: #3a3a3a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.episode-card.active {
  background: #ff6b35;
  border-color: #ff8c42;
}

.episode-card.active:hover {
  background: #ff7a47;
}

.episode-number {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8px;
}

.episode-card.active .episode-number {
  color: #fff;
}

.episode-title {
  font-size: 12px;
  color: #ccc;
  margin-bottom: 4px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.episode-card.active .episode-title {
  color: #fff;
}

.episode-duration {
  font-size: 10px;
  color: #999;
  position: absolute;
  bottom: 8px;
  right: 8px;
}

.episode-card.active .episode-duration {
  color: #fff;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .video-page {
    grid-template-columns: 1fr 280px;
    padding: 20px;
  }

  .recommended-video-item {
    grid-template-columns: 100px 1fr;
    height: 90px;
  }

  .video-avatar-container {
    width: 100px;
    height: 66px;
  }
}

@media (max-width: 992px) {
  .video-page {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .recommended-videos {
    grid-column: 1;
    position: static;
    height: auto;
    margin-top: 20px;
  }

  .video-list-scrollbar {
    height: auto !important;
    max-height: 600px;
  }

  .video-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .recommended-video-item {
    height: 100px;
  }
}

@media (max-width: 768px) {
  .video-page {
    padding: 16px;
  }

  .video-title-header {
    font-size: 20px;
    padding: 14px 20px;
  }

  .video-info-container {
    padding: 16px;
  }

  .video-list {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  .episode-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 12px;
    padding: 12px;
  }

  .episode-card {
    padding: 6px;
  }

  .episode-number {
    font-size: 20px;
  }

  .episode-title {
    font-size: 11px;
  }
}

@media (max-width: 576px) {
  .video-page {
    padding: 12px;
  }

  .video-title-header {
    font-size: 18px;
    padding: 12px 16px;
  }

  .video-info-container {
    padding: 14px;
  }

  .video-description {
    font-size: 14px;
  }

  .video-list {
    grid-template-columns: 1fr;
  }

  .recommended-video-item {
    height: auto;
    min-height: 90px;
  }

  .episode-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 8px;
    padding: 8px;
  }

  .episode-number {
    font-size: 18px;
  }

  .episode-title {
    font-size: 10px;
  }
}

</style>
