// mockjs 启用开关在 main.ts 中控制，暂时关闭


import Mock from 'mockjs';
import envConfig from '@/config/env';
import { mockCollections } from '@/mock/MockResource';
import { mockPopularVideos } from '@/mock/MockPopular';

// 无法使用 Mock 拦截，会导致 dashjs 无法正常使用

Mock.setup({
    timeout: '200-600'
});

// 模拟视频资源接口
Mock.mock(`${envConfig.baseUrl}/collection/list`, 'get', {
    code: 0,
    message: 'success',
    data: mockCollections
});

Mock.mock(`${envConfig.baseUrl}/popular`, 'get', {
    code: 0,
    message: 'success',
    data: mockPopularVideos
});

console.log('Mock服务已启动');

export default Mock;
