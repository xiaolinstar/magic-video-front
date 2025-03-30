import axios from "axios";
import {API_URL} from "@/common/constant/urls";
import { mockResources } from "@/mock/MockResource";

// 获取视频资源列表
export const listVideoResources = () => {
  if(import.meta.env.DEV) {
    // 开发环境下使用 mock 数据
    return Promise.resolve({
      data: mockResources
    }); 
  } else {
    // 生产环境下使用真实数据
    return axios.get(`${API_URL.URL_RESOURCE}`);
  }
};

/*
分页获取视频资源
 */
export async function pageVideoResources(page: number, pageSize: number) {
  return null;
}


