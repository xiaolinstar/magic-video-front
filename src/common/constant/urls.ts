const ORIGIN: string = import.meta.env.VITE_LOCATION_ORIGIN
const API_PREFIX: string = import.meta.env.VITE_API_URL

/**
 * 视频点播核心微服务接口
 */
export const API_URL = {
    // 从后端获取视频资源
    // 使用nginx解决跨域问题
    URL_RESOURCE: `/api/core/resource/all`,
    URL_USER: 'api/core/user/list'
}


