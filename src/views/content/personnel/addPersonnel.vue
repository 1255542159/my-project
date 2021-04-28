<template>
<div class="club-box">
    <div class="user-info-list-part">
        <el-form label-width="100px" class="demo-ruleForm" v-if="user !== null" size="medium">
            <el-row>
                <el-col :span="12">
                    <div>
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
                    </div>
                </el-col>
                <el-col :span="12">
                    <div>
                        <el-form-item label="头像" class="user-info-avatar">
                            <div class="user-avatar-container" @click="showAvatarDialog">
                                <el-avatar :src="user.avatar"></el-avatar>
                            </div>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-form-item label="密码" required>
                <el-input type="text" v-model="user.password"></el-input>
            </el-form-item>

            <el-form-item label="手机号" required>
                <el-input type="text" v-model="user.phone"></el-input>
            </el-form-item>

            <el-form-item label="邮箱">
                <el-input type="text" v-model="user.email"></el-input>
            </el-form-item>

            <el-form-item label="部门">
                <el-select v-model="user.club.clubName" placeholder="请选择" @change="currentSel">
                    <el-option v-for="item in clubList" :key="item.id" :label="item.clubName" :value="item.id">
                    </el-option>
                </el-select>
                <!-- <i>不选择部门代表是社团管理员</i> -->
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addPersonnel" style="margin-left: 65px">添加</el-button>
            </el-form-item>
        </el-form>
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
import club from "../../../api/club";
import user from "../../../api/user";
import avatarUpload from 'vue-image-crop-upload';
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
                club: {
                    id: "",
                    clubName: "",
                },
            },
            clubList: [],
            sexList: [
                { id: 1, sex: "男" },
                { id: 2, sex: "女" },
            ],
            item: {},
            status:0
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
        currentSel(selVa) {
            //将clubName转化为clubId传入到user.clubId内
            this.user.clubId = this.user.club.clubName;
            console.log("currentSel   ===>" + this.user.clubId);
        },
        currentSex(selVa) {
            console.log(selVa);
            if (selVa == 1) {
                this.user.sex = "男";
            }
            if (selVa == 2) {
                this.user.sex = "女";
            }
        },
        //获取全部的社团不分页
        getClubList() {
            club.clubList().then((response) => {
                if (response.data.code === 200) {
                    this.clubList = response.data.data;
                }
            });
        },
        //头像上传
        handleAvatarSuccess(res, file) {
            this.user.avatar = res.data;
        },
        //添加人员
        addPersonnel() {
            //检查数据
            if (this.user.sno === "") {
                this.$message.error("学号不能为空");
                return;
            }
            if (this.user.name === "") {
              this.$message.error("姓名不能为空");
                return;
            }
            if (this.user.password === "") {
              this.$message.error("密码不能为空");
                return;
            }
            if (this.user.sex === "") {
              this.$message.error("性别不能为空");
                return;
            }
            if (this.user.phone === "") {
              this.$message.error("手机号不能为空");
                return;
            }
            user.addPersonnel(this.user).then((resp) => {
                    //成功后将输入框置空
                    this.user = "";
            });
        },


    },
    mounted() {
        this.getClubList();
    },
};
</script>

<style scoped>
.club-box .el-input {
    width: 250px;
}

.user-info-list-part {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 10px;
}

.avatar-uploader {
    cursor: pointer;
    width: 200px;
    height: 140px;
    text-align: center;
    border-radius: 4px;
    border: #DCDFE6 dashed 1px;
}

.avatar-uploader i {
    line-height: 140px;
    color: #DCDFE6;
    font-size: 20px;
}

.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
.user-info-avatar{
    display: inline-block;
}
.user-avatar-container{
    width: 100px;
    height: 100px;
    cursor: pointer;
}
.user-avatar-container .el-avatar{
    width: 100px;
    height: 100px;
}
</style>
