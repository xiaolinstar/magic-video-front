import type { IVideo } from '@/common/types/video';

// 阿里云 OSS 资源设置了 CROS，允许跨域访问
export const mockResources :IVideo[] = [
    {
      id: 112342,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Crazy-Max/Md5-Crazy-Max.mpd',
      name: '疯狂的麦克斯：狂暴女神',
      title: '疯狂的麦克斯：狂暴女神',
      description: '影片讲述了复仇女神弗瑞奥萨（安雅·泰勒-乔伊 Anya Taylor-Joy 饰）惊心动魄的成长史。年轻的弗瑞奥萨从原本的家园被掠走，落入军阀狄门特斯（克里斯·海姆斯沃斯 Chris Hemsworth 饰）leader的帮派手中，在穿过荒原时，他们来到不死老乔（拉黑·休姆 Lachy H ulme 饰）所掌管的堡垒。在两位暴君争夺统治地位的同时，弗瑞奥萨必须在重重考验中活下来，并想方设法寻找回家的路；她们也逐渐成长为利落酷飒的狂暴女神。',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg',
      type: 'movie',
      relatedMovies: [43432, 43432, 43432],
    },
    {
      id: 2212314,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Otis-Ruby/Md5-Otis-Ruby.mpd',
      name: '性爱自修室 Otis & Ruby',
      title: 'Sex Education: Otis & Ruby',
      description: '超级好看！虽然各种性贯穿全片，但又是特别的纯情走心，甚至很多地方号称浪漫。校霸欺负gay，围观的直男说：算了吧，恐同是2008年的流行了。有趣流畅说不教，真实冷静不偏激，内容完全对得起"性教育"的这个片名',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/Otis%26Ruby.jpg',
      type: 'tvshow',
      episodes: [
        { season: 1, episode: 1, title: '第一集', duration: '52分钟' },
        { season: 1, episode: 2, title: '第二集', duration: '48分钟' },
        { season: 1, episode: 3, title: '第三集', duration: '55分钟' },
        { season: 1, episode: 4, title: '第四集', duration: '50分钟' }
      ]
    },
    {
      id: 3132,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/kingdom/kingdom.mpd',
      name: '王国 第一季',
      title: '王国：血泪',
      description: '日暮黄昏，妖氛弥漫。昏暗的朝鲜王宫深处，老国王行踪鬼魅，举止若兽。一时间杀气弥漫，朝野上下谣言四起。而在这一切背后，议政府领议政赵学洙（柳承龙 饰）及其女儿——王的继妃赵氏（金慧埈 饰）却在暗暗窥视，图谋不轨。自然而然，质疑父王生死的世子李苍（朱智勋 饰）便成为赵学洙一党急于除去的眼中钉。遭到构陷的李苍被迫和得力手下武英（金尚浩 饰）出逃，在投奔老师的途中，邂逅了名叫舒非的医女（裴斗娜 饰）。从舒非口中，世子得知一种能令死者复活的神秘草药的存在。',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/kindom.jpg',
      type: 'tvshow',
      episodes: [
        { season: 1, episode: 1, title: '第一集', duration: '50分钟' },
        { season: 1, episode: 2, title: '第二集', duration: '45分钟' },
        { season: 1, episode: 3, title: '第三集', duration: '52分钟' }
      ],
    },
    {
      id: 43432,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/sunshine/sunshine.mpd',
      name: '阳光普照',
      title: '阳光普照',
      description: '黄雨萱永远记得，当王诠胜第一次跟他告白，跟他说他喜欢她，要她当他女朋友的时候，黄雨萱反问了他一个问题，为什么他会喜欢她，那时的王诠胜，就只是带着一切该是如此的确定性微笑，回答她了一句"因为打从我第一眼看到你的时候，我就知道，我喜欢你…"',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/xuguanghan.jpg',
      type: 'movie',
      relatedMovies: [112342, 632412],
    },
    {
      id: 151234123,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/alice/alice.mpd',
      name: '弥留之国的爱丽丝 第一季',
      title: '弥留之国的爱丽丝 第一季',
      description: '有栖良平（山崎贤人 饰）拥有一位非常优秀的哥哥，在哥哥的衬托之下，毫无建树的他显得更加的废柴。好在良平有势川张太（森永悠希 饰）和苅部大吉（町田启太饰）两位好友，每当良平感到在家中没有容身之地的时候，张太和苅部都会陪伴在他的身边。',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/last-guys.jpg',
      type: 'tvshow',
      episodes: [
        { season: 1, episode: 1, title: '第一集', duration: '48分钟' },
        { season: 1, episode: 2, title: '第二集', duration: '50分钟' }
      ],
    },
    {
      id: 632412,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/sweet-home/sweet-home.mpd',
      name: '甜蜜家园',
      title: '甜蜜家园',
      description: '充满绝望的世界和毫无留恋的少年， 甩开现实恐慌只能正面迎击！',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/sweet-home.jpg',
      type: 'tvshow',
      episodes: [
        { season: 1, episode: 1, title: '第一集', duration: '55分钟' },
        { season: 1, episode: 2, title: '第二集', duration: '52分钟' },
        { season: 1, episode: 3, title: '第三集', duration: '50分钟' },
        { season: 1, episode: 4, title: '第四集', duration: '48分钟' }
      ],
    }
];
