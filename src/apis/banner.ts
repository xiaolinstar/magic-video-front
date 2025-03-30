import axios from "axios";
import { mockBanners } from "@/mock/MockBanner";
import { API_URL } from "@/common/constant/urls";

// 获取轮播图数据
export const getBanners = () => {
    if(import.meta.env.DEV) {
        // 开发环境下使用 mock 数据
        return Promise.resolve({
            data: mockBanners
        });
    } else {
        // 生产环境下使用真实数据
        return axios.get(`${API_URL.URL_BANNER}`);
    }
}

