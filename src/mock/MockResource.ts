interface IVideo {
  id: number;   // 资源id
  mp4: string;  // mp4资源地址
  m3u8: string; // hls资源地址
  mpd: string;  // dash资源地址
  name: string; // 资源名称
  title: string; // 资源标题
  description: string; // 资源描述
  avatar: string; // 资源封面图
}
// 阿里云 OSS 资源设置了 CROS，允许跨域访问
export const mockResources :IVideo[] = [
    {
      id: 1,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Crazy-Max/Md5-Crazy-Max.mpd',
      name: '疯狂的麦克斯：狂暴女神',
      title: '疯狂的麦克斯：狂暴女神',
      description: '影片讲述了复仇女神弗瑞奥萨（安雅·泰勒-乔伊 Anya Taylor-Joy 饰）惊心动魄的成长史。年轻的弗瑞奥萨从原本的家园被掠走，落入军阀狄门特斯（克里斯·海姆斯沃斯 Chris Hemsworth 饰）领导的帮派手中，在穿过荒原时，他们来到不死老乔（拉黑·休姆 Lachy H ulme 饰）所掌管的堡垒。在两位暴君争夺统治地位的同时，弗瑞奥萨必须在重重考验中活下来，并想方设法寻找回家的路；她也逐渐成长为利落酷飒的狂暴女神。',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg'
    },
    {
      id: 2,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Otis-Ruby/Md5-Otis-Ruby.mpd',
      name: '性爱自修室 Otis & Ruby',
      title: 'Sex Education: Otis & Ruby',
      description: '超级好看！虽然各种性贯穿全片，但又是特别的纯情走心，甚至很多地方堪称浪漫。校霸欺负gay，围观的直男说：算了吧，恐同是2008年的流行了。有趣流畅不说教，真实冷静不偏激，内容完全对得起“性教育”的这个片名',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/Otis%26Ruby.jpg'
    },
    {
      id: 3,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Crazy-Max/Md5-Crazy-Max.mpd',
      name: '性爱自修室 Otis & Ruby',
      title: 'Sex Education: Otis & Ruby',
      description: '超级好看！虽然各种性贯穿全片，但又是特别的纯情走心，甚至很多地方堪称浪漫。校霸欺负gay，围观的直男说：算了吧，恐同是2008年的流行了。有趣流畅不说教，真实冷静不偏激，内容完全对得起“性教育”的这个片名',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/xuguanghan.jpg'
    },
    {
      id: 4,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Crazy-Max/Md5-Crazy-Max.mpd',
      name: '性爱自修室 Otis & Ruby',
      title: 'Sex Education: Otis & Ruby',
      description: '超级好看！虽然各种性贯穿全片，但又是特别的纯情走心，甚至很多地方堪称浪漫。校霸欺负gay，围观的直男说：算了吧，恐同是2008年的流行了。有趣流畅不说教，真实冷静不偏激，内容完全对得起“性教育”的这个片名',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/sweet-home.jpg'
    },
    {
      id: 5,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Crazy-Max/Md5-Crazy-Max.mpd',
      name: '性爱自修室 Otis & Ruby',
      title: 'Sex Education: Otis & Ruby',
      description: '超级好看！虽然各种性贯穿全片，但又是特别的纯情走心，甚至很多地方堪称浪漫。校霸欺负gay，围观的直男说：算了吧，恐同是2008年的流行了。有趣流畅不说教，真实冷静不偏激，内容完全对得起“性教育”的这个片名',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/last-guys.jpg'
    },
    {
      id: 6,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Crazy-Max/Md5-Crazy-Max.mpd',
      name: '疯狂的麦克斯：狂暴女神',
      title: '疯狂的麦克斯：狂暴女神',
      description: '影片讲述了复仇女神弗瑞奥萨（安雅·泰勒-乔伊 Anya Taylor-Joy 饰）惊心动魄的成长史。年轻的弗瑞奥萨从原本的家园被掠走，落入军阀狄门特斯（克里斯·海姆斯沃斯 Chris Hemsworth 饰）领导的帮派手中，在穿过荒原时，他们来到不死老乔（拉黑·休姆 Lachy H ulme 饰）所掌管的堡垒。在两位暴君争夺统治地位的同时，弗瑞奥萨必须在重重考验中活下来，并想方设法寻找回家的路；她也逐渐成长为利落酷飒的狂暴女神。',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg'
    },
    {
      id: 7,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Crazy-Max/Md5-Crazy-Max.mpd',
      name: '疯狂的麦克斯：狂暴女神',
      title: '疯狂的麦克斯：狂暴女神',
      description: '影片讲述了复仇女神弗瑞奥萨（安雅·泰勒-乔伊 Anya Taylor-Joy 饰）惊心动魄的成长史。年轻的弗瑞奥萨从原本的家园被掠走，落入军阀狄门特斯（克里斯·海姆斯沃斯 Chris Hemsworth 饰）领导的帮派手中，在穿过荒原时，他们来到不死老乔（拉黑·休姆 Lachy H ulme 饰）所掌管的堡垒。在两位暴君争夺统治地位的同时，弗瑞奥萨必须在重重考验中活下来，并想方设法寻找回家的路；她也逐渐成长为利落酷飒的狂暴女神。',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg'
    },
    {
      id: 8,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Crazy-Max/Md5-Crazy-Max.mpd',
      name: '疯狂的麦克斯：狂暴女神',
      title: '疯狂的麦克斯：狂暴女神',
      description: '影片讲述了复仇女神弗瑞奥萨（安雅·泰勒-乔伊 Anya Taylor-Joy 饰）惊心动魄的成长史。年轻的弗瑞奥萨从原本的家园被掠走，落入军阀狄门特斯（克里斯·海姆斯沃斯 Chris Hemsworth 饰）领导的帮派手中，在穿过荒原时，他们来到不死老乔（拉黑·休姆 Lachy H ulme 饰）所掌管的堡垒。在两位暴君争夺统治地位的同时，弗瑞奥萨必须在重重考验中活下来，并想方设法寻找回家的路；她也逐渐成长为利落酷飒的狂暴女神。',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg'
    },
    {
      id: 9,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Crazy-Max/Md5-Crazy-Max.mpd',
      name: '疯狂的麦克斯：狂暴女神',
      title: '疯狂的麦克斯：狂暴女神',
      description: '影片讲述了复仇女神弗瑞奥萨（安雅·泰勒-乔伊 Anya Taylor-Joy 饰）惊心动魄的成长史。年轻的弗瑞奥萨从原本的家园被掠走，落入军阀狄门特斯（克里斯·海姆斯沃斯 Chris Hemsworth 饰）领导的帮派手中，在穿过荒原时，他们来到不死老乔（拉黑·休姆 Lachy H ulme 饰）所掌管的堡垒。在两位暴君争夺统治地位的同时，弗瑞奥萨必须在重重考验中活下来，并想方设法寻找回家的路；她也逐渐成长为利落酷飒的狂暴女神。',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg'
    },
    {
      id: 10,
      mp4: '',
      m3u8: '',
      mpd: 'https://magic-video-bucket.oss-cn-nanjing.aliyuncs.com/Md5-Crazy-Max/Md5-Crazy-Max.mpd',
      name: '疯狂的麦克斯：狂暴女神',
      title: '疯狂的麦克斯：狂暴女神',
      description: '影片讲述了复仇女神弗瑞奥萨（安雅·泰勒-乔伊 Anya Taylor-Joy 饰）惊心动魄的成长史。年轻的弗瑞奥萨从原本的家园被掠走，落入军阀狄门特斯（克里斯·海姆斯沃斯 Chris Hemsworth 饰）领导的帮派手中，在穿过荒原时，他们来到不死老乔（拉黑·休姆 Lachy H ulme 饰）所掌管的堡垒。在两位暴君争夺统治地位的同时，弗瑞奥萨必须在重重考验中活下来，并想方设法寻找回家的路；她也逐渐成长为利落酷飒的狂暴女神。',
      avatar: 'https://vod-images-xiaolin.oss-cn-beijing.aliyuncs.com/crazy-max.jpg'
    },
];
