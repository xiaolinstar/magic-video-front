import { mockFeaturedVideos } from '@/mock/MockFeaturedVideo';
import { API_URL } from '@/common/constant/urls';
import envConfig from '@/config/env';
import axiosService from '@/utils/request';

// 获取精选视频数据
export const getFeaturedVideos = () => {
  if (envConfig.mockEnabled) {
    // 开发环境下使用 mock 数据
    return Promise.resolve({
      data: mockFeaturedVideos
    });
    // return axiosService.get('/featured');
  } else {
    // 生产环境下使用真实数据
    return axiosService.get(`${API_URL.URL_FEATURED_VIDEO}`);
  }
};
