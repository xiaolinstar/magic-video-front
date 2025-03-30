
import request from '@/utils/request';
import envConfig from '@/config/env';

/**
 * 上传视频分片
 * @param chunk 分片数据
 * @param fileName 文件名
 * @param index 分片索引
 * @param fileHash 文件MD5值
 */
export const uploadVideoChunk = (chunk: Blob, fileName: string, index: number, fileHash: string) => {
  const formData = new FormData();
  formData.append('file', chunk, `${fileName}.part${index}`);
  
  return request({
    url: '/multimedia/video/chunk',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'File-Hash': fileHash,
      'Chunk-Index': index.toString()
    },
    // 上传进度事件需要在axios实例之外处理
    onUploadProgress: (progressEvent: any) => {
      // 这里可以处理上传进度
    }
  });
};

/**
 * 合并视频分片
 * @param md5 文件MD5值
 * @param filename 文件名
 * @param chunks 分片总数
 */
export const mergeVideoChunks = (md5: string, filename: string, chunks: number) => {
  return request({
    url: '/multimedia/video/merge',
    method: 'post',
    data: {
      md5,
      filename,
      chunks
    }
  });
};

/**
 * 提交视频信息
 * @param videoInfo 视频信息
 * @param coverFile 封面文件
 */
export const submitVideoInfo = (videoInfo: any, coverFile: File | null) => {
  const formData = new FormData();
  
  if (coverFile) {
    formData.append('cover', coverFile);
  }
  
  // 添加视频信息
  formData.append('videoId', videoInfo.videoId);
  formData.append('title', videoInfo.title);
  formData.append('category', videoInfo.category);
  formData.append('tags', JSON.stringify(videoInfo.tags));
  formData.append('description', videoInfo.description);
  formData.append('privacy', videoInfo.privacy);
  
  return request({
    url: '/api/videos',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// 导出配置中的分片大小，供组件使用
export const chunkSize = envConfig.uploadChunkSize;