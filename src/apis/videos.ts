import axios from "axios";
import {API_URL} from "@/common/constant/urls";

// 模拟视频数据
const mockVideos = [
  {
    mp4: 'http://localhost:9010/magic-video/Md5-Otis-Ruby.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=RzQywv1gIcgXeSSMMeNz%2F20250311%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250311T144616Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3cb3533daee434332cf65be33a985bfe746db231f58ea3dafb1a4127092fb210',
    m3u8: 'https://example.com/video1.m3u8',
    mpd: 'http://localhost:9020/magic-dash/Md5-Otis-Ruby.mpd?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=bnY5rNCWoZUXNSk7CcR0%2F20250319%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250319T125536Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=8e15b7a0728c7088ff7143735ae3663dbaf2bc7b2cdb5fa7c5ad7386f0b1c293',
    name: 'Otis & Ruby',
    title: 'Netflix 剧集《性爱自修室》，Otis & Ruby',
    description: '性爱自修室，非官配CP：Otis & Ruby',
    avatar: 'http://localhost:9010/magic-image/Otis%20%26%20Ruby.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=RzQywv1gIcgXeSSMMeNz%2F20250319%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250319T131739Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=a858394a7b2a4214f7de523d55cd713e32d7a945dbc3f77a29dd3671e305ab34'
  },
  {
    mp4: 'http://localhost:9010/magic-video/Md5-Otis-Ruby.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=RzQywv1gIcgXeSSMMeNz%2F20250311%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250311T144616Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3cb3533daee434332cf65be33a985bfe746db231f58ea3dafb1a4127092fb210',
    m3u8: 'https://example.com/video1.m3u8',
    mpd: 'http://localhost:9020/magic-dash/Md5-Otis-Ruby.mpd?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=bnY5rNCWoZUXNSk7CcR0%2F20250319%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250319T125536Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=8e15b7a0728c7088ff7143735ae3663dbaf2bc7b2cdb5fa7c5ad7386f0b1c293',
    name: 'Otis & Ruby',
    title: 'Netflix 剧集《性爱自修室》，Otis & Ruby',
    description: '性爱自修室，非官配CP：Otis & Ruby',
    avatar: 'http://localhost:9010/magic-image/Otis%20%26%20Ruby.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=RzQywv1gIcgXeSSMMeNz%2F20250319%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250319T131739Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=a858394a7b2a4214f7de523d55cd713e32d7a945dbc3f77a29dd3671e305ab34'
  },
  {
    mp4: "http://localhost:9010/magic-video/Md5-Crazy-Max.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=RzQywv1gIcgXeSSMMeNz%2F20250319%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250319T142054Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=033da813fd852f2aee7145110bb230fa4361832e1af92ac791bbde195ee91bdb",
    m3u8: 'https://example.com/video1.m3u8',
    mpd: "http://localhost:9020/magic-dash/Md5-Crazy-Max.mpd?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=bnY5rNCWoZUXNSk7CcR0%2F20250319%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250319T143730Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=baaeef8db7a1874f1d61a1aa2375732a7c4264905331b0d23e934a7cc1c5c1c1",
    name: '疯狂麦克斯-狂暴女神',
    title: '疯狂的麦克斯：狂暴女神 Furiosa: A Mad Max Saga',
    description: '影片讲述了复仇女神弗瑞奥萨（安雅·泰勒-乔伊 Anya Taylor-Joy 饰）惊心动魄的成长史。年轻的弗瑞奥萨从原本的家园被掠走，落入军阀狄门特斯（克里斯·海姆斯沃斯 Chris Hemsworth 饰）领导的帮派手中，在穿过荒原时，他们来到不死老乔（拉黑·休姆 Lachy H ulme 饰）所掌管的堡垒。在两位暴君争夺统治地位的同时，弗瑞奥萨必须在重重考验中活下来，并想方设法寻找回家的路；她也逐渐成长为利落酷飒的狂暴女神。',
    avatar: "http://localhost:9010/magic-image/crazy-max.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=RzQywv1gIcgXeSSMMeNz%2F20250319%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250319T144745Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=cf941058e00018ea714f73d975f3a6cf789a03e7eabdf558ab5ac4f61a5e2b70"
  },
  
];

// 获取视频资源列表
export const listVideoResources = () => {
  return Promise.resolve({
    data: mockVideos
  });
};

/*
分页获取视频资源
 */
export async function pageVideoResources(page: number, pageSize: number) {
  return null;
}


