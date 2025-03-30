<template>
  <div class="contact-container">
    <div class="contact-hero">
      <h1 class="hero-title">联系我们</h1>
      <p class="hero-subtitle">我们随时准备为您提供帮助</p>
    </div>

    <div class="contact-content">
      <el-row :gutter="30" class="content-wrapper">
        <!-- 联系表单 -->
        <el-col :md="16" :sm="24">
          <el-card class="contact-card">
            <h2 class="section-title">发送消息</h2>
            <el-form 
              :model="contactForm" 
              :rules="formRules" 
              ref="contactFormRef"
              label-position="top"
            >
              <el-form-item label="姓名" prop="name">
                <el-input 
                  v-model="contactForm.name" 
                  placeholder="请输入您的姓名"
                  prefix-icon="el-icon-user"
                />
              </el-form-item>

              <el-form-item label="邮箱" prop="email">
                <el-input
                  v-model="contactForm.email"
                  placeholder="请输入有效的邮箱地址"
                  prefix-icon="el-icon-message"
                />
              </el-form-item>

              <el-form-item label="消息类型" prop="type">
                <el-select
                  v-model="contactForm.type"
                  placeholder="请选择消息类型"
                  class="full-width"
                >
                  <el-option label="产品反馈" value="feedback" />
                  <el-option label="技术支持" value="support" />
                  <el-option label="商务合作" value="business" />
                  <el-option label="其他咨询" value="other" />
                </el-select>
              </el-form-item>

              <el-form-item label="消息内容" prop="content">
                <el-input
                  v-model="contactForm.content"
                  type="textarea"
                  :rows="5"
                  placeholder="请输入详细内容..."
                  resize="none"
                />
              </el-form-item>

              <el-form-item>
                <el-button 
                  type="primary" 
                  @click="submitForm"
                  :loading="isSubmitting"
                >
                  提交表单
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>

        <!-- 联系信息 -->
        <el-col :md="8" :sm="24">
          <div class="info-section">
            <el-card class="info-card">
              <h2 class="section-title">联系信息</h2>
              
              <div class="info-item">
                <el-icon class="info-icon"><Location /></el-icon>
                <div class="info-content">
                  <h3>办公地址</h3>
                  <p>北京市朝阳区Magic大厦18层</p>
                </div>
              </div>

              <div class="info-item">
                <el-icon class="info-icon"><Phone /></el-icon>
                <div class="info-content">
                  <h3>联系电话</h3>
                  <p>400-123-4567</p>
                  <p>周一至周五 9:00 - 18:00</p>
                </div>
              </div>

              <div class="info-item">
                <el-icon class="info-icon"><Message /></el-icon>
                <div class="info-content">
                  <h3>电子邮箱</h3>
                  <p>contact@magicvideo.com</p>
                  <p>support@magicvideo.com</p>
                </div>
              </div>

              <el-divider />

              <div class="social-links">
                <el-button type="primary" circle>
                  <el-icon><Promotion /></el-icon>
                </el-button>
                <el-button type="success" circle>
                  <el-icon><ChatLineRound /></el-icon>
                </el-button>
                <el-button type="danger" circle>
                  <el-icon><VideoCamera /></el-icon>
                </el-button>
              </div>
            </el-card>

            <div class="map-container">
              <!-- 这里可以嵌入实际的地图组件 -->
              <div class="map-placeholder">
                <el-icon class="map-icon"><MapLocation /></el-icon>
                <p>地图位置</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElForm } from 'element-plus'
import {
  Location,
  Phone,
  Message,
  Promotion,
  ChatLineRound,
  VideoCamera,
  MapLocation
} from '@element-plus/icons-vue'

const contactFormRef = ref<InstanceType<typeof ElForm>>()
const isSubmitting = ref(false)

const contactForm = reactive({
  name: '',
  email: '',
  type: '',
  content: ''
})

const formRules = reactive({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '姓名长度为2-10个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择消息类型', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' },
    { min: 10, message: '内容至少10个字符', trigger: 'blur' }
  ]
})

const submitForm = () => {
  contactFormRef.value?.validate((valid) => {
    if (valid) {
      isSubmitting.value = true
      // 模拟API调用
      setTimeout(() => {
        ElMessage.success('提交成功！我们将尽快回复您')
        contactFormRef.value?.resetFields()
        isSubmitting.value = false
      }, 1500)
    }
  })
}
</script>

<style scoped>
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.contact-hero {
  text-align: center;
  margin-bottom: 50px;
  padding: 40px 0;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
}

.hero-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
}

.content-wrapper {
  margin-top: 30px;
}

.contact-card,
.info-card {
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 25px;
}

.info-item {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.info-icon {
  font-size: 1.8rem;
  color: #00c16e;
  margin-top: 5px;
}

.info-content h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 8px;
}

.info-content p {
  color: #7f8c8d;
  margin: 4px 0;
}

.social-links {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.map-container {
  margin-top: 30px;
}

.map-placeholder {
  height: 300px;
  background-color: #f8f9fa;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #7f8c8d;
}

.map-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.full-width {
  width: 100%;
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 30px 15px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .content-wrapper {
    margin-top: 20px;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>