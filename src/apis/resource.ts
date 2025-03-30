import axiosService from '@/utils/request';
import { API_URL } from '@/common/constant/urls';
import envConfig from '@/config/env';
import { mockResources } from '@/mock/MockResource';

// 获取视频资源列表
export const listVideoResources = () => {
  if (envConfig.mockEnabled) {
    // 使用mock数据
    return Promise.resolve({
      data: mockResources
    });
    // return axiosService.get('/resources');
  } else {
    // 使用真实数据
    return axiosService.get(`${API_URL.URL_RESOURCE}`);
  }
};



