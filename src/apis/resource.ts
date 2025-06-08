import axiosService from '@/utils/request';
import { API_URL } from '@/common/constant/urls';
import envConfig from '@/config/env';
import {
  mockCollections,
  mockPlaybackSources,
  mockSeasons,
  mockVideoDetails,
  mockVideos
} from '@/mock/MockResource';
import { mockPopularVideos } from '@/mock/MockPopular';


// 获取推荐视频
export const getRecommendVideos = () => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      data: mockCollections
    })
  } else {
    return axiosService.get(`${API_URL.URL_RECOMMEND}`);
  }
}
// 获取最新视频

export const getLatestVideos = () => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      data: mockCollections
    });
  } else {
    return axiosService.get(`${API_URL.URL_LATEST}`);
  }
}
// 获取经典视频

export const getClassicVideos = () => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      data: mockCollections
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

// 获取视频资源列表
export const listResources = () => {
  if (envConfig.mockEnabled) {
    // 使用mock数据
    return Promise.resolve({
      data: mockVideos
    });
  } else {
    // 使用mock数据
    return Promise.resolve({
      data: mockVideos
    });
  }
};

export const listCollections = () => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      data: mockCollections
    })
  } else {
    return Promise.resolve({
      data: mockCollections
    })
  }
}

export const listSeasons = () => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      data: mockSeasons
    })
  } else {
    return Promise.resolve({
      data: mockSeasons
    })
  }
}

export const listPlaybackSources = () => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      data: mockPlaybackSources
    })
  } else {
    return Promise.resolve({
      data: mockPlaybackSources
    })
  }
}

export const getVideoDetails = () => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      data: mockVideoDetails
    })
  } else {
    return Promise.resolve({
      data: mockVideoDetails
    })
  }
}

export const getResourceIdByCollection = () => {
  if (envConfig.mockEnabled) {
    return
  }
}

export const getVideoResourceById = () => {
  if (envConfig.mockEnabled) {
    return
  }
}
