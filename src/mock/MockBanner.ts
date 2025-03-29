export interface IBanner {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const mockBanners: IBanner[] = [
  { 
    id: 1, 
    title: '疯狂麦克斯：狂暴女神', 
    description: '安雅·泰勒-乔伊主演的后启示录动作大片', 
    image: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg'
  },
  { 
    id: 2, 
    title: '性爱自修室', 
    description: 'Netflix热门青春剧，Otis与Ruby的故事', 
    image: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/Otis%26Ruby.jpg'
  },
  {
    id: 3,
    title: '王国',
    description: '尸战朝鲜',
    image: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/kindom.jpg'
  },
  {
    id: 4,
    title: '阳光普照',
    description: '亲情大片，许光汉白衣少年',
    image: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/xuguanghan.jpg',
  },
  {
    id: 5,
    title: '最后生还者',
    description: '当遇到世界末日，两个男人仍然有最美好的爱情',
    image: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/last-guys.jpg',
  },
  {
    id: 6,
    title: '甜蜜家园',
    description: '你们不要再打了',
    image: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/sweet-home.jpg',
  }
];
