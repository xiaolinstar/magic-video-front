interface PopularVideo {
  id: number;
  title: string;
  description: string;
  avatar: string;
  views: number;      // 观看次数
  likes: number;      // 点赞数
  comments: number;   // 评论数
  publishDate: string; // 发布日期
}

export const mockPopularVideos: PopularVideo[] = [
  {
    id: 1,
    title: '疯狂麦克斯：狂暴女神',
    description: '安雅·泰勒-乔伊主演的后启示录动作大片，热度持续攀升',
    avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg',
    views: 1250000,
    likes: 98000,
    comments: 12500,
    publishDate: '2023-05-15'
  },
  {
    id: 2,
    title: '性爱自修室：第四季',
    description: 'Netflix爆款青春剧，本周热度第一',
    avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/Otis%26Ruby.jpg',
    views: 2340000,
    likes: 156000,
    comments: 34500,
    publishDate: '2023-06-22'
  },
  {
    id: 3,
    title: '王国：血泪',
    description: '韩国丧尸史诗巨制，本月最热韩剧',
    avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/kindom.jpg',
    views: 1890000,
    likes: 134000,
    comments: 28700,
    publishDate: '2023-04-10'
  },
  {
    id: 4,
    title: '阳光普照',
    description: '金马奖最佳影片，许光汉突破性演出引发热议',
    avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/xuguanghan.jpg',
    views: 980000,
    likes: 87000,
    comments: 15600,
    publishDate: '2023-03-05'
  },
  {
    id: 5,
    title: '黑镜：第六季',
    description: '科技讽刺剧回归，热度不减当年',
    avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg',
    views: 1760000,
    likes: 112000,
    comments: 31200,
    publishDate: '2023-07-01'
  },
  {
    id: 6,
    title: '奥本海默',
    description: '诺兰新作，原子弹之父的道德挣扎',
    avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/Otis%26Ruby.jpg',
    views: 2120000,
    likes: 178000,
    comments: 42300,
    publishDate: '2023-07-20'
  }
];