<template>
  <div class="admin-login-box">
    <!--顶部内容-->
    <div class="admin-login-header-box">
      <div class="admin-login-header-center center">
        <div class="admin-login-logo">
          <a href="/index">社团管理系统 | 登录</a>
        </div>
      </div>
    </div>
    <!--中间内容-->
    <div class="admin-login-center-box">
      <div class="center login-center-box">
        <el-row :gutter="20">
          <el-col :span="13">
            <el-form label-position="right" label-width="100px" :model="user">
              <el-form-item label="账户">
                <el-input v-model="user.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  v-model="user.password"
                  type="password"
                  @keypress.enter.native="doLogin"
                ></el-input>
              </el-form-item>
              <el-form-item class="button">
                <el-button class="login-button" type="primary" @click="doLogin"
                  >登录</el-button
                >
                <el-button class="login-button" type="danger" @click="doRegister"
                >注册</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import login from "../api/login";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      loginInfo: {
        verifyCode: "",
        captcha_key: "",
      },
      captchaPath: "",
    };
  },
  methods: {
    toastE(msg) {
      this.$message({
        message: msg,
        center: true,
        type: "error",
      });
    },
    doLogin() {
      //todo：
      //发起登录
      //检查数据，向服务器提交数据，处理结果
      if (this.user.username === "") {
        this.toastE("账户不能为空");
        return;
      }
      if (this.user.password === "") {
        this.toastE("密码不能为空");
        return;
      }

      login.doLogin(this.user).then((response) => {
        //如果成功则跳转---判断角色，如果是普通用户，跳转到门户页，如果是管理员，跳转到管理中心
        //登录成功
        if (response.data.code === 200) {

          let cms_token = response.headers.cms_token;
          //todo:需要判断角色
          //取出token,存入本地
          window.localStorage.setItem("cms_token", cms_token);
          window.localStorage.setItem("avatar", response.data.data.avatar);
          window.localStorage.setItem("name", response.data.data.name);
          this.$router.push({ path: "/admin" });
        } else {
          this.updateVerifyCode();
        }
      });
    },


    doRegister(){
      this.$router.push({ path: "/register" });
    },
    updateVerifyCode() {
      this.captchaPath =
        "http://localhost:8080/common/captcha?captcha_key=" +
        this.loginInfo.captcha_key;
    },
  },
  mounted() {
    //todo:检查登录是否有效
    //如果已经登录了，跳转到管理员界面
    this.loginInfo.captcha_key = Date.parse(new Date());
    this.updateVerifyCode();
  },
};
</script>

<style scoped>
.captcha-code {
  cursor: pointer;
  vertical-align: middle;
  width: 120px;
  height: 42px;
  margin-left: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-top: solid 1px #e6e6e6;
  border-left: solid 1px #e6e6e6;
  border-bottom: solid 1px #e6e6e6;
  border-right: solid 1px #e6e6e6;
}

.admin-login-header-box {
  margin-bottom: 20px;
  widows: 100%;
  height: 46px;
  background-color: dodgerblue;
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
</style>
