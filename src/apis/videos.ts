import axios from "axios";
import {API_URL} from "@/common/constant/urls";
import { mockResources } from "@/mock/MockResource";

// 获取视频资源列表
export const listVideoResources = () => {
  return Promise.resolve({
    data: mockResources
  });
};

/*
分页获取视频资源
 */
export async function pageVideoResources(page: number, pageSize: number) {
  return null;
}


