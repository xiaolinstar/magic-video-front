
import axiosService from '@/utils/request';
import envConfig from '@/config/env';
import { API_URL } from '@/common/constant/urls';

/**
 * 上传视频分片
 * POST /multimedia/video/chunk {chunkVideo, md5, chunkId, chunkMd5?}
 * @param chunk 分片数据
 * @param fileName 文件名
 * @param index 分片索引
 * @param fileHash 文件MD5值
 * @param chunkMd5 分片MD5值（可选）
 */
export const uploadVideoChunk = (chunk: Blob, fileName: string, index: number, 
  fileHash: string, chunkMd5?: string) => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      status: 200,
      data: {
        message: '上传成功'
      }
    });
  } else {
    const formData = new FormData();
    formData.append('chunkVideo', chunk, `${fileName}.part${index}`);
    formData.append('md5', fileHash);
    formData.append('chunkId', index.toString());
    // 如果提供了分片MD5，也添加到formData中
    if (chunkMd5) {
      formData.append('chunkMd5', chunkMd5);
    }

    return axiosService({
      url: API_URL.URL_VIDEO_CHUNK,
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      // 上传进度事件需要在axios实例之外处理
      onUploadProgress: (progressEvent: any) => {
        // 这里可以处理上传进度
        console.log("上传进度...")
      }
    });
  }
};

/**
 * 合并视频分片
 * @param md5 文件MD5值
 * @param videoType 视频类型
 * @param filename 文件名（可选）
 */
export const mergeVideoChunks = (md5: string, videoType: string, filename?: string) => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      status: 200,
      data: {
        message: '合并成功'
      }
    });
  } else {
    const formData = new FormData();
    formData.append('md5', md5);
    formData.append('videoType', videoType);

    if (filename) {
      formData.append('filename', filename);
    }

    console.log("合并视频分片...")

    return axiosService({
      url: API_URL.URL_VIDEO_MERGE,
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

/**
 * 提交视频信息
 * @param videoInfo 视频信息
 * @param avatar 封面文件
 */
export const submitVideoInfo = (videoInfo: any, avatar: File | null) => {
  if (envConfig.mockEnabled) {
    return Promise.resolve({
      status: 200,
      data: {
        message: '提交成功'
      }
    });
  } else {
    const videoData = {
      id: videoInfo.videoId,
      md5: videoInfo.md5,
      title: videoInfo.title,
      category: videoInfo.category,
      tags: videoInfo.tags,
      description: videoInfo.description,
      // privacy: videoInfo.privacy
    };

    

    return axiosService({
      url: API_URL.URL_RESOURCE,
      method: 'post',
      data: videoData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  }
};

// 导出配置中的分片大小，供组件使用
export const chunkSize = envConfig.uploadChunkSize;


/**
 * 获取视频分类列表
 */
export const getVideoCategories = (): any => {
  return axiosService({
    url: API_URL.URL_CATEGORY,
    method: 'get'
  });
};