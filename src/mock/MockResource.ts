import type {
  ICollection,
  IVideo,
  ISeason,
  IPlaybackSource,
  IVideoDetails,
} from '@/common/types/video';

// 视频资源数据
export const mockVideos: IVideo[] = [
  // 电影资源
  {
    id: 10011,
    title: '疯狂的麦克斯：狂暴之路',
    description: '待补充...',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg',
    type: 'movie',
    duration: 8400, // 140分钟
    releaseDate: '2015-01-01',
    genres: ['动作', '科幻', '冒险'],
    rating: 8.5,
    collectionId: 1001
  },
  {
    id: 10012,
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
    id: 10021,
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
    id: 10031,
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
    id: 10041,
    title: '性爱自修室',
    description: '欧提思（阿萨·巴特菲尔德 Asa Butterfield 饰）是一位非常平凡的高中生，他既没有特别聪明，也没有特别英俊，要说他和同龄人唯一的不同，那就是他拥有一位研究性心理学的母亲简（吉莲·安德森 Gillian Anderson 饰）。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/Otis%26Ruby.jpg',
    type: 'clip',
    duration: 3120, // 52分钟
    seasonNumber: 1,
    episodeNumber: 1,
    collectionId: 2001
  },
  {
    id: 10042,
    title: 'Sex Education: Otis & Ruby',
    description: '欧提思（阿萨·巴特菲尔德 Asa Butterfield 饰）是一位非常平凡的高中生，他既没有特别聪明，也没有特别英俊，要说他和同龄人唯一的不同，那就是他拥有一位研究性心理学的母亲简（吉莲·安德森 Gillian Anderson 饰）。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/Otis%26Ruby.jpg',
    type: 'clip',
    duration: 3120, // 52分钟
    collectionId: 2001
  },
  // 寂静之海剧集
  {
    id: 100501,
    title: '寂静之海 第1集',
    description: '在未来，地球资源枯竭，人类面临生存危机。韩国政府决定重启“寂静之海”计划，派遣一支精英团队前往月球上废弃的赫密斯基地。团队成员包括队长韩太锡（郑雨盛饰）、生物学家宋智安（韩孝周饰）、工程师尹泰宇（李准饰）等。他们乘坐宇宙飞船抵达月球，发现基地已被废弃多年，但内部设施仍然完好。团队的主要任务是回收一种名为“露西”的神秘植物样本，这种植物被认为能在地球上种植并解决粮食危机。然而，基地内隐藏着许多未知的危险，团队成员们很快意识到他们的任务并不简单。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    type: 'episode',
    duration: 3600, // 60分钟
    seasonNumber: 1,
    episodeNumber: 1,
    collectionId: 1005
  },
  {
    id: 100502,
    title: '寂静之海 第2集',
    description: '团队在赫密斯基地展开调查，发现基地内部异常安静，仿佛隐藏着某种秘密。在探索过程中，他们接收到一段神秘的信号，内容是一段模糊的录音，似乎来自多年前的基地人员。录音中提到“不要打开那个门”，这让团队成员感到困惑和不安。与此同时，基地的电力系统出现故障，导致部分区域停电，团队不得不依靠备用电源维持生存。在修复电力系统的过程中，宋智安发现“露西”植物的生长环境异常，似乎受到了某种未知因素的影响。团队成员之间的信任开始出现裂痕，每个人都在猜测基地中到底隐藏着什么。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    type: 'episode',
    duration: 3480, // 58分钟
    seasonNumber: 1,
    episodeNumber: 2,
    collectionId: 1005
  },
  {
    id: 100503,
    title: '寂静之海 第3集',
    description: '团队继续深入基地，发现了一个被封锁的区域。在强行进入后，他们目睹了一些令人毛骨悚然的场景：多年前的基地人员尸体被发现，且尸体的状态异常，似乎经历了某种变异。队长韩太锡决定继续执行任务，但团队成员们已经意识到事情远比他们想象的复杂。在一次意外中，尹泰宇发现了一个隐藏的实验室，里面存放着大量关于“露西”植物的实验记录，以及一种名为“月球病毒”的研究资料。这种病毒似乎与基地人员的死亡和变异有关。团队成员们开始怀疑，他们所执行的任务背后可能隐藏着更大的阴谋。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    type: 'episode',
    duration: 3480, // 58分钟
    seasonNumber: 1,
    episodeNumber: 3,
    collectionId: 1005
  },
  {
    id: 100504,
    title: '寂静之海 第4集',
    description: '随着调查的深入，团队成员们发现“月球病毒”已经泄露，基地内开始出现变异生物。这些生物具有极强的攻击性，团队成员们不得不与之展开生死搏斗。在混乱中，宋智安被病毒感染，她的身体开始出现变异迹象。韩太锡和其他成员试图控制局势，但病毒的传播速度远超他们的预期。基地内的氧气供应也开始出现问题，团队成员们面临着双重危机。在生死关头，韩太锡决定牺牲部分成员，以确保“露西”植物样本能够被带回地球。然而，宋智安的变异情况越来越严重，她的记忆开始模糊，甚至开始攻击其他成员。团队成员们陷入了绝望，他们不知道自己能否活着离开月球。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    type: 'episode',
    duration: 3480, // 58分钟
    seasonNumber: 1,
    episodeNumber: 4,
    collectionId: 1005
  },
  {
    id: 100505,
    title: '寂静之海 第5集',
    description: '所有人都被带到数据库，E1带人发现了一个地图上没有的仓库，里面长满了绿色植物和树木。队员们在仓库中发现了大量月水胶囊。韩允才安排大家回收样本，但E1和金山等人在检查时遭遇了一个白衣服长发女子的攻击，E1的手腕被折断，样本胶囊被女子夺走。宋智安发现女子留下的样本胶囊，提醒大家赶快离开。众人分析，这个女子像是一个孩子，似乎在保护月水。韩允才与地球的崔局长联系后，得知必须杀死入侵者。宋智安建议去数据库查看数据，韩允才同意并安排她与洪医生一起行动。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    type: 'episode',
    duration: 3480, // 58分钟
    seasonNumber: 1,
    episodeNumber: 5,
    collectionId: 1005
  },
  {
    id: 100506,
    title: '寂静之海 第6集',
    description: 'E2、柳泰锡和样本都不见了。宋智安在入侵者身上看到一个熟悉的名字后，跟踪她到通风口一探究竟。与此同时，队员们发现E2被撞倒在地，晕了过去。众人分析入侵者是一个孩子，似乎在保护月水。韩允才准备和其他人去找这个孩子，宋智安则建议去数据库查看数据。韩允才要求宋智安和洪医生一起行动。在医务室，E2被抢救需要输血，众人发现有人是O型血，可以为B型血的E2输血。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    type: 'episode',
    duration: 3480, // 58分钟
    seasonNumber: 1,
    episodeNumber: 6,
    collectionId: 1005
  },
  {
    id: 100507,
    title: '寂静之海 第7集',
    description: '宋智安在行李箱里发现了一个硬盘，里面记录了姐姐宋远璟在基地的生活和工作，以及关于月水实验的视频。她看到姐姐在渤海基地对活人进行月水实验，最终只有露娜适应并活了下来。宋智安将月水注入露娜体内，露娜的伤势立刻恢复。与此同时，其他人发现了实验留下的遗存物。洪医生在基地中迷路，最终来到一个仓库，里面堆满了露娜的尸体。韩允才出现，两人回到控制室，发现金山已经死亡，柳泰锡则准备开启空气净化系统。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    type: 'episode',
    duration: 3410, // 58分钟
    seasonNumber: 1,
    episodeNumber: 7,
    collectionId: 1005
  },
  {
    id: 100508,
    title: '寂静之海 第8集',
    description: '基地的局势愈发危急，队员们与时间赛跑，试图完成任务并生存下去。韩允才和队员们在基地中寻找入侵者，发现她似乎一直在引诱他们。宋智安试图用月水安抚入侵者，最终发现入侵者其实是崔局长认识的小女孩，她一直在保护月水。队员们在基地中发现了更多关于月水实验的秘密，同时也意识到任务背后隐藏着更大的阴谋。最终，基地被摧毁，幸存的队员们面临着艰难的选择，决定这次任务以及他们自己的命运。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    type: 'episode',
    duration: 3410, // 58分钟
    seasonNumber: 1,
    episodeNumber: 8,
    collectionId: 1005
  },
  // 甜蜜家园剧集
  {
    id: 100601,
    title: '甜蜜家园 第1集',
    description: '车贤秀是一个自闭的高中生，在父母去世后搬到了一栋破旧的公寓楼。突然间，人类开始变异成怪物。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/sweet-home.jpg',
    type: 'episode',
    duration: 3300, // 55分钟
    seasonNumber: 1,
    episodeNumber: 1,
    collectionId: 1006
  },
  {
    id: 100602,
    title: '甜蜜家园 第2集',
    description: '公寓楼的居民们开始意识到外面的世界已经变得危险，他们必须团结起来生存。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/sweet-home.jpg',
    type: 'episode',
    duration: 3180, // 53分钟
    seasonNumber: 1,
    episodeNumber: 2,
    collectionId: 1006
  },
  // 王国剧集
  {
    id: 100701,
    title: '王国 第1集',
    description: '日暮黄昏，妖氛弥漫。昏暗的朝鲜王宫深处，老国王行踪鬼魅，举止若兽。世子李苍开始调查父王的异常。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/kindom.jpg',
    type: 'episode',
    duration: 3420, // 57分钟
    seasonNumber: 1,
    episodeNumber: 1,
    collectionId: 1007
  },
  {
    id: 100702,
    title: '王国 第2集',
    description: '李苍和武英逃出王宫，在寻找真相的路上遇到了医女舒非，得知了神秘草药的存在。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/kindom.jpg',
    type: 'episode',
    duration: 3240, // 54分钟
    seasonNumber: 1,
    episodeNumber: 2,
    collectionId: 1007
  },
  // 弥留之国的爱丽丝剧集
  {
    id: 100801,
    title: '弥留之国的爱丽丝 第1集',
    description: '有栖良平（山崎贤人 饰）拥有一位非常优秀的哥哥，在哥哥的衬托之下，毫无建树的他显得更加的废柴。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/alice-poke.jpg',
    type: 'episode',
    duration: 3000, // 50分钟
    seasonNumber: 1,
    episodeNumber: 1,
    collectionId: 1008
  },
  {
    id: 100802,
    title: '弥留之国的爱丽丝 第2集',
    description: '良平和朋友们发现自己被困在一个神秘的平行世界中，必须参加各种死亡游戏才能生存。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/alice-poke.jpg',
    type: 'episode',
    duration: 2940, // 49分钟
    seasonNumber: 1,
    episodeNumber: 2,
    collectionId: 1008
  }
];

// 合集数据
export const mockCollections: ICollection[] = [
  {
    id: 1001,
    title: '疯狂的麦克斯系列电影',
    type: 'movie-series',
    description: '澳大利亚一系列未来动作冒险、末日幻想电影。',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg',
    releaseYear: 2015,
    items: [
      { type: 'movie', id: 10011, sortOrder: 1, title: '狂暴之路' },
      { type: 'movie', id: 10012, sortOrder: 2, title: '狂暴女神' }
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
      { type: 'movie', id: 10021, sortOrder: 1, title: '阳光普照' }
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
      { type: 'movie', id: 10031, sortOrder: 1, title: '动物世界' }
    ]
  },
  {
    id: 1004,
    title: '性爱自修室',
    type: 'tv-series',
    description: '英国青春喜剧剧集，探讨青少年性教育话题',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/Otis%26Ruby.jpg',
    releaseYear: 2019,
    items: [
      { type: 'clip', id: 10041, sortOrder: 1, title: 'Otis & Ruby 剧集最佳 CP 混剪' }
    ]
  },
  {
    id: 1005,
    title: '寂静之海',
    type: 'tv-series',
    description: '韩国科幻惊悚剧集，讲述2075年地球水资源危机背景下的月球探险故事',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/SeaLuna.jpg',
    releaseYear: 2021,
    items: [
      { type: 'season', id: 10051, sortOrder: 1, title: '寂静之海 第一季' }
    ]
  },
  {
    id: 1006,
    title: '甜蜜家园',
    type: 'tv-series',
    description: '待补充...',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/sweet-home.jpg',
    releaseYear: 2020,
    items: [
      { type: 'season', id: 10061, sortOrder: 1, title: '第一季' }
    ]
  },
  {
    id: 1007,
    title: '王国',
    type: 'tv-series',
    description: '韩国古装丧尸惊悚剧集，以朝鲜王朝为背景',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/kindom.jpg',
    releaseYear: 2019,
    items: [
      { type: 'season', id: 50011, sortOrder: 1, title: '第一季' },
      { type: 'season', id: 50012, sortOrder: 2, title: '第二季' },
      { type: 'movie', id: 500101, sortOrder: 3, title: '北方的阿信'}
    ]
  },
  {
    id: 1008,
    title: '弥留之国的爱丽丝',
    type: 'tv-series',
    description: '日本科幻悬疑剧集，改编自同名漫画',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/alice-poke.jpg',
    releaseYear: 2020,
    items: [
      { type: 'season', id: 10081, sortOrder: 1, title: '第一季' }
    ]
  }
];


// 季数据
export const mockSeasons: ISeason[] = [
  {
    id: 10051,
    collectionId: 1005,
    seasonNumber: 1,
    title: '寂静之海 第1季',
    description: '月球基地的神秘事件调查',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/silent-sea.jpg',
    releaseDate: '2021-12-24',
    episodes: [
      {
        id: 100501,
        seasonId: 10051,
        episodeNumber: 1,
        title: '第一集',
        duration: 3600, // 60分钟
        plot: '2075年，地球陷入严重的水资源危机'
      },
      {
        id: 100502,
        seasonId: 10051,
        episodeNumber: 2,
        title: '第二集',
        duration: 3480, // 58分钟
        plot: '团队抵达月球基地，发现基地内发生了不明原因的事故'
      },
      {
        id: 100503,
        seasonId: 10051,
        episodeNumber: 3,
        title: '第三集',
        duration: 3480, // 58分钟
        plot: '团队抵达月球基地，进行调查'
      },
      {
        id: 100504,
        seasonId: 10051,
        episodeNumber: 4,
        title: '第四集',
        duration: 3458, 
        plot: '团队抵达月球基地，进行调查'
      },
      {
        id: 100505,
        seasonId: 10051,
        episodeNumber: 5,
        title: '第五集',
        duration: 3458,
        plot: '团队抵达月球基地，进行调查'
      },
      {
        id: 100506,
        seasonId: 10051,
        episodeNumber: 6,
        title: '第六集',
        duration: 3458,
        plot: '团队抵达月球基地，进行调查'
      },
      {
        id: 100507,
        seasonId: 10051,
        episodeNumber: 7,
        title: '第七集',
        duration: 3458,
        plot: '团队抵达月球基地，进行调查'
      },
      {
        id: 100508,
        seasonId: 10051,
        episodeNumber: 8,
        title: '第八集',
        duration: 3458,
        plot: '团队抵达月球基地，进行调查'
      }
    ]
  },
  {
    id: 10061,
    collectionId: 1006,
    seasonNumber: 1,
    title: '甜蜜家园 第一季',
    description: '公寓楼内的生存之战',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/sweet-home.jpg',
    releaseDate: '2020-12-18',
    episodes: [
      {
        id: 100601,
        seasonId: 10061,
        episodeNumber: 1,
        title: '第一集',
        duration: 3300, // 55分钟
        plot: '车贤秀搬到破旧公寓楼，人类开始变异成怪物'
      },
      {
        id: 100602,
        seasonId: 10061,
        episodeNumber: 2,
        title: '第二集',
        duration: 3180, // 53分钟
        plot: '公寓楼的居民们开始意识到外面的世界已经变得危险'
      }
    ]
  },
  {
    id: 10071,
    collectionId: 1007,
    seasonNumber: 1,
    title: '第一季',
    description: '朝鲜王朝的丧尸危机',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/kindom.jpg',
    releaseDate: '2019-01-25',
    episodes: [
      {
        id: 100701,
        seasonId: 10071,
        episodeNumber: 1,
        title: '第一集',
        duration: 3420, // 57分钟
        plot: '世子李苍开始调查父王的异常行为'
      },
      {
        id: 100702,
        seasonId: 10071,
        episodeNumber: 2,
        title: '第二集',
        duration: 3240, // 54分钟
        plot: '李苍和武英逃出王宫，遇到了医女舒非'
      }
    ]
  },
  {
    id: 10081,
    collectionId: 1008,
    seasonNumber: 1,
    title: '第一季',
    description: '弥留之国的生存游戏',
    coverImage: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/last-guys.jpg',
    releaseDate: '2020-12-10',
    episodes: [
      {
        id: 100801,
        seasonId: 10081,
        episodeNumber: 1,
        title: '第一集',
        duration: 3000, // 50分钟
        plot: '有栖良平和朋友们被困在神秘的平行世界中'
      },
      {
        id: 100802,
        seasonId: 10081,
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
    videoId: 10011,
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
    videoId: 10041,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Otis-Ruby/Md5-Otis-Ruby.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 5000
      }
    ]
  },
  {
    videoId: 10042,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Otis-Ruby/Md5-Otis-Ruby.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4600
      }
    ]
  },
  {
    videoId: 100501,
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
    videoId: 100502,
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
    videoId: 100503,
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
    videoId: 100504,
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
    videoId: 100505,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/TheSilentSea/05/main.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4400
      }
    ]
  },
  {
    videoId: 100506,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/TheSilentSea/06/main.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4400
      }
    ]
  },
  {
    videoId: 100507,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/TheSilentSea/07/main.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4400
      }
    ]
  },
  {
    videoId: 100508,
    sources: [
      {
        src: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/TheSilentSea/08/main.mpd',
        type: 'dash',
        resolution: '1080p',
        bitrate: 4400
      }
    ]
  },
  {
    videoId: 100801,
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


export const mockVideoDetails: IVideoDetails = {
  collections: mockCollections,
  seasons: mockSeasons,
  videos: mockVideos,
  playbackSources: mockPlaybackSources
}
