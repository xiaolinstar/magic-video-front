<template>
  <div class="page-container">
    <div class="about-content">
      <h1 class="page-title">关于我们</h1>
      <el-card class="info-card">
        <div class="company-intro">
          <h2>公司简介</h2>
          <p>Magic Video 是一家专注于视频内容创作与分享的科技公司，致力于为用户提供高品质的视频体验。</p>
          <el-divider />
          
          <h2>我们的团队</h2>
          <div class="team-members">
            <el-row :gutter="20">
              <el-col :span="8" v-for="n in 3" :key="n">
                <el-card shadow="hover">
                  <div class="avatar-placeholder"></div>
                  <h3>成员 {{ n }}</h3>
                  <p>职位描述</p>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.info-card {
  padding: 20px;
}

.company-intro h2 {
  color: #409EFF;
  margin: 20px 0;
}

.team-members {
  margin-top: 30px;
}

.avatar-placeholder {
  width: 100%;
  height: 200px;
  background-color: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 15px;
}

.el-divider {
  margin: 30px 0;
}

@media (max-width: 768px) {
  .el-col {
    margin-bottom: 20px;
  }
}
</style>