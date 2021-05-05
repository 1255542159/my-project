<template>
  <div class="club-box">
    <el-table
      :data="looper"
      style="width: 100%">
      <el-table-column label="序号" width="50" type="index">

      </el-table-column>
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="地址"
        width="500">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 0">
            <el-tag type="success" size="medium">已启用</el-tag>
          </div>
          <div v-if="scope.row.status === 1">
            <el-tag type="danger" size="medium">已关闭</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-button
            size="medium" type="primary" @click="showImageSelector">添加轮播图</el-button>
        </template>
        <template slot-scope="scope">
<!--          <el-button-->
<!--            size="mini"-->
<!--            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="activity-post-dialog-box">
      <el-dialog title="提示" :visible.sync="isImageSelectorShow" width="500">
        <div class="image-selector-box">
          <div class="image-action-bar">
            <el-upload class="image-selector-uploader" action="/api/user/image/uploadImage?original=carousel" :show-file-list="false" :on-error="uploadError" :on-success="uploadSuccess" accept="image/*">
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
import admin from '../../../api/admin'
import user from '../../../api/user'
export default {

  data() {
    return {
      looper:[],
      pageNavigation: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 10,
      },
      selectedImageIndex: 0,
      isImageSelectorShow: false,
      images: [],
    };
  },
  methods:{
    handleDelete(item){
      admin.carouselDelete(item.id).then((response) =>{
        if(response.data.code === 200){
          this.$message.success(response.data.msg);
        }
        this.getLooper();
      })
    },
    getLooper(){
      admin.carouselList().then((response) =>{
        console.log(response.data)
        this.looper = response.data.data;
      })
    },
    showImageSelector() {
      //显示图片选择器
      this.isImageSelectorShow = true;
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
      console.log(item)
      this.isImageSelectorShow = false;
    },
    listImages() {
      user.listImages(this.pageNavigation.currentPage, this.pageNavigation.pageSize, 'carousel').then((response) => {
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

  mounted () {
    this.getLooper();
    this.listImages();
  }

};
</script>

<style scoped>

.image-action-bar {
  padding-left: 1px;
  margin-bottom: 20px;
}


.el-upload el-upload--text{
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: 0;
}
.clearfix {
  overflow: auto;
  zoom: 1;
}
.avatar-uploader i {
  line-height: 140px;
  color: #DCDFE6;
  font-size: 20px;
}
.image-selector-list img {
  width: 104px;
  height: 100px;
  float: left;
}

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
.image-selector-uploader .el-upload__input {
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



</style>
