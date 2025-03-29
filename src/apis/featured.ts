import { mockFeaturedVideos } from '@/mock/MockFeaturedVideo';

// 获取精选视频数据
export const getFeaturedVideos = () => {
  return Promise.resolve({
    data: mockFeaturedVideos
  });
};