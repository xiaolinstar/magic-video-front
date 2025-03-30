import axios from 'axios';
import { mockFeaturedVideos } from '@/mock/MockFeaturedVideo';
import { API_URL } from '@/common/constant/urls';

// 获取精选视频数据
export const getFeaturedVideos = () => {
  if (import.meta.env.DEV) {
    // 开发环境下使用 mock 数据
    return Promise.resolve({
      data: mockFeaturedVideos
    });
  } else {
    // 生产环境下使用真实数据
    return axios.get(`${API_URL.URL_FEATURED_VIDEO}`);
  }
};
