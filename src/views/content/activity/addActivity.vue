<template>
<div class="activity-post-box">
    <!-- 标题 -->
    <div class="activity-title-part">
        <el-input v-model="activity.title" placeholder="请输入标题" maxlength="64" minlength="8"></el-input>
    </div>
    <!-- 内容编辑部分 -->
    <div class="activity-post-part">
        <mavon-editor v-model="activity.content" ref="mdEditor" @onImageClick="onEditorImageClick"></mavon-editor>
    </div>
    <!-- 活动封面 分类，标签 -->
    <div class="activity-post-setting-part">
        <el-form ref="activity" :model="activity" label-width="80px">
            <el-form-item label="活动分类" required>
                <el-select v-model="activity.clubId" placeholder="请选择分类" size="medium" @change="currentSel">
                    <el-option v-for="item in clubList" :key="item.id" :label="item.clubName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="摘要" required>
                <el-input type="textarea" :rows="3" placeholder="活动摘要" v-model="activity.summary">
                </el-input>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="活动开始" required>
                        <el-date-picker type="datetime" placeholder="选择开始日期" v-model="activity.startTime" style="width: 50%" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动结束" required>
                        <el-date-picker type="datetime" placeholder="选择开始日期" v-model="activity.endTime" style="width: 50%" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="封面" required>
                        <div class="activity-cover-selector" @click="showImageSelector">
                            <i class="el-icon-plus" v-if="activity.activityImg === ''"></i>
                            <el-image fit="cover" v-else :src="activity.activityImg"></el-image>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
    <!-- 发布草稿预览按钮 -->
    <div class="activity-post-action-bar clear:both">
        <div class="action-btn-container">
            <el-button plain size="small" @click="preView">全屏预览</el-button>
            <!-- <el-button plain size="medium">保存草稿</el-button> -->
            <el-button type="primary" size="small" @click="postActivity" v-text="postOrUpdate">发布活动</el-button>
        </div>
    </div>
    <!-- 图片上传dialog -->
    <div class="activity-post-dialog-box">
        <el-dialog title="提示" :visible.sync="isImageSelectorShow" width="500">
            <div class="image-selector-box">
                <div class="image-action-bar">
                    <el-upload class="image-selector-uploader" action="/api/user/image/uploadImage?original=activity" :show-file-list="false" :on-error="uploadError" :on-success="uploadSuccess" accept="image/*">
                        <el-button type="primary" size="medium">上传图片</el-button>
                    </el-upload>
                </div>
                <div class="image-selector-list clearfix">
                    <el-radio-group v-model="selectedImageIndex">
                        <el-radio-button :label="index" v-for="(item,index) in images" :key="index">
                            <el-image fit="cover" :src="item.url"></el-image>
                        </el-radio-button>
                    </el-radio-group>
                </div>
                <div class="image-picker-navigation">
                    <el-pagination class="user-list-page-navigation-bar" background @current-change="currentPageChange" :current-page="pageNavigation.currentPage" :page-size="pageNavigation.pageSize" layout="prev, pager, next" :total="pageNavigation.totalCount">
                    </el-pagination>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isImageSelectorShow = false" size="small">取 消</el-button>
                <el-button type="primary" @click="onImageSelected" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</div>
</template>

<script>
import club from "../../../api/club";
import user from "../../../api/user";
import editor from '../../../../lib/mavon-editor/mavon-editor';
import '../../../../lib/mavon-editor/css/index.css';
import Vue from 'vue'
Vue.use(editor);
export default {
    data() {
        return {
            onImageSelectFor: 'activity',
            postOrUpdate:'发布活动',
            pageNavigation: {
                currentPage: 1,
                totalCount: 0,
                pageSize: 10,
            },
            selectedImageIndex: 0,
            isImageSelectorShow: false,
            activity: {
                id:"",
                title: "",
                summary: "",
                content: "",
                startTime: "",
                endTime: "",
                sponsorId: "",
                activityImg: "",
                clubId: "",
            },
            clubList: [],
            images: [],
            status: 0,
        };
    },
    methods: {
        onEditorImageClick() {
            this.onImageSelectFor = "activity"
            this.isImageSelectorShow = true;
        },
        currentPageChange(page) {
            this.pageNavigation.currentPage = page;
            this.listImages();
        },
        uploadError(response) {
            this.$message.error("上传失败");
        },
        uploadSuccess(response) {
            if (response.code === 200) {
                this.listImages();
                this.$message.success(response.msg);
            }
        },
        onImageSelected() {
            //判断当前的操作
            //如果是活动插入到活动
            //如果是封面则作为封面
            //从数组里拿到当前选中的对象
            let item = this.images[this.selectedImageIndex];
            if (this.onImageSelectFor === 'activity') {
                this.$refs.mdEditor.toolbar_left_addlink('no-link', item.id, item.url)
            } else if (this.onImageSelectFor === 'activityImage') {
                this.activity.activityImg = item.url;
            }
            this.isImageSelectorShow = false;
        },
        showImageSelector() {
            //显示图片选择器
            this.onImageSelectFor = "activityImage"
            this.isImageSelectorShow = true;
        },
        //全屏预览
        preView() {
            this.$refs.mdEditor.toolbar_right_click('read');
        },
        //发布活动
        postActivity() {
            //检查数据
            if (this.activity.title == "") {
                this.showWarrning("标题不能为空");
                return;
            }
            if (this.activity.content == "") {
                this.showWarrning("内容不能为空");
                return;
            }
            if (this.activity.classify == "") {
                this.showWarrning("分类不能为空");
                return;
            }
            if (this.activity.summary == "") {
                this.showWarrning("摘要不能为空");
                return;
            }
            if (this.activity.title == "") {
                this.showWarrning("标题不能为空");
                return;
            }
            if (this.activity.startTime == "") {
                this.showWarrning("开始时间不能为空");
                return;
            }
            if (this.activity.endTime == "") {
                this.showWarrning("结束时间不能为空");
                return;
            }
            // if(this.activity.vue.activityImg == ''){
            //   this.showWarrning("封面不能为空");
            //   return;
            // }
            user.postActivity(this.activity).then((response) => {
                if (response.data.code === 200) {
                  this.activity = '';
                    this.showSuccess(response.data.msg);
                }
            });
        },

        currentSel(selVa) {
            //将clubName转化为clubId传入到activity.sponsorId内
            this.activity.clubId = this.activity.clubId;
            console.log("currentSel===>"+this.activity.clubId)
        },
        //获取全部的社团不分页
        getClubList() {
            club.clubList().then((response) => {
                if (response.data.code === 200) {
                    this.clubList = response.data.data;
                }
            });
        },
        showWarrning(msg) {
            this.$message({
                message: msg,
                type: "warning",
                center: true,
            });
        },
        showSuccess(msg) {
            this.$message({
                message: msg,
                type: "success",
                center: true,
            });
        },
        showError(msg) {
            this.$message({
                message: msg,
                type: "error",
                center: true,
            });
        },
        listImages() {
            user.listImages(this.pageNavigation.currentPage, this.pageNavigation.pageSize, 'activity').then((response) => {
                if (response.data.code === 200) {
                    this.images = response.data.data.list;
                    this.pageNavigation.currentPage = response.data.data.pageNum;
                    this.pageNavigation.pageSize = response.data.data.pageSize;
                    this.pageNavigation.totalCount = response.data.data.total;
                } else {
                    this.$message.error(response.data.msg);
                }
            })
        },
    },
    mounted() {
        //获取其他页面的传来的数据

        if (this.$route.params.activity != null) {
            this.postOrUpdate = "更新"
            this.activity = this.$route.params.activity;
            this.getClubList();
            this.clubList.clubId = this.activity.clubId;
            console.log(this.clubList.clubId)
            this.listImages();
        }
        this.getClubList();
        this.listImages();
    },
};
</script>

<style>
.image-picker-navigation {
    margin-top: 20px;
}

.image-action-bar {
    padding-left: 1px;
    margin-bottom: 20px;
}

.image-selector-list img {
    width: 104px;
    height: 100px;
    float: left;
}

.activity-title-part input {
    border: none;
    font-size: 20px;
}

.activity-cover-selector i {
    line-height: 140px;
    color: #dcdfe6;
    font-size: 20px;
}

.activity-cover-selector img {
    width: 200px;
    height: 140px;
}

.activity-cover-selector {
    cursor: pointer;
    width: 200px;
    height: 140px;
    text-align: center;
    border-radius: 4px;
    border: #dcdfe6 dashed 1px;
}

.activity-post-part .markdown-body {
    height: 600px;
    box-shadow: none !important;
    clear: both;
}

.action-btn-container {
    float: right;
    margin-right: 50px;
    padding: 10px;
}

.activity-post-setting-part {
    margin-top: 20px;
    margin-bottom: 120px;
}

.activity-post-part .v-note-op {
    position: sticky;
    top: 0;
}

.activity-post-action-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    margin-left: -175px;
    z-index: 1500;
    border-top: #e5e5e5 solid 1px;
    background: #fff;
}

.el-dialog__header {
    display: none;
}

.image-selector-list .el-radio-button__inner,
.el-radio-button:first-child .el-radio-button__inner,
.el-radio-button:last-child .el-radio-button__inner {
    border: none;
    border-radius: 4px;
    padding: 3px;
    margin: 5px;
}

.image-selector-uploader .el-upload__input {
    display: none;
}
</style>
