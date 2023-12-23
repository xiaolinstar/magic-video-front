const ORIGIN: string = import.meta.env.VITE_LOCATION_ORIGIN
const API_PREFIX: string = import.meta.env.VITE_API_URL

/**
 * 视频点播核心微服务接口
 */
export const API_URL = {
    // 从后端获取视频资源
    URL_RESOURCE: `${ORIGIN}/${API_PREFIX}/v1/core/resource/all`
}


