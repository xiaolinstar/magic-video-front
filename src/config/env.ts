// 环境配置文件
interface EnvConfig {
  baseUrl: string;
  mockEnabled: boolean;
  apiTimeout: number;
  uploadChunkSize: number;
}

// 开发环境 - 使用Mock数据
const developmentMock: EnvConfig = {
  baseUrl: '/api',
  mockEnabled: true,
  apiTimeout: 10000,
  uploadChunkSize: 5 * 1024 * 1024
};

// 开发环境 - 直连后端服务
const developmentDirect: EnvConfig = {
  baseUrl: 'http://localhost:9000/api',
  mockEnabled: false,
  apiTimeout: 30000,
  uploadChunkSize: 5 * 1024 * 1024
};

// 测试环境
const test: EnvConfig = {
  baseUrl: 'http://test-api.example.com/api',
  mockEnabled: false,
  apiTimeout: 15000,
  uploadChunkSize: 5 * 1024 * 1024
};

// 生产环境
const production: EnvConfig = {
  baseUrl: '/api',
  mockEnabled: false,
  apiTimeout: 15000,
  uploadChunkSize: 5 * 1024 * 1024
};

// 根据环境变量和模式选择配置
const getEnvConfig = (): EnvConfig => {
  const env = import.meta.env.MODE || 'development';
  const useMock = import.meta.env.VITE_USE_MOCK === 'true';
  
  if (env === 'development') {
    return useMock ? developmentMock : developmentDirect;
  } else if (env === 'test') {
    return test;
  } else {
    return production;
  }
};

export default getEnvConfig();