// 合集结构 (统一管理电影系列和剧集)
interface ICollection {
    id: bigint;             // 合集ID
    title: string;          // 合集标题
    type?: 'movie-series' | 'tv-series' | 'anthology'; // 合集类型
    description: string;    // 合集描述
    coverImage: string;     // 合集封面
    releaseYear?: number;   // 发行年份

    directVideoId?: bigint; // 关联到可直接跳转的 videoId

    items: Array<IVideoItem>; // 合集内容

    relatedCollections?: bigint[]; // 推荐合集ID
}

// 视频项
interface IVideoItem {
    type: 'movie' | 'season' | 'clip';
    id: bigint;
    sortOrder: number;
    title?: string;
}

// 视频资源单元
interface IVideo {
    id: bigint;              // 全局唯一视频id
    title: string;           // 主标题
    originalTitle?: string;  // 原标题
    description: string;     // 描述
    coverImage: string;      // 封面图URL
    type: 'movie' | 'episode' | 'clip'; // 具体资源类型： 电影，剧集的一集，剪辑
    releaseDate?: string;    // 发布日期
    duration: number;        // 时长(秒)

    // 元数据
    rating?: number;         // 评分
    genres?: string[];       // 分类标签
    cast?: string[];         // 演员阵容
    directors?: string[];    // 导演
    tags?: string[];         // 标签

    // 关系型字段
    collectionId?: bigint;   // movie clip -> collectionId

    seasonId?: bigint;       // episode -> seasonId
    episodeNumber?: number;  // 集号 (剧集专属)
    seasonNumber?: number;   // 季号 (剧集专属)
}

// 季结构
interface ISeason {
    id: bigint;             // 季ID
    collectionId: bigint;   // 所属合集ID
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
    id: bigint;             // 剧集ID
    seasonId: bigint;       // 所属季ID
    episodeNumber: number;  // 集号
    title: string;          // 集标题
    duration: number;       // 时长(秒)
    thumbnail?: string;     // 剧集缩略图
    plot?: string;          // 本集剧情简介
}

// 播放源结构
interface IPlaybackSource {
    videoId: bigint;        // 关联的视频ID
    sources: IVideoSource[];
}

// 视频源
interface IVideoSource {
    src: string;            // 资源地址
    type: 'mp4' | 'hls' | 'dash';
    resolution: string;     // 分辨率
    bitrate?: number;       // 码率 (kbps)
}

interface IVideoSet {
    collections: ICollection[];
    seasons: ISeason[];
    videos: IVideo[];
    playbackSources: IPlaybackSource[];
}

export type {
    ICollection,
    IEpisode,
    IPlaybackSource,
    IVideo,
    IVideoSource,
    ISeason,
    IVideoItem,
    IVideoSet
}