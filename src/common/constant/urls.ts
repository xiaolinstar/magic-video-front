/**
 * 视频点播核心微服务接口
 */
export const API_URL = {
    // 从后端获取视频资源
    // 使用nginx解决跨域问题
    URL_RESOURCE: `/core/resource/all`,
    URL_RECOMMEND: `/core/resource/recommend`,
    URL_LATEST: `/core/resource/latest`,
    URL_FEATURED: `/core/resource/featured`,  // 精选视频
    URL_BANNER: `/core/resource/banner`,  // 视频轮播图
    URL_CLASSIC: `/core/resource/classic`,

    URL_USER: '/core/user/list',

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


