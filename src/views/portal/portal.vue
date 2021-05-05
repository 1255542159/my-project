<template>

  <div>
    <el-container>
      <el-header>
        <div class="header-context">
          <div class="logo">
            <a href="/">社团管理</a>
            </div>
          <div class="header-right">
            <router-link :to="{path:'pActivity'}">
              <span><i class="el-icon-s-home"></i>活动</span>
            </router-link>

            <router-link :to="{path:'pClub'}">
              <span><i class="el-icon-s-opportunity"></i>社团</span>
            </router-link>

            <router-link :to="{path:'pAbout'}">
              <span><i class="el-icon-info"></i>关于</span>
            </router-link>

            <router-link :to="{path:'login'}">
              <span><i></i>后台中心</span>
            </router-link>
          </div>
<!--          <div class="login-content">-->

<!--          </div>-->
        </div>
      </el-header>
      <el-main class="portal-main">
        <router-view></router-view>
      </el-main>
      <el-footer>Copyright © 2020-2021 社团管理系统</el-footer>
    </el-container>
  </div>
</template>

<script>

export default {
name: "portal.vue",

}
</script>

<style scoped>
.portal-main{
  height: 100%;
}
.header-context .header-right{
  text-decoration: none;
}
.header-context .header-right span{
  display: block;
  width: 80px;
  cursor:pointer;
  color: #92979A;
}
.header-context .header-right :hover{
  color: #0084FF;
  text-decoration: none;
}
.header-context{
  display: flex;
  justify-content: space-between;
}
.logo a{
  margin-left: 40px;
  cursor:pointer;
  color: #0084FF;
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
}
.header-right{
  display: flex;
  justify-content: space-between;
}
/*.header-right{*/
/*  margin-right: 10px;*/
/*}*/
.el-header{
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-footer{
  background-color: #F2F2FA;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #F2F2FA;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #F2F2FA;
  color: #333;
  text-align: center;
  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.index-page-box .carousel-box img{
  height: 900px;
}

</style>
