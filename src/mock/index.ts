import Mock from 'mockjs';
import envConfig from '@/config/env';
import { mockResources } from '@/mock/MockResource';
import { messageConfig } from 'element-plus';
import { mockFeaturedVideos } from './MockFeaturedVideo';

// 无法使用 Mock 拦截，会导致 dashjs 无法正常使用

Mock.setup({
    timeout: '200-600'
});

// 模拟视频资源接口
Mock.mock(`${envConfig.baseUrl}/resources`, 'get', {
    code: 0,
    message: 'success',
    data: mockResources
});

Mock.mock(`${envConfig.baseUrl}/featured`, 'get', {
    code: 0,
    message: 'success',
    data: mockFeaturedVideos
})


console.log('Mock服务已启动');

export default Mock;
