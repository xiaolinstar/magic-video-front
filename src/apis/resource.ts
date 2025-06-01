import axiosService from '@/utils/request';
import { API_URL } from '@/common/constant/urls';
import envConfig from '@/config/env';
import { mockResources } from '@/mock/MockResource';
import { mockPopularVideos } from '@/mock/MockPopular';

// 获取视频资源列表
export const listVideoResources = () => {
  if (envConfig.mockEnabled) {
    // 使用mock数据
    return Promise.resolve({
      data: mockResources
    });
  } else {
    // 使用真实数据
    return axiosService.get(`${API_URL.URL_RESOURCE_ALL}`);
  }
};

// 获取推荐视频
export const getRecommendVideos = () => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      data: mockResources
    });
  } else {
    return axiosService.get(`${API_URL.URL_RECOMMEND}`);
  } 
}

// 获取最新视频
export const getLatestVideos = () => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      data: mockResources
    });
  } else {
    return axiosService.get(`${API_URL.URL_LATEST}`);
  }
}

// 获取经典视频
export const getClassicVideos = () => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      data: mockResources
    });
  } else {
    return axiosService.get(`${API_URL.URL_CLASSIC}`);
  }
}


// 获取热门视频数据
export const getPopularVideos = () => {
  if (envConfig.mockEnabled) {
    // 开发环境下使用 mock 数据
    return Promise.resolve({
      data: mockPopularVideos
    });
  } else {
    // 生产环境下使用真实数据
    return axiosService.get(`${API_URL.URL_POPULAR}`);
  }
};


