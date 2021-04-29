<template>
  <div>
    <div class="header-left-box">
        <a href="/" class="header-logo float-left">社团管理中心</a>
    <div class="header-right-box float-right">
      <div class="header-user-info clearfix">

        <div class="header-user-avatar float-left">
          <span class="el-popover__reference-wrapper">
          </span>

          <img :src="avatar" style="object-fit: cover">
        </div>
        <div class="header-user-username float-left">
          <el-dropdown @command="handlerCommand">
                      <span class="el-dropdown-link">
                        {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">用户信息</el-dropdown-item>
              <el-dropdown-item command="systemInfo">系统通知</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import userInfo from '../api/userInfo'
import user from '../api/user.js'
export default {
  name: "TopHeader",
  data() {
    return {
      name:'',
      avatar:'',
    }
  },
  methods: {
    handlerCommand(command) {
      if (command === 'userInfo') {
        this.$router.push({
          path:'/user/Info'
        })
      }else if (command === 'logout') {
        user.logout().then(resp=>{
          //移除用户token
          window.localStorage.removeItem("cms_token")
          //跳转到登录页面
          this.$router.push({
            path:'/login'
          })
        })
      }else if(command === 'systemInfo'){
        this.$router.push({
          path:'/user/system'
        })
      }


    },
           getUserInfo() {
            userInfo.getUserInfo().then(resp => {
                if (resp.data.code === 200) {
                    //表示获取用户信息成功
                    //进行信息渲染
                    this.name = resp.data.data.name;
                    this.avatar = resp.data.data.avatar;

                }
            })
        }
  },
  mounted() {
     this.getUserInfo();
  }
}
</script>

<style >

.header-user-info{
  float: right;
  margin-right: 10px;
}
.header-user-username .el-dropdown-link{
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-left: 10px;
}
.header-user-avatar img{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  vertical-align: middle;
}
.header-logo{
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  float: left;
}
.header-user-username{
  float: right;

}

.float-left{
  float: left;
}
</style>
