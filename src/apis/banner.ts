import { mockBanners } from "@/mock/MockBanner";

// 获取轮播图数据
export const getBanners = () => {
    return Promise.resolve({
       data: mockBanners 
    });
}
