<template>
  <div class="upload-container">
    <div class="upload-header">
      <h1>视频投稿</h1>
      <p>分享您的精彩视频，让更多人看到</p>
    </div>

    <el-card class="upload-card">
      <el-steps :active="currentStep" finish-status="success" simple>
        <el-step title="上传视频" icon="el-icon-upload"></el-step>
        <el-step title="填写信息" icon="el-icon-edit"></el-step>
        <el-step title="发布成功" icon="el-icon-check"></el-step>
      </el-steps>

      <!-- 步骤1: 上传视频 -->
      <div v-if="currentStep === 0" class="upload-step">
        <div 
          class="upload-area" 
          :class="{ 'is-dragover': isDragover }"
          @dragover.prevent="handleDragover"
          @dragleave.prevent="handleDragleave"
          @drop.prevent="handleDrop"
          @click="triggerFileInput"
        >
          <input 
            type="file" 
            ref="fileInput" 
            accept="video/mp4" 
            style="display: none" 
            @change="handleFileChange"
          />
          <div v-if="!videoFile">
            <i class="el-icon-upload"></i>
            <div class="upload-text">
              <p>点击或拖拽视频文件到此处上传</p>
              <p class="upload-hint">支持MP4格式，单个文件最大500MB</p>
            </div>
          </div>
          <div v-else class="video-preview">
            <video 
              ref="videoPreview" 
              controls 
              :src="videoPreviewUrl"
              class="preview-player"
            ></video>
            <div class="video-info">
              <p>{{ videoFile.name }}</p>
              <p>{{ formatFileSize(videoFile.size) }}</p>
            </div>
            <el-button type="danger" size="small" @click.stop="removeVideo">
              重新选择
            </el-button>
          </div>
        </div>

        <div v-if="isUploading" class="upload-progress">
          <el-progress 
            :percentage="uploadProgress" 
            :format="progressFormat"
            status="success"
          ></el-progress>
          <div class="upload-status">
            <span>已上传 {{ uploadedChunks }}/{{ totalChunks }} 分片</span>
            <el-button 
              v-if="!uploadPaused" 
              size="small" 
              @click="pauseUpload"
              :disabled="uploadProgress >= 100"
            >
              暂停
            </el-button>
            <el-button 
              v-else 
              size="small" 
              type="primary" 
              @click="resumeUpload"
            >
              继续
            </el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="cancelUpload"
            >
              取消
            </el-button>
          </div>
        </div>

        <div class="step-actions">
          <el-button 
            type="primary" 
            :disabled="!videoFile || isUploading" 
            @click="startUpload"
          >
            {{ isUploading ? '上传中...' : '开始上传' }}
          </el-button>
        </div>
      </div>

      <!-- 步骤2: 填写视频信息 -->
      <div v-if="currentStep === 1" class="info-step">
        <el-form 
          :model="videoInfo" 
          :rules="rules" 
          ref="videoForm" 
          label-width="100px"
        >
          <el-form-item label="视频标题" prop="title">
            <el-input 
              v-model="videoInfo.title" 
              placeholder="请输入视频标题（2-50个字符）"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>

          <!-- 在模板部分修改分类选择器 -->
          <el-form-item label="视频分类" prop="category">
            <el-select 
              v-model="videoInfo.category" 
              placeholder="请选择视频分类"
              style="width: 100%"
              :loading="loadingCategories"
            >
              <el-option 
                v-for="item in categories" 
                :key="item.value" 
                :label="item.label" 
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="视频标签" prop="tags">
            <el-tag
              v-for="tag in videoInfo.tags"
              :key="tag"
              closable
              @close="removeTag(tag)"
              class="tag-item"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputTagVisible"
              ref="tagInput"
              v-model="inputTagValue"
              class="tag-input"
              size="small"
              @keyup.enter.native="addTag"
              @blur="addTag"
            ></el-input>
            <el-button 
              v-else 
              class="tag-button" 
              size="small" 
              @click="showTagInput"
            >
              + 添加标签
            </el-button>
            <div class="tag-hint">最多添加5个标签，每个标签不超过10个字符</div>
          </el-form-item>

          <el-form-item label="视频简介" prop="description">
            <el-input
              type="textarea"
              v-model="videoInfo.description"
              :rows="4"
              placeholder="请输入视频简介（最多200个字符）"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="封面图片">
            <div class="cover-upload">
              <div 
                class="cover-preview" 
                v-if="coverUrl" 
                :style="{ backgroundImage: `url(${coverUrl})` }"
              >
                <div class="cover-actions">
                  <el-button 
                    type="danger" 
                    size="small"
                    circle 
                    icon="el-icon-delete"
                    @click="removeCover"
                  ></el-button>
                </div>
              </div>
              <div v-else class="cover-upload-area" @click="triggerCoverInput">
                <input 
                  type="file" 
                  ref="coverInput" 
                  accept="image/*" 
                  style="display: none" 
                  @change="handleCoverChange"
                />
                <i class="el-icon-plus"></i>
                <div>上传封面</div>
              </div>
              <div class="cover-hint">
                推荐尺寸 16:9，JPG/PNG 格式
              </div>
            </div>
          </el-form-item>

          <el-form-item label="隐私设置">
            <el-radio-group v-model="videoInfo.privacy">
              <el-radio label="public">公开</el-radio>
              <el-radio label="private">私密</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <div class="step-actions">
          <el-button @click="goToPrevStep">上一步</el-button>
          <el-button type="primary" @click="submitVideo">发布视频</el-button>
        </div>
      </div>

      <!-- 步骤3: 发布成功 -->
      <div v-if="currentStep === 2" class="success-step">
        <div class="success-icon">
          <i class="el-icon-check"></i>
        </div>
        <h2>视频发布成功！</h2>
        <p>您的视频正在处理中，处理完成后将自动发布</p>
        <div class="success-actions">
          <el-button @click="goToVideoPage">查看视频</el-button>
          <el-button type="primary" @click="uploadNewVideo">继续上传</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElForm } from 'element-plus';
import SparkMD5 from 'spark-md5';

// 导入API方法
import { uploadVideoChunk, mergeVideoChunks, submitVideoInfo, getVideoCategories } from '@/apis/upload';

const router = useRouter();
const fileInput = ref<HTMLInputElement | null>(null);
const coverInput = ref<HTMLInputElement | null>(null);
const videoPreview = ref<HTMLVideoElement | null>(null);
const videoForm = ref<InstanceType<typeof ElForm> | null>(null);
const tagInput = ref<HTMLInputElement | null>(null);


// 步骤控制
const currentStep = ref(1);

// 拖拽状态
const isDragover = ref(false);

// 视频文件
const videoFile = ref<File | null>(null);
const videoPreviewUrl = ref('');

// 封面图片
const coverUrl = ref('');
const coverFile = ref<File | null>(null);

// 标签输入控制
const inputTagVisible = ref(false);
const inputTagValue = ref('');

// 上传相关状态
const isUploading = ref(false);
const uploadProgress = ref(0);
const uploadPaused = ref(false);
const uploadedChunks = ref(0);
const totalChunks = ref(0);
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB 分片大小
const uploadQueue = ref<Array<{ chunk: Blob, index: number }>>([]);
const currentUploads = ref<Array<{ id: number, controller: AbortController }>>([]);
const maxConcurrentUploads = 3; // 最大并发上传数
const videoMD5 = ref('');
const uploadedChunkIds = ref<Set<number>>(new Set());

const loadingCategories = ref(false);
const categories = ref<Array<{ label: string, value: string }>>([]);

// 视频信息表单
const videoInfo = reactive({
  videoId: '', // 视频 id
  md5: '', // 视频 md5 值
  title: '默认标题',
  category: '',
  tags: [] as string[],
  description: '这是一个描述，默认的，欢迎覆盖',
  privacy: 'public'
});

// 表单验证规则
const rules = {
  title: [
    { required: true, message: '请输入视频标题', trigger: 'blur' },
    { min: 2, max: 50, message: '标题长度在 2 到 50 个字符之间', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择视频分类', trigger: 'change' }
  ],
  description: [
    { max: 200, message: '简介不能超过200个字符', trigger: 'blur' }
  ]
};

// 格式化进度条显示
const progressFormat = (percentage: number) : string => {
  if (percentage === 100) {
    return '上传完成';
  }
  return `${percentage}%`;
};

// 文件大小格式化
// 返回格式如 1.23MB
const formatFileSize = (bytes: number) : string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
};


// 计算文件 MD5
// 如果视频较大，可以选择部分内容进行计算，提高速度
const calculateFileMD5 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const blobSlice = File.prototype.slice;
    const chunks = Math.ceil(file.size / CHUNK_SIZE);
    let currentChunk = 0;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    
    ElMessage.info('正在计算文件特征值，请稍候...');
    
    fileReader.onload = (e) => {
      spark.append(e.target?.result as ArrayBuffer);
      currentChunk++;
      
      if (currentChunk < chunks) {
        loadNext();
      } else {
        const md5 = spark.end();
        resolve(md5);
      }
    };
    
    fileReader.onerror = () => {
      reject('文件读取失败');
    };
    
    function loadNext() {
      const start = currentChunk * CHUNK_SIZE;
      const end = start + CHUNK_SIZE >= file.size ? file.size : start + CHUNK_SIZE;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }
    
    loadNext();
  });
};

// 创建文件分片
const createFileChunks = (file: File): Array<{ chunk: Blob, index: number }> => {
  const chunks = Array<{ chunk: Blob, index: number }>();
  let cur = 0;
  let index = 0;
  
  while (cur < file.size) {
    chunks.push({
      chunk: file.slice(cur, cur + CHUNK_SIZE),
      index
    });
    cur += CHUNK_SIZE;
    index++;
  }
  
  return chunks;
};

// 开始上传
const startUpload = async () => {
  if (!videoFile.value) return;
  
  try {
    isUploading.value = true;
    uploadProgress.value = 0;
    uploadPaused.value = false;
    uploadedChunks.value = 0;
    
    // 计算文件MD5
    videoMD5.value = await calculateFileMD5(videoFile.value);
    console.log('videoMd5', videoMD5.value); 
    
    // 创建分片
    const chunks = createFileChunks(videoFile.value);
    totalChunks.value = chunks.length;
    uploadQueue.value = chunks;
    
    console.log('totalChunks', totalChunks.value);

    // 开始上传分片
    await uploadChunks();
  } catch (error) {
    ElMessage.error('上传准备失败: ' + error);
    isUploading.value = false;
  }
};

// 上传分片
const uploadChunks = async() => {
  if (uploadPaused.value) return;
  
  // 检查是否所有分片都已上传
  if (uploadedChunks.value === totalChunks.value) {
    // 所有分片上传完成，合并文件
    await mergeChunks();
    return;
  }
  
  // 计算可以开始的上传任务数
  const availableSlots = maxConcurrentUploads - currentUploads.value.length;
  
  if (availableSlots <= 0) return;
  
  // 从队列中取出分片上传
  for (let i = 0; i < availableSlots; i++) {
    const nextChunk = uploadQueue.value.find(item => !uploadedChunkIds.value.has(item.index));
    
    if (!nextChunk) break;
    
    await uploadChunk(nextChunk);
  }
};

// 上传单个分片
const uploadChunk = async(chunkInfo: { chunk: Blob, index: number }) => {
  if (!videoFile.value) return;
  
  try {
    const controller = new AbortController();
    const uploadId = Date.now() + chunkInfo.index;
    
    // 添加到当前上传列表
    currentUploads.value.push({ id: uploadId, controller });
    
    // 使用API方法上传分片
    const response = await uploadVideoChunk(
      chunkInfo.chunk, 
      videoFile.value.name, 
      chunkInfo.index, 
      videoMD5.value
    );
    console.log("分片上传", response.data)
    
    // 上传成功
    uploadedChunks.value++;
    uploadedChunkIds.value.add(chunkInfo.index);
    
    // 从当前上传列表中移除
    currentUploads.value = currentUploads.value.filter(item => item.id !== uploadId);
    
    // 更新进度
    updateTotalProgress();
    
    // 继续上传其他分片
    await uploadChunks();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      // 上传被中止，不做处理
      return;
    }
    
    // 上传失败
    ElMessage.error(`分片 ${chunkInfo.index + 1} 上传失败: ${error.message || '未知错误'}`);
    
    // 从当前上传列表中移除
    currentUploads.value = currentUploads.value.filter(item => item.id !== Date.now() + chunkInfo.index);
    
    // 继续上传其他分片
    await uploadChunks();
  }
};

// 更新总体进度
const updateTotalProgress = () => {
  uploadProgress.value = Math.floor((uploadedChunks.value / totalChunks.value) * 100);
};

// 合并分片
const mergeChunks = async () => {
  try {
    ElMessage.info('所有分片上传完成，正在合并文件...');
    
    console.log('videoMd5', videoMD5.value); // 打印videoMd5 value
    console.log('videoFile', videoFile.value); // 打印videoFile value
    console.log('totalChunks', totalChunks.value); // 打印totalChunks value

    // 获取视频类型
    const videoType = videoFile.value?.name.split('.').pop() || 'mp4';
    
    // 使用API方法合并分片，添加videoType参数
    const response = await mergeVideoChunks(
      videoMD5.value,
      videoType,
      videoFile.value?.name
    );
    
    if (response.status === 200) {
      ElMessage.success('视频上传成功！');
      isUploading.value = false;
      
      // 保存视频MD5到视频信息中，作为唯一标识
      videoInfo.md5 = videoMD5.value;
      videoInfo.videoId = response.data.data.videoId || '';
      
      goToNextStep();
    }
  } catch (error: any) {
    ElMessage.error('文件合并失败: ' + (error.message || '未知错误'));
    isUploading.value = false;
  }
};

// 暂停上传
const pauseUpload = () => {
  uploadPaused.value = true;
};

// 继续上传
const resumeUpload = () => {
  uploadPaused.value = false;
  uploadChunks();
};

// 取消上传
const cancelUpload = () => {
  // 中止所有正在进行的上传
  currentUploads.value.forEach(item => {
    item.controller.abort();
  });
  
  // 重置上传状态
  isUploading.value = false;
  uploadProgress.value = 0;
  uploadPaused.value = false;
  uploadedChunks.value = 0;
  totalChunks.value = 0;
  uploadQueue.value = [];
  currentUploads.value = [];
  uploadedChunkIds.value.clear();
  
  ElMessage.info('上传已取消');
};
// 触发文件选择
const triggerFileInput = () => {
  if (!videoFile.value) {
    fileInput.value?.click();
  }
};

// 处理文件选择
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    
    // 检查文件类型
    if (file.type !== 'video/mp4') {
      ElMessage.error('只支持MP4格式的视频文件');
      return;
    }
    
    // 检查文件大小 (500MB)
    if (file.size > 500 * 1024 * 1024) {
      ElMessage.error('文件大小不能超过500MB');
      return;
    }
    
    videoFile.value = file;
    videoPreviewUrl.value = URL.createObjectURL(file);
  }
};

// 处理拖拽事件
const handleDragover = () => {
  isDragover.value = true;
};

const handleDragleave = () => {
  isDragover.value = false;
};

const handleDrop = (event: DragEvent) => {
  isDragover.value = false;
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0];
    
    // 检查文件类型
    if (file.type !== 'video/mp4') {
      ElMessage.error('只支持MP4格式的视频文件');
      return;
    }
    
    // 检查文件大小 (500MB)
    if (file.size > 500 * 1024 * 1024) {
      ElMessage.error('文件大小不能超过500MB');
      return;
    }
    
    videoFile.value = file;
    videoPreviewUrl.value = URL.createObjectURL(file);
  }
};

// 移除视频
const removeVideo = () => {
  if (videoPreviewUrl.value) {
    URL.revokeObjectURL(videoPreviewUrl.value);
  }
  videoFile.value = null;
  videoPreviewUrl.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// 触发封面上传
const triggerCoverInput = () => {
  coverInput.value?.click();
};

// 处理封面上传
const handleCoverChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      ElMessage.error('请上传图片文件');
      return;
    }
    
    // 检查文件大小 (2MB)
    if (file.size > 2 * 1024 * 1024) {
      ElMessage.error('图片大小不能超过2MB');
      return;
    }
    
    coverFile.value = file;
    coverUrl.value = URL.createObjectURL(file);
  }
};

// 移除封面
const removeCover = () => {
  if (coverUrl.value) {
    URL.revokeObjectURL(coverUrl.value);
  }
  coverFile.value = null;
  coverUrl.value = '';
  if (coverInput.value) {
    coverInput.value.value = '';
  }
};

// 显示标签输入框
const showTagInput = () => {
  inputTagVisible.value = true;
  // 等待DOM更新后聚焦
  setTimeout(() => {
    tagInput.value?.focus();
  });
};

// 添加标签
const addTag = () => {
  const value = inputTagValue.value.trim();
  if (value) {
    if (videoInfo.tags.length >= 5) {
      ElMessage.warning('最多添加5个标签');
    } else if (value.length > 10) {
      ElMessage.warning('标签不能超过10个字符');
    } else if (videoInfo.tags.includes(value)) {
      ElMessage.warning('标签已存在');
    } else {
      videoInfo.tags.push(value);
    }
  }
  inputTagVisible.value = false;
  inputTagValue.value = '';
};

// 移除标签
const removeTag = (tag: string) => {
  videoInfo.tags = videoInfo.tags.filter(t => t !== tag);
};

// 步骤控制
const goToNextStep = () => {
  currentStep.value++;
};

const goToPrevStep = () => {
  currentStep.value--;
};

// 🌟 提交视频
const submitVideo = () => {
  videoForm.value?.validate(async (valid) => {
    if (valid) {
      try {
        ElMessage.info('正在提交视频信息...');
        
        // 确保md5已设置
        if (!videoInfo.md5) {
          videoInfo.md5 = videoMD5.value;
        }
        
        // 使用API方法提交视频信息
        const response = await submitVideoInfo(videoInfo, coverFile.value);
        
        if (response.status === 200) {
          // 提交成功，进入下一步
          currentStep.value++;
        }
      } catch (error: any) {
        ElMessage.error('视频信息提交失败: ' + (error.message || '未知错误'));
      }
    }
  });
};

const fetchCategories = async () => {
  try {
    loadingCategories.value = true;
    const response = await getVideoCategories();
    console.log('response', response)

    if (response.code === 200) {
      categories.value = response.data.map((category: any) => ({
        label: category.name,
        value: category.name
      }));
    } else {
      ElMessage.error('获取视频分类失败');
    }
  } catch (error: any) {
    ElMessage.error('获取视频分类失败:'+ (error.message || '未知错误'));
  } finally {
    loadingCategories.value = false;
  }
};

// 查看视频
const goToVideoPage = () => {
  router.push('/video/1'); // 假设视频ID为1
};

// 继续上传
const uploadNewVideo = () => {
  // 重置所有状态
  removeVideo();
  removeCover();
  videoInfo.title = '';
  videoInfo.md5 = '';
  videoInfo.category = '';
  videoInfo.tags = [];
  videoInfo.description = '';
  videoInfo.privacy = 'public';
  currentStep.value = 0;
};
onMounted(() => {
  fetchCategories();
})


// 组件销毁前清理资源
onBeforeUnmount(() => {
  if (videoPreviewUrl.value) {
    URL.revokeObjectURL(videoPreviewUrl.value);
  }
  if (coverUrl.value) {
    URL.revokeObjectURL(coverUrl.value);
  }
});
</script>

<style scoped>
.upload-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
}

.upload-header {
  text-align: center;
  margin-bottom: 30px;
}

.upload-header h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.upload-header p {
  color: #666;
  font-size: 16px;
}

.upload-card {
  margin-bottom: 30px;
  border-radius: 8px;
}

.upload-step, .info-step, .success-step {
  margin-top: 30px;
}

.upload-area {
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-area:hover, .upload-area.is-dragover {
  border-color: #409eff;
  background-color: rgba(64, 158, 255, 0.06);
}

.upload-area i {
  font-size: 48px;
  color: #909399;
  margin-bottom: 20px;
}

.upload-text {
  color: #606266;
}

.upload-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 10px;
}

.video-preview {
  width: 100%;
}

.preview-player {
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 15px;
}

.video-info {
  margin: 10px 0;
  color: #606266;
}

.step-actions {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.tag-item {
  margin-right: 10px;
  margin-bottom: 10px;
}

.tag-input {
  width: 100px;
  margin-right: 10px;
  vertical-align: bottom;
}

.tag-button {
  height: 32px;
}

.tag-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

.cover-upload {
  display: flex;
  flex-direction: column;
}

.cover-upload-area {
  width: 160px;
  height: 90px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #8c939d;
  transition: all 0.3s;
}

.cover-upload-area:hover {
  border-color: #409eff;
  color: #409eff;
}

.cover-preview {
  width: 160px;
  height: 90px;
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  position: relative;
}

.cover-actions {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 6px;
}

.cover-preview:hover .cover-actions {
  opacity: 1;
}

.cover-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

.success-step {
  text-align: center;
  padding: 40px 0;
}

.success-icon {
  font-size: 72px;
  color: #67c23a;
  margin-bottom: 20px;
}

.success-step h2 {
  font-size: 24px;
  color: #303133;
  margin-bottom: 15px;
}

.success-step p {
  color: #606266;
  margin-bottom: 30px;
}

.success-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
