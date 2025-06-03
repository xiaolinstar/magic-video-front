import { mockBanners } from "@/mock/MockBanner";
import { API_URL } from "@/common/constant/urls";
import axiosService from "@/utils/request";
import envConfig from "@/config/env";

// 获取轮播图数据
export const getBanners = () => {
    if(envConfig.mockEnabled) {
        // 开发环境下使用 mock 数据
        return Promise.resolve({
            data: mockBanners
        });
    } else {
        // 生产环境下使用真实数据
        return axiosService.get(`${API_URL.URL_BANNER}`);
    }
}

