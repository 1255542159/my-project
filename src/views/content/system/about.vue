<template>
  <div class="activity-post-box">

    <!-- 内容编辑部分 -->
    <div class="activity-post-part">
      <mavon-editor v-model="settings.value" ref="mdEditor" @onImageClick="onEditorImageClick"></mavon-editor>
    </div>

    <!-- 发布草稿预览按钮 -->
    <div class="activity-post-action-bar clear:both">
      <div class="action-btn-container">
        <el-button plain size="small" @click="preView">全屏预览</el-button>
        <el-button type="primary" size="small" @click="postActivity" v-text="postOrUpdate"></el-button>
      </div>
    </div>
    <!-- 图片上传dialog -->
    <div class="activity-post-dialog-box">
      <el-dialog title="提示" :visible.sync="isImageSelectorShow" width="500">
        <div class="image-selector-box">
          <div class="image-action-bar">
            <el-upload class="image-selector-uploader" action="/api/user/image/uploadImage?original=about" :show-file-list="false" :on-error="uploadError" :on-success="uploadSuccess" accept="image/*">
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
import admin from "../../../api/admin";
import user from "../../../api/user";
import editor from '../../../../lib/mavon-editor/mavon-editor';
import '../../../../lib/mavon-editor/css/index.css';
import Vue from 'vue'
Vue.use(editor);
export default {
  data() {
    return {
      settings:{
        key:'about',
        value:'',
      },
      postOrUpdateStatus:0,
      onImageSelectFor: 'about',
      postOrUpdate:'确定',
      pageNavigation: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 10,
      },
      selectedImageIndex: 0,
      isImageSelectorShow: false,
      images: [],
      status: 0,
    };
  },
  methods: {
    onEditorImageClick() {
      this.onImageSelectFor = "about"
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
      if (this.onImageSelectFor === 'about') {
        this.$refs.mdEditor.toolbar_left_addlink('no-link', item.id, item.url)
      }
      this.isImageSelectorShow = false;
    },
    showImageSelector() {
      //显示图片选择器
      this.isImageSelectorShow = true;
    },
    //全屏预览
    preView() {
      this.$refs.mdEditor.toolbar_right_click('read');
    },
    //发布活动
    postActivity() {
      //检查数据
      if (this.settings.value == "") {
        this.$message.info("内容不能为空")
        return;
      }

      admin.saveAbout(this.settings).then((res) =>{
        if(res.data.code == 200){
          this.$message.success(res.data.msg)
        }else {
          this.$message.error(res.data.msg)
        }
      })

    },

    listImages() {
      user.listImages(this.pageNavigation.currentPage, this.pageNavigation.pageSize, 'about').then((response) => {
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
    getAbout(){
      admin.getAbout().then((res) =>{
        console.log("====>"+res.data)
        if(res.data.code === 200){
          this.settings = res.data.data;
        }
      })
    },
  },
  mounted(){
    this.listImages();
    this.getAbout();
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

.activity-post-part .markdown-body {
  height: 500px;
  box-shadow: none !important;
  clear: both;
}

.action-btn-container {
  float: right;
  margin-right: 50px;
  padding: 10px;
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
