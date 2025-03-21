<template>
  <footer class="footer">
    <div class="footer-section">
      <h3>关于我们</h3>
      <ul>
        <li><a href="#">公司简介</a></li>
        <li><a href="#">联系方式</a></li>
        <li><a href="#">招聘信息</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>帮助中心</h3>
      <ul>
        <li><a href="#">常见问题</a></li>
        <li><a href="#">会员服务</a></li>
        <li><a href="#">设备支持</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>法律条款</h3>
      <ul>
        <li><a href="#">用户协议</a></li>
        <li><a href="#">隐私政策</a></li>
        <li><a href="#">版权声明</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>关注我们</h3>
      <div class="social-icons">
        <a href="#"><i class="el-icon-s-platform"></i></a>
        <a href="#"><i class="el-icon-s-promotion"></i></a>
        <a href="#"><i class="el-icon-s-cooperation"></i></a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.footer-section {
  width: 22%;
  min-width: 200px;
  margin-bottom: 20px;
}

.footer-section h3 {
  margin-bottom: 15px;
  font-size: 18px;
  border-bottom: 1px solid #4CAF50;
  padding-bottom: 5px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 10px;
}

.footer-section a {
  color: #ddd;
  text-decoration: none;
}

.footer-section a:hover {
  color: #4CAF50;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icons a {
  font-size: 24px;
}
</style>