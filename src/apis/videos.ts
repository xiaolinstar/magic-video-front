import axios from "axios";
import {API_URL} from "@/common/constant/urls";

// 获取所有视频资源
export async function listVideoResources() {
  let res = await axios.get(API_URL.URL_RESOURCE);
  console.log(API_URL.URL_RESOURCE);
  return res.data;
}

/*
分页获取视频资源
 */
export async function pageVideoResources(page: number, pageSize: number) {
  return null;
}


