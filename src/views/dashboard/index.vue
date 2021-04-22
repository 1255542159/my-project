<template>
  <div class="dashboard-box">
    <div class="web-size-info-box">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="web-info-content">
            <div class="web-info-title">社团总数：</div>
            <div class="web-info-number">{{clubCount}}</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="web-info-content">
            <div class="web-info-title">注册用户：</div>
            <div class="web-info-number">{{UserCount}}</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="web-info-content">
            <div class="web-info-title">活动总量：</div>
            <div class="web-info-number">{{activityCount}}</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="web-info-content">
            <div class="web-info-title">评论总量：</div>
            <div class="web-info-number">{{commentCount}}</div>
          </div>
        </el-col>

      </el-row>

    </div>
    <div class="dashboard-bottom-part">
      <el-row :gutter="20">

        <el-col :span="9">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="dashboard-box-card-title">快捷操作</span>
              </div>
              <div  class="fast-way-list">
                <div class="fast-way-item">
                  <router-link class="el-icon-edit" to="/activity/add">发布活动</router-link>
                </div>
<!--                <div class="fast-way-item">-->
<!--                  <router-link class="el-icon-edit" to="/settings/web-site-info">修改网站消息</router-link>-->
<!--                </div>-->
<!--                <div class="fast-way-item">-->
<!--                  <router-link class="el-icon-edit" to="/settings/friend-link">添加友情链接</router-link>-->
<!--                </div>-->
                <div class="fast-way-item">
                  <router-link class="el-icon-edit" to="/activity/list">活动管理</router-link>
                </div>
                <div class="fast-way-item">
                  <router-link class="el-icon-edit" to="/system/list">轮播图管理</router-link>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>


        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="dashboard-box-card-title">登录日志</span>
              </div>
              <div  class="last-comment">
                Last login:
                <a v-text="temple.loginIp"></a>
                <el-divider></el-divider>
                RegIp:
                <a v-text="temple.regIp"></a>
                <el-divider></el-divider>
              </div>
            </el-card>
          </div>
        </el-col>


      </el-row>


    </div>
  </div>
</template>

<script>
import websiteInfo from '../../api/websiteInfo'
export default {
  name: "index",
  data() {
    return {

      activityCount:0,
      commentCount:0,
      UserCount:0,
      clubCount:0,
      comments:[],
      loginIp:'',
      temple:'',
    }
  },
  methods: {

    getUserCount() {
      websiteInfo.getUserCount().then(resp=>{
        if (resp.data.code === 200) {
          this.UserCount = resp.data.data
        }
      })
    },

    getClubCount() {
      websiteInfo.getClubCount().then(resp=>{
        if (resp.data.code === 200) {
          this.clubCount = resp.data.data
        }
      })
    },

    getActivityCount() {
      websiteInfo.getActivityCount().then(resp=>{
        if (resp.data.code === 200) {
          this.activityCount = resp.data.data
        }
      })
    },

    getLoginLog(){
      websiteInfo.getLoginLog().then(resp=>{
        if (resp.data.code === 200) {
          this.temple = resp.data.data
          console.log(this.temple)
        }
      })
    }
  },
  mounted() {
    this.getUserCount();
     this.getClubCount();
     this.getActivityCount();
     this.getLoginLog();
  }
}




</script>

<style>
.dashboard-box-card-title{
  font-size: 20px;
  font-weight: 600;
}
.dashboard-box{
  min-width: 100%;
  padding: 20px;

}
.bg-purple{
  background: #d3dce6;
}
.grid-content{
  border-radius: 4px;
  min-height: 36px;
}
.web-size-info-box{
  margin-bottom: 20px;
}
.web-info-content{
  height: 150px;
  box-shadow: 0 1px 10px #d4d4d4;
}
.web-info-title{
  padding: 20px;
  font-size: 20px;
}
.web-info-number{
  text-align: center;
  color: #1e90ff;
  font-size: 36px;
  font-weight: 600;
}
.fast-way-item{
  padding: 10px;
  margin-bottom: 5px;
}

.last-comment a{
  text-decoration: none;
}
</style>
