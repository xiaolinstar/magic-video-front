import { mockBanners } from "@/mock/MockBanner";
import { API_URL } from "@/common/constant/urls";
import axiosService from "@/utils/request";

// 获取轮播图数据
export const getBanners = () => {
    if(import.meta.env.DEV) {
        // 开发环境下使用 mock 数据
        return Promise.resolve({
            data: mockBanners
        });
        // returen axiosService.get('/banner');
    } else {
        // 生产环境下使用真实数据
        return axiosService.get(`${API_URL.URL_BANNER}`);
    }
}

