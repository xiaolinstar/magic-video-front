// 视频资源单元
interface IVideoResource {
  id: number;              // 全局唯一视频id
  title: string;           // 主标题
  originalTitle?: string;  // 原标题
  description: string;     // 描述
  coverImage: string;      // 封面图URL
  type: 'movie' | 'episode' | 'clip'; // 具体资源类型： 电影，剧集的一集，剪辑
  releaseDate?: string;    // 发布日期
  duration: number;        // 时长(秒) TODO 分钟
  
  // 元数据
  genres?: string[];       // 分类标签
  rating?: number;         // 评分
  cast?: string[];         // 演员阵容
  directors?: string[];    // 导演
  tags?: string[];         // 标签
  
  // 关系型字段
  collectionId?: number;   // 所属合集ID
  seasonNumber?: number;   // 季号 (剧集专属)
  episodeNumber?: number;  // 集号 (剧集专属)
}

// 合集结构 (统一管理电影系列和剧集)
interface ICollection {
  id: number;             // 合集ID
  title: string;          // 合集标题
  type: 'movie-series' | 'tv-series' | 'anthology'; // 合集类型
  description: string;    // 合集描述
  coverImage: string;     // 合集封面
  releaseYear?: number;   // 发行年份

  directResourceId?: number; // 关联到可直接跳转的 resourceId
  // 合集内容
  items: Array< IMovieItem | ISeasonItem >;
  
  // 相关推荐
  relatedCollections?: number[]; // 相关合集ID
}

// 电影系列中的电影项
interface IMovieItem {
  type: 'movie';
  movieId: number;        // 关联的电影ID
  order: number;          // 在系列中的顺序
  title?: string;         // 可选的独立标题
}

// 剧集中的季项
interface ISeasonItem {
  type: 'season';
  seasonId: number;       // 关联的季ID
  order: number;          // 在剧集中的顺序
  title?: string;         // 可选的季标题
}

// 季结构
interface ISeason {
  id: number;             // 季ID
  collectionId: number;   // 所属合集ID
  seasonNumber: number;   // 季号
  title?: string;         // 季标题
  description?: string;   // 季描述
  coverImage?: string;    // 季封面
  releaseDate?: string;   // 季发布日期
  
  // 本季剧集
  episodes: IEpisode[];
}

// 剧集结构
interface IEpisode {
  id: number;             // 剧集ID
  seasonId: number;       // 所属季ID
  episodeNumber: number;  // 集号
  title: string;          // 集标题
  duration: number;       // 时长(秒)
  thumbnail?: string;     // 剧集缩略图
  plot?: string;          // 本集剧情简介
}

// 播放源结构
interface IPlaybackSource {
  videoId: number;        // 关联的视频ID
  sources: IVideoSource[];
}

// 视频源
interface IVideoSource {
  src: string;            // 资源地址
  type: 'mp4' | 'hls' | 'dash';
  resolution: string;     // 分辨率
  bitrate?: number;       // 码率 (kbps)
}

interface IVideoDetails {
  videoResources: IVideoResource[];
  collections: ICollection[];
  movies: IMovieItem[];
  seasons: ISeason[];
  playbackSources: IPlaybackSource[];
}

export type {
  ICollection, 
  IEpisode, 
  IPlaybackSource, 
  IVideoResource, 
  IVideoSource,
  ISeason,
  IMovieItem,
  ISeasonItem,
  IVideoDetails
}