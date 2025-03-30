/**
 * 视频点播核心微服务接口
 */
export const API_URL = {
    // 从后端获取视频资源
    // 使用nginx解决跨域问题
    URL_RESOURCE: `/core/resource/all`,
    URL_USER: '/core/user/list',
    URL_BANNER: `/core/banner/list`,  // 视频轮播图
    URL_FEATURED_VIDEO: `/core/featured/list`,  // 精选视频
    
    // 鉴权接口
    URL_AUTH_LOGIN: `/auth/login`,
    URL_AUTH_REGISTER: `/auth/register`,
    URL_AUTH_LOGOUT: `/auth/logout`,
    URL_AUTH_USER: `/auth/user`,

    // URL_AUTH_REGISTER: `http://localhost:9000/auth/register`,

    URL_VIDEO_CHUNK: `/multimedia/video/chunk`,
    URL_VIDEO_MERGE: `/multimedia/video/merge`,
    URL_VIDEO_INFO: `/multimedia/video/info`,
}


