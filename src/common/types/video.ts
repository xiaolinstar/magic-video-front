export interface IVideo {
  id: number;   // 资源id
  mp4: string;  // mp4资源地址
  m3u8: string; // hls资源地址
  mpd: string;  // dash资源地址
  name: string; // 资源名称
  title: string; // 资源标题
  description: string; // 资源描述
  avatar: string; // 资源封面图
  type: 'movie' | 'tvshow' | 'video'; // 视频类型：'movie'(电影)、'tvshow'(电视剧)、'video'(视频资源)
  episodes?: {
    season: number; // 季数
    episode: number; // 集数
    title: string; // 集标题
    duration: string; // 时长
  }[];
  relatedMovies?: number[]; // 相关推荐电影ID数组
}