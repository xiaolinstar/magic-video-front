/**
 * 视频点播核心微服务接口
 */
export const API_URL = {
    // 从后端获取视频资源
    // 使用nginx解决跨域问题
    URL_RESOURCE: `/core/resource`,
    URL_RESOURCE_ALL: `/core/resource/all`,
    URL_COLLECTIONS: `/core/collection/list`,
    URL_LATEST: `/core/resource/latest`,
    URL_CLASSIC: `/core/resource/classic`,
    URL_POPULAR: `/core/resource/popular`,  // 热门视频
    URL_CATEGORY: `/core/category/all`,
    URL_USER: '/core/user/list',
    URL_VIDEO_SET: '/core/collection/set',

    URL_RECOMMEND: `/core/collection/list`,
    URL_AUTH_LOGIN: `/auth/login`,
    URL_SLIDE: `/core/video/slide`,  // 视频轮播图
    URL_VIDEO_PREFIX: `/core/video`,

    URL_SEASON_PREFIX: `/core/season`,

    // 鉴权接口
    URL_AUTH_REGISTER: `/auth/register`,
    URL_AUTH_LOGOUT: `/auth/logout`,
    URL_AUTH_USER: `/auth/user`,

    // URL_AUTH_REGISTER: `http://localhost:9000/auth/register`,

    URL_VIDEO_CHUNK: `/multimedia/video/chunk`,
    URL_VIDEO_MERGE: `/multimedia/video/merge`,
    URL_VIDEO_INFO: `/multimedia/video/info`,
    URL_VIDEO: `/multimedia/video`,


}


