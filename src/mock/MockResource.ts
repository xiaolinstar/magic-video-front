import type { ICollection, IVideoResource, ISeason, IPlaybackSource } from '@/common/types/video';

// 视频资源数据
export const mockVideoResources: IVideoResource[] = [
  // 电影资源
  {
    id: 112342,
    title: '疯狂的麦克斯：狂暴女神',
    description: '影片讲述了复仇女神弗瑞奥萨（安雅·泰勒-乔伊 Anya Taylor-Joy 饰）惊心动魄的成长史。年轻的弗瑞奥萨从原本的家园被掠走，落入军阀狄门特斯（克里斯·海姆斯沃斯 Chris Hemsworth 饰）leader的帮派手中，在穿过荒原时，他们来到不死老乔（拉黑·休姆 Lachy Hulme 饰）所掌管的堡垒。在两位暴君争夺统治地位的同时，弗瑞奥萨必须在重重考验中活下来，并想方设法寻找回家的路；他也逐渐成长为利落酷飒的狂暴女神。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg',
    type: 'movie',
    duration: 8400, // 140分钟
    releaseDate: '2024-05-24',
    genres: ['动作', '科幻', '冒险'],
    rating: 8.5,
    collectionId: 1001
  },
  {
    id: 43432,
    title: '阳光普照',
    description: '黄雨萱永远记得，当王诠胜第一次跟他告白，跟他说他喜欢他，要他当他女朋友的时候，黄雨萱反问了他一个问题，为什么他会喜欢他，那时的王诠胜，就只是带着一切该是如此的确定性微笑，回答他了一句"因为打从我第一眼看到你的时候，我就知道，我喜欢你…"',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/xuguanghan.jpg',
    type: 'movie',
    duration: 9600, // 160分钟
    releaseDate: '2019-11-01',
    genres: ['剧情', '家庭'],
    rating: 8.9,
    collectionId: 1002
  },
  {
    id: 151234233,
    title: '动物世界',
    description: '在游戏机厅做着兼职"小丑"的郑开司（李易峰 饰），因为朋友的背叛而背负上数百万的债务，面临牢狱之灾的他被迫登上了一艘名为"命运号"的神秘游轮，参加一场以游戏为幌子的死亡竞赛。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/animalworld.jpg',
    type: 'movie',
    duration: 7200, // 120分钟
    releaseDate: '2018-06-29',
    genres: ['剧情', '悬疑', '冒险'],
    rating: 7.2,
    collectionId: 1003
  },
  // 剧集资源 - 性爱自修室
  {
    id: 200111,
    title: 'Sex Education: Otis & Ruby',
    description: '欧提思（阿萨·巴特菲尔德 Asa Butterfield 饰）是一位非常平凡的高中生，他既没有特别聪明，也没有特别英俊，要说他和同龄人唯一的不同，那就是他拥有一位研究性心理学的母亲简（吉莲·安德森 Gillian Anderson 饰）。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/Otis%26Ruby.jpg',
    type: 'episode',
    duration: 3120, // 52分钟
    seasonNumber: 1,
    episodeNumber: 1,
    collectionId: 2001
  },
  {
    id: 200112,
    title: 'Sex Education: Otis & Ruby',
    description: '欧提思（阿萨·巴特菲尔德 Asa Butterfield 饰）是一位非常平凡的高中生，他既没有特别聪明，也没有特别英俊，要说他和同龄人唯一的不同，那就是他拥有一位研究性心理学的母亲简（吉莲·安德森 Gillian Anderson 饰）。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/Otis%26Ruby.jpg',
    type: 'episode',
    duration: 3120, // 52分钟
    seasonNumber: 1,
    episodeNumber: 2,
    collectionId: 2001
  },
  // 寂静之海剧集
  {
    id: 300111,
    title: '寂静之海 第1集',
    description: '2075年，地球陷入严重的水资源危机。月球研究基地发现了神秘的样本，韩国航天局决定派遣精英团队前往月球调查。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    type: 'episode',
    duration: 3600, // 60分钟
    seasonNumber: 1,
    episodeNumber: 1,
    collectionId: 3001
  },
  {
    id: 300112,
    title: '寂静之海 第2集',
    description: '团队抵达月球基地，发现基地内发生了不明原因的事故，所有研究人员都已死亡。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    type: 'episode',
    duration: 3480, // 58分钟
    seasonNumber: 1,
    episodeNumber: 2,
    collectionId: 3001
  },
  {
    id: 300113,
    title: '寂静之海 第3集',
    description: '团队抵达月球基地，发现基地内发生了不明原因的事故，所有研究人员都已死亡。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    type: 'episode',
    duration: 3480, // 58分钟
    seasonNumber: 1,
    episodeNumber: 3,
    collectionId: 3001
  },
  {
    id: 300114,
    title: '寂静之海 第4集',
    description: '团队抵达月球基地，发现基地内发生了不明原因的事故，所有研究人员都已死亡。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    type: 'episode',
    duration: 3480, // 58分钟
    seasonNumber: 1,
    episodeNumber: 4,
    collectionId: 3001
  },
  // 甜蜜家园剧集
  {
    id: 4001001,
    title: '甜蜜家园 第1集',
    description: '车贤秀是一个自闭的高中生，在父母去世后搬到了一栋破旧的公寓楼。突然间，人类开始变异成怪物。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/sweet-home.jpg',
    type: 'episode',
    duration: 3300, // 55分钟
    seasonNumber: 1,
    episodeNumber: 1,
    collectionId: 4001
  },
  {
    id: 4001002,
    title: '甜蜜家园 第2集',
    description: '公寓楼的居民们开始意识到外面的世界已经变得危险，他们必须团结起来生存。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/sweet-home.jpg',
    type: 'episode',
    duration: 3180, // 53分钟
    seasonNumber: 1,
    episodeNumber: 2,
    collectionId: 4001
  },
  // 王国剧集
  {
    id: 5001001,
    title: '王国 第1集',
    description: '日暮黄昏，妖氛弥漫。昏暗的朝鲜王宫深处，老国王行踪鬼魅，举止若兽。世子李苍开始调查父王的异常。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/kindom.jpg',
    type: 'episode',
    duration: 3420, // 57分钟
    seasonNumber: 1,
    episodeNumber: 1,
    collectionId: 5001
  },
  {
    id: 5001002,
    title: '王国 第2集',
    description: '李苍和武英逃出王宫，在寻找真相的路上遇到了医女舒非，得知了神秘草药的存在。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/kindom.jpg',
    type: 'episode',
    duration: 3240, // 54分钟
    seasonNumber: 1,
    episodeNumber: 2,
    collectionId: 5001
  },
  // 弥留之国的爱丽丝剧集
  {
    id: 600111,
    title: '弥留之国的爱丽丝 第1集',
    description: '有栖良平（山崎贤人 饰）拥有一位非常优秀的哥哥，在哥哥的衬托之下，毫无建树的他显得更加的废柴。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/alice-poke.jpg',
    type: 'episode',
    duration: 3000, // 50分钟
    seasonNumber: 1,
    episodeNumber: 1,
    collectionId: 6001
  },
  {
    id: 600112,
    title: '弥留之国的爱丽丝 第2集',
    description: '良平和朋友们发现自己被困在一个神秘的平行世界中，必须参加各种死亡游戏才能生存。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/alice-poke.jpg',
    type: 'episode',
    duration: 2940, // 49分钟
    seasonNumber: 1,
    episodeNumber: 2,
    collectionId: 6001
  }
];

// 合集数据
export const mockCollections: ICollection[] = [
  {
    id: 1001,
    title: '疯狂的麦克斯系列',
    type: 'movie-series',
    description: '末日废土背景下的动作冒险系列电影',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg',
    releaseYear: 2015,
    items: [
      { type: 'movie', movieId: 112342, order: 1, title: '狂暴女神' }
    ],
    relatedCollections: [1002, 1003]
  },
  {
    id: 1002,
    title: '阳光普照',
    type: 'movie-series',
    description: '台湾家庭剧情片',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/xuguanghan.jpg',
    releaseYear: 2019,
    items: [
      { type: 'movie', movieId: 43432, order: 1, title: '阳光普照' }
    ]
  },
  {
    id: 1003,
    title: '动物世界',
    type: 'movie-series',
    description: '悬疑冒险电影',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/animalworld.jpg',
    releaseYear: 2018,
    items: [
      { type: 'movie', movieId: 151234233, order: 1, title: '动物世界' }
    ]
  },
  {
    id: 2001,
    title: '性爱自修室',
    type: 'tv-series',
    description: '英国青春喜剧剧集，探讨青少年性教育话题',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/Otis%26Ruby.jpg',
    releaseYear: 2019,
    items: [
      { type: 'season', seasonId: 20011, order: 1, title: '第一季' }
    ]
  },
  {
    id: 3001,
    title: '寂静之海',
    type: 'tv-series',
    description: '韩国科幻惊悚剧集，讲述2075年地球水资源危机背景下的月球探险故事',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    releaseYear: 2021,
    items: [
      { type: 'season', seasonId: 30011, order: 1, title: '第一季' }
    ]
  },
  {
    id: 4001,
    title: '甜蜜家园',
    type: 'tv-series',
    description: '韩国末日生存惊悚剧集，改编自同名网络漫画',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/sweet-home.jpg',
    releaseYear: 2020,
    items: [
      { type: 'season', seasonId: 40011, order: 1, title: '第一季' }
    ]
  },
  {
    id: 5001,
    title: '王国',
    type: 'tv-series',
    description: '韩国古装丧尸惊悚剧集，以朝鲜王朝为背景',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/kindom.jpg',
    releaseYear: 2019,
    items: [
      { type: 'season', seasonId: 50011, order: 1, title: '第一季' },
      { type: 'season', seasonId: 50012, order: 2, title: '第二季' }
    ]
  },
  {
    id: 6001,
    title: '弥留之国的爱丽丝',
    type: 'tv-series',
    description: '日本科幻悬疑剧集，改编自同名漫画',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/alice-poke.jpg',
    releaseYear: 2020,
    items: [
      { type: 'season', seasonId: 60011, order: 1, title: '第一季' }
    ]
  }
];

// 季数据
export const mockSeasons: ISeason[] = [
  {
    id: 20011,
    collectionId: 2001,
    seasonNumber: 1,
    title: '第一季',
    description: '奥蒂斯的性教育咨询之路开始',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/Otis%26Ruby.jpg',
    releaseDate: '2019-01-11',
    episodes: [
      {
        id: 200111,
        seasonId: 20011,
        episodeNumber: 1,
        title: '第一集',
        duration: 3120, // 52分钟
        plot: '奥蒂斯开始提供性教育咨询服务'
      },
      {
        id: 200112,
        seasonId: 20011,
        episodeNumber: 2,
        title: '第二集',
        duration: 2880, // 48分钟
        plot: '学校里的性教育问题愈发复杂'
      }
    ]
  },
  {
    id: 30011,
    collectionId: 3001,
    seasonNumber: 1,
    title: '寂静之海 第一季',
    description: '月球基地的神秘事件调查',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/silent-sea.jpg',
    releaseDate: '2021-12-24',
    episodes: [
      {
        id: 300111,
        seasonId: 30011,
        episodeNumber: 1,
        title: '第一集',
        duration: 3600, // 60分钟
        plot: '2075年，地球陷入严重的水资源危机'
      },
      {
        id: 300112,
        seasonId: 30011,
        episodeNumber: 2,
        title: '第二集',
        duration: 3480, // 58分钟
        plot: '团队抵达月球基地，发现基地内发生了不明原因的事故'
      },
      {
        id: 300113,
        seasonId: 30011,
        episodeNumber: 3,
        title: '第三集',
        duration: 3480, // 58分钟
        plot: '团队抵达月球基地，进行调查'
      },
      {
        id: 300114,
        seasonId: 30011,
        episodeNumber: 4,
        title: '第四集',
        duration: 3458, 
        plot: '团队抵达月球基地，进行调查'
      }
    ]
  },
  {
    id: 40011,
    collectionId: 4001,
    seasonNumber: 1,
    title: '第一季',
    description: '公寓楼内的生存之战',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/sweet-home.jpg',
    releaseDate: '2020-12-18',
    episodes: [
      {
        id: 400111,
        seasonId: 40011,
        episodeNumber: 1,
        title: '第一集',
        duration: 3300, // 55分钟
        plot: '车贤秀搬到破旧公寓楼，人类开始变异成怪物'
      },
      {
        id: 400112,
        seasonId: 40011,
        episodeNumber: 2,
        title: '第二集',
        duration: 3180, // 53分钟
        plot: '公寓楼的居民们开始意识到外面的世界已经变得危险'
      }
    ]
  },
  {
    id: 50011,
    collectionId: 5001,
    seasonNumber: 1,
    title: '第一季',
    description: '朝鲜王朝的丧尸危机',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/kindom.jpg',
    releaseDate: '2019-01-25',
    episodes: [
      {
        id: 500111,
        seasonId: 50011,
        episodeNumber: 1,
        title: '第一集',
        duration: 3420, // 57分钟
        plot: '世子李苍开始调查父王的异常行为'
      },
      {
        id: 500112,
        seasonId: 50011,
        episodeNumber: 2,
        title: '第二集',
        duration: 3240, // 54分钟
        plot: '李苍和武英逃出王宫，遇到了医女舒非'
      }
    ]
  },
  {
    id: 60011,
    collectionId: 6001,
    seasonNumber: 1,
    title: '第一季',
    description: '弥留之国的生存游戏',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/last-guys.jpg',
    releaseDate: '2020-12-10',
    episodes: [
      {
        id: 600111,
        seasonId: 60011,
        episodeNumber: 1,
        title: '第一集',
        duration: 3000, // 50分钟
        plot: '有栖良平和朋友们被困在神秘的平行世界中'
      },
      {
        id: 600112,
        seasonId: 60011,
        episodeNumber: 2,
        title: '第二集',
        duration: 2940, // 49分钟
        plot: '必须参加各种死亡游戏才能生存'
      }
    ]
  }
];

// 播放源数据
export const mockPlaybackSources: IPlaybackSource[] = [
  {
    videoId: 112342,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Crazy-Max/Md5-Crazy-Max.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 5000
      }
    ]
  },
  {
    videoId: 151234233,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/AnimalWorld/main.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 5000
      }
    ]
  },
  {
    videoId: 200111,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Otis-Ruby/Md5-Otis-Ruby.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4500
      }
    ]
  },
  {
    videoId: 200112,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Otis-Ruby/Md5-Otis-Ruby.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4500
      }
    ]
  },
  {
    videoId: 3001001,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/TheSilentSea/01/main.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4800
      }
    ]
  },
  {
    videoId: 4001001,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/sweet-home-ep1/sweet-home-ep1.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4600
      }
    ]
  },
  {
    videoId: 5001001,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/kingdom-ep1/kingdom-ep1.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4700
      }
    ]
  },
  {
    videoId: 300111,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/TheSilentSea/01/main.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4400
      }
    ]
  },
  {
    videoId: 300112,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/TheSilentSea/02/main.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4400
      }
    ]
  },
  {
    videoId: 300113,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/TheSilentSea/03/main.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4400
      }
    ]
  },
  {
    videoId: 300114,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/TheSilentSea/04/main.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4400
      }
    ]
  },
  {
    videoId: 600111,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Alice/01/main.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4400
      }
    ]
  }
];
