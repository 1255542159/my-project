<template>
<div>
    <div class="user-info-box">
        <el-form>
            <div class="content-box">
                <main class="el-main" id="page" style="min-height: 0px">
                    <div id="accountSetting">
                        <div class="title">
                            <span>账号信息</span>
                        </div>
                        <div class="content">
                            <div class="user-info">
                                <div class="el-row">
                                    <div class="el-col el-col-4 ">
                                        <img fit="fill" :src="user.avatar" shape="circle" class="el-avatar">
                                        <div class="update-avatar-tips" @click="showAvatarDialog"></div>
                                    </div>

                                    <div class="el-col el-col-14">
                                        <div class="nick-name" v-text="user.name"></div>
                                        <div class="sex" v-text="user.sex"></div>
                                    </div>
                                    <div class="el-col el-col-6">
                                        <button type="button" class="el-button  el-icon-edit el-button--primary el-button--small is-plain">
                                            <!---->
                                            <!----><span>&nbsp;修改信息
                                            </span></button>
                                    </div>
                                </div>
                            </div>
                            <el-divider></el-divider>
                            <div class="work-info">
                                <div class="sign-container">
                                    <div class="el-row">
                                        <div class="el-col el-col-4">
                                            <div class="title el-icon-edit-outline">
                                                &nbsp;签名
                                            </div>
                                        </div>
                                        <div class="el-col el-col-14">
                                            <div v-text="user.sign"></div>
                                            <!---->
                                        </div>
                                        <div class="el-col el-col-6">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <el-divider></el-divider>
                            <div class="email-box">
                                <div class="el-row">
                                    <div class="el-col el-col-4">
                                        <div class="title el-icon-s-promotion">&nbsp;邮箱</div>
                                    </div>
                                    <div class="el-col el-col-14">
                                        <div v-text="user.email"></div>
                                    </div>
                                    <div class="el-col el-col-6">
                                        <button type="button" class="el-button modify-info-btn el-button--primary el-button--small is-plain">
                                            <!---->
                                            <!----><span>
                                                更换邮箱
                                            </span></button>
                                    </div>
                                </div>
                            </div>
                            <el-divider></el-divider>
                            <div class="phone-box">
                                <div class="phone-container">
                                    <div class="el-row">
                                        <div class="el-col el-col-4">
                                            <div class="title el-icon-s-promotion">&nbsp;手机</div>
                                        </div>
                                        <div class="el-col el-col-14">
                                            <div v-text="user.phone"></div>
                                        </div>
                                        <div class="el-col el-col-6">
                                            <button type="button" class="el-button modify-info-btn el-button--primary el-button--small is-plain">
                                                <!---->
                                                <!----><span>
                                                    更换号码
                                                </span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </el-form>
    </div>
    <div class="user-info-dialog">
        <avatar-upload field="file" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" v-model="showAvatar" :width="300" :height="300" url="/api/user/image/uploadImage?original=avatar" img-format="png">
        </avatar-upload>
    </div>
</div>
</template>

<script>
import userInfo from '../../api/userInfo'
import user from '../../api/user'
import avatarUpload from 'vue-image-crop-upload';
export default {
    components: {
        'avatar-upload': avatarUpload
    },
    name: 'userInfo',
    data() {
        return {
            showAvatar: false,
            user: {
                id: "",
                sno: "",
                name: "",
                sex: "",
                phone: "",
                email: "",
                status: "",
                clubId: "",
                club: {
                    id: "",
                    clubName: "",
                },
            },
        }
    },
    methods: {
        cropUploadFail(status, field) {
            console.log("1" + status + field)
        },
        cropUploadSuccess(jsonData, field) {
            if (jsonData.code === 200) {
                this.user.avatar = jsonData.data;
                //更新新用户信息
                user.updatePersonnel(this.user).then((response) => {
                    if (response.data.code === 200) {
                        this.$message.success(jsonData.msg);
                        this.showAvatar = false;
                    }
                })
            }
        },
        showAvatarDialog() {
            this.showAvatar = true;
        },
        getUserInfo() {
            userInfo.getUserInfo().then(resp => {
                if (resp.data.code === 200) {
                    //表示获取用户信息成功
                    //进行信息渲染
                    this.user.id = resp.data.data.id;
                    this.user.sno = resp.data.data.sno;
                    this.user.name = resp.data.data.name;
                    this.user.sex = resp.data.data.sex;
                    this.user.avatar = resp.data.data.avatar;
                    this.user.phone = resp.data.data.phone;
                    this.user.email = resp.data.data.email;
                    this.user.sign = resp.data.data.sign;
                    this.user.clubId = resp.data.data.clubId;
                }
            })
        }
    },
    mounted() {
        this.getUserInfo();
    }
}
</script>

<style scoped>
.content-box {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
}

.el-avatar {
    width: 100px;
    border-radius: 50%;
    cursor: pointer;
    height: 100px;
}

#accountSetting .title span {
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
}
#accountSetting .content .user-info img {
  height: 100px;
  width: 100px;
}
#accountSetting .content .user-info .update-avatar-tips {
    opacity: 0.1;
    text-align: center;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 100px;
    color: #fff;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    cursor: pointer;
    width: 100px;
}

.el-divider--horizontal {
    margin: 8px 0;
    background: 0 0;
    border-top: 1px dashed #e8eaec;
}
</style>
