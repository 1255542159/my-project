<template>
  <div class="admin-login-box">
    <!--顶部内容-->
    <div class="admin-login-header-box">
      <div class="admin-login-header-center center">
        <div class="admin-login-logo">
          <a href="/index">社团管理系统 | 注册</a>
        </div>
      </div>
    </div>
    <!--中间内容-->
    <div class="admin-login-center-box">
      <div class="center login-center-box">
        <el-row :gutter="20">
          <el-col :span="13">
            <el-form label-position="right" label-width="100px" :model="user">

              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple">
                  <el-form-item label="学号" required>
                    <el-input type="text" v-model="user.sno"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" required>
                    <el-input type="text" v-model="user.name"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" required>
                    <el-select v-model="user.sex" placeholder="请选择" @change="currentSex">
                      <el-option v-for="item in sexList" :key="item.id" :label="item.sex" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="手机号" required>
                    <el-input v-model="user.username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" required>
                    <el-input
                      v-model="user.password"
                      type="password"
                    ></el-input>
                  </el-form-item>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <div>
                    <el-form-item  class="user-info-avatar">
                      <div class="user-avatar-container" @click="showAvatarDialog">
                        <el-avatar :src="user.avatar"></el-avatar>
                      </div>
                    </el-form-item>
                  </div>
                </div></el-col>
              </el-row>

              <el-form-item class="button">
                <el-button class="login-button" type="primary" @click="doRegister"
                  >注册</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>

    </div>
    <div class="user-info-dialog">
      <avatar-upload field="file"
                     @crop-upload-success="cropUploadSuccess"
                     @crop-upload-fail="cropUploadFail"
                     v-model="showAvatar" :width="300" :height="300"
                     url="/api/user/image/uploadImage?original=avatar"
                     img-format="png"></avatar-upload>
    </div>
  </div>
</template>
<script>
import avatarUpload from 'vue-image-crop-upload';
import user from "../api/user"
export default {
  components: {
    'avatar-upload': avatarUpload
  },
  data() {
    return {
      showAvatar: false,
      user: {
        id: "",
        name: "",
        sno: "",
        sex: "",
        avatar: "",
        phone: "",
        email: "",
        sign: "",
        clubId: "",
        parentId: "",
        password:"",
      },
      sexList: [
        { id: 1, sex: "男" },
        { id: 2, sex: "女" },
      ],
    };
  },
  methods: {
    cropUploadFail(status, field) {
      console.log("1"+status + field)
    },
    cropUploadSuccess(jsonData, field) {
      if(jsonData.code === 200){
        this.user.avatar = jsonData.data;
        this.$message.success(jsonData.msg);
        this.showAvatar = false;
      }
    },
    showAvatarDialog() {
      this.showAvatar = true;
    },
    currentSex(selVa) {
      if (selVa == 1) {
        this.user.sex = "男";
      }
      if (selVa == 2) {
        this.user.sex = "女";
      }
    },
    doRegister() {
      //todo：
      //发起注册
      //检查数据，向服务器提交数据，处理结果
      if (this.user.sno === "") {
        this.$message.error("学号不能为空");
        return;
      }
      if (this.user.name === "") {
        this.$message.error("姓名不能为空");
        return;
      }

      if (this.user.sex === "") {
        this.$message.error("性别不能为空");
        return;
      }
      if (this.user.username === "") {
        this.$message.error("账户不能为空");
        return;
      }
      if (this.user.password === "") {
        this.$message.error("密码不能为空");
        return;
      }
      user.addPersonnel(this.user).then((response) =>{
          if(response.data.code === 200){
            this.$message.success(response.data.msg)
          }else {
            this.$message.error(response.data.msg)
          }

      })
    },

  },
  mounted() {
  },
};
</script>

<style>
.user-avatar-container .el-avatar{
  width: 100px;
  height: 100px;
}

.user-info-avatar{
  display: inline-block;
  margin-left: 200px;
}


.center {
  margin: 0 auto;
  width: 1140px;
}
.admin-login-header-center {
  line-height: 46px;
}
.login-center-box .el-input {
  width: 200px;
}

.login-center-box {
  border-radius: 4px;
  padding: 20px;
  width: 1100px;
  background-color: #fff;
  box-shadow: 0 1px 10px #afafaf;
}
.admin-login-logo {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}
.admin-login-logo a{
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  text-decoration-line: none;
}
.login-center-box .el-form-item__label {
  background: #fbfbfb;
  border: solid 1px #e6e6e6;
  border-left: solid 1px #e6e6e6;
  border-top: solid 1px #e6e6e6;
  border-bottom: solid 1px #e6e6e6;
  text-align: center;
}

.login-center-box .el-input__inner {
  border-radius: 0;
  border: solid 1px #e6e6e6;
  height: 42px;
}
.button .login-button {
  margin-left: 10px;
}
.button .register-button {
  margin-left: 30px;
}
.admin-login-header-box{
  margin-bottom: 20px;
  widows: 100%;
  height: 46px;
  background-color: dodgerblue;
}
</style>
