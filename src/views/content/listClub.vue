<template>
  <div class="box">
    <div class="search-box">
      <el-form style="margin-top: 10px;margin-left: 10px;font-size: large;font-weight: bold">
        <el-form-item label="社团名:">
          <el-input type="text" style="width: 200px" v-model="searchValue" @keypress.enter.native="searchClub"></el-input>
          <el-button class="login-button" type="primary" @click="searchClub">搜索</el-button>
        </el-form-item>
      </el-form>

    </div>

    <div class="list-box">
    <el-table
      v-loading="loading"
      :data="clubLists"
      :row-class-name="tableRowClassName"
      style="width: 100%"
    class="el-table">
      <!-- <el-table-column
        prop="id"
        label="id"
        width="50">
      </el-table-column> -->
      <el-table-column
        prop="clubName"
        label="社团名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="clubCreator"
        label="创立者"
        width="100">
      </el-table-column>

      <el-table-column
        label="状态"
        width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.isDelete===0">
            <el-tag type="success" size="medium">已启用</el-tag>
          </div>

          <div v-if="scope.row.isDelete===1">
            <el-tag type="danger" size="medium">已关闭</el-tag>
          </div>

        </template>
      </el-table-column>

      <el-table-column
        label="创立时间"
        width="120">
        <template slot-scope="scope">
          <span v-text="formatDate(scope.row.createTime)" >
          </span>
        </template>
      </el-table-column>
            <el-table-column
        prop="amount"
        label="人数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="clubImg"
        label="图片"
        width="100">
        <!--插入图片链接的代码-->
        <template slot-scope="scope">
          <img  :src="scope.row.clubImg" alt="" style="width: 40px;height: 40px">
        </template>
      </el-table-column>

      <el-table-column
        label="描述">
        <template slot-scope="scope">
          <el-popover title="描述" trigger="hover" placement="top" width="500">
            <p>{{ scope.row.clubDesc }}</p>
            <div slot="reference">
              <p size="medium" style="white-space: nowrap;overflow: hidden;text-overflow:ellipsis;">{{ scope.row.clubDesc}}</p>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click="deleteItem(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

<div class="page-navigation-box margin-bottom clearfix">
  <el-pagination
    class="user-list-page-navigation-bar"
    background
    @current-change="currentPageChange"

    :current-page="pageNavigation.currentPage"
    :page-size="pageNavigation.pageSize"
    layout="prev, pager, next"
    :total="pageNavigation.totalCount">
  </el-pagination>
</div>

    </div>
    <div class="club-dialog">
      <el-dialog
        title="提示"
        :visible.sync="deleteDialogShow"
        width="400px">
        <span>你确定要删除  '{{deleteMassage}}'  这个社团吗</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteDialogShow = false">取 消</el-button>
            <el-button type="danger" @click="doDeleteItem">确 定</el-button>
        </span>
      </el-dialog>

    </div>
    <div class="club-dialog-box">
      <el-dialog :title="editTitle" :visible.sync="editorDialogShow"  >
        <div class="category-editor-box">
          <el-form label-width="80px">


          <el-form-item label="社团名" required>
            <el-input type="text" v-model="clubList.clubName"></el-input>
          </el-form-item>

          <el-form-item label="创立者" required>
            <el-input type="text" v-model="clubList.clubCreator"></el-input>
          </el-form-item>
            <el-form-item label="状态" required>
              <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>

          <el-form-item label="负责人ID" required>
            <el-input type="text" v-model="clubList.leaderId"></el-input>
          </el-form-item>

          <el-form-item label="社团介绍" required>
            <el-input type="textarea" :rows="5" v-model="clubList.clubIntroduce"></el-input>
          </el-form-item>

          <el-form-item label="社团描述" required>
            <el-input type="textarea" :rows="5" v-model="clubList.clubDesc"></el-input>
          </el-form-item>

          <el-form-item label="社团照片" required>
            <el-upload
              class="avatar-uploader"
              name="file"
              drag
              action="/api/user/image/uploadImage?original=club"
              :show-file-list="false"
              :on-success="uploadSuccess"
              multiple>
              <el-image fit="cover" v-if="clubList.clubImg" :src="clubList.clubImg" v-model="clubList.clubImg"></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif/psd文件，且不超过5MB</div>
            </el-upload>
          </el-form-item>

          </el-form>


        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog" type="primary">取 消</el-button>
          <el-button type="danger"
                     @click="postClub">{{editorCommitText}}</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import club from '../../api/club'
import * as dateUtils from '../../utils/date'
export default {
  data () {
    return {
      status:0,
      searchValue:'',
      value:'',
      loading:false,
      deleteDialogShow:false,
      editorDialogShow:false,
      editorCommitText:'修改社团',
      editTitle:'编辑社团',
      deleteMassage:'',
      deleteTargetId:'',
      pageNavigation:{
        currentPage:1,
        totalCount:0,
        pageSize:5,
      },
      clubLists:[],
      clubList: {
        id: '',
        clubCreator: '',
        clubDesc: '',
        clubImg: '',
        clubIntroduce: '',
        clubName: '',
        leaderId: '',
        isDelete: '',
        createdTime: '',
        updatedTime: ''
      }
    }

  },
  methods: {
    searchClub(){
      //检查数据
      if (this.searchValue != '') {
        club.doSearch(this.searchValue).then(response =>{
          if(response.data.code === 203){
            this.loading = false;
            this.clubLists = response.data.data.clubList
            this.pageNavigation.currentPage = response.data.data.currentPage;
            this.pageNavigation.pageSize = response.data.data.pageSize;
            this.pageNavigation.totalCount = response.data.data.totalCount;
          }
        })

      }else {
        this.getClubList()
      }

    },
    currentPageChange(page){
      this.pageNavigation.currentPage = page;
      this.getClubList()
    },
    /*图片上传成功*/
    uploadSuccess(res,file){
      console.log("图片上传成功 ==>"+res.data)
      /*对图片进行处理*/
      this.clubList.clubImg = res.data;
      if(res.code === 200){
        this.showSuccess("上传成功！")

      }else{
        this.showWarrning("图片过大，请重新上传！")
      }
    },

    //
    postClub(){

      //检查数据
      if (this.clubList.clubName === '') {
        this.showWarrning('社团名不能为空');
        return;
      }
      if (this.clubList.clubCreator === '') {
        this.showWarrning('创立者不能为空');
        return;
      }

      if (this.clubList.leaderId === '') {
        this.showWarrning('负责人ID不能为空');
        return;
      }

      if (this.clubList.clubIntroduce === '') {
        this.showWarrning('社团介绍不能为空');
        return;
      }

      if (this.clubList.clubDesc === '') {
        this.showWarrning('社团描述不能为空');
        return;
      }
      if (this.clubList.clubImg === '') {
        this.showWarrning('图片不能为空');
        return;
      }
      if(this.value === true){
        //启用
        this.clubList.isDelete = 0;
      }else {
        this.clubList.isDelete = 1;
      }
      this.editorDialogShow = false;
      //提交数据
      club.updateClub(this.clubList).then(resp =>{
        this.showSuccess(resp.data.msg);
        this.getClubList();
      })
      this.deleteDialogShow = false;
    },
    closeDialog(){
      this.resetLooper();
      this.editorDialogShow=false;
    },
    resetLooper(){
      this.clubList.id = '',
      this.clubList.clubCreator = '',
      this.clubList.clubDesc = '',
      this.clubList.clubImg = '',
      this.clubList.clubIntroduce = '',
      this.clubList.clubName = '',
      this.clubList.leaderId = ''
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1 || rowIndex === 5) {
        return 'warning-row';
      } else if (rowIndex === 3 || rowIndex === 7) {
        return 'success-row';
      }
      return '';
    },
    formatDate(dateStr){
      let date = new Date(dateStr);
      return dateUtils.formatDate(date,'yyyy-MM-dd')
    },
    edit(item){
      console.log(item.id)
      //最好的做法是请求单个数据，在显示
      this.clubList.clubName = item.clubName
      this.clubList.id = item.id
      this.clubList.clubCreator = item.clubCreator
      this.clubList.leaderId = item.leaderId
      this.clubList.clubIntroduce = item.clubIntroduce
      this.clubList.clubDesc = item.clubDesc
      this.clubList.isDelete = item.isDelete
      this.clubList.clubImg = item.clubImg
      this.editorDialogShow = true
      this.editorCommitText = '修改社团'
      this.editTitle = '编辑社团'
      if(this.clubList.isDelete === 0){
        this.value = true;
      }else{
        this.value = false;
      }
    },
    deleteItem(item){
      //不是马上删除，而是给出警告提示
      this.deleteDialogShow = true;
      this.deleteMassage = item.clubName;
      this.deleteTargetId = item.id
    },
    doDeleteItem(){
      club.deleteClub(this.deleteTargetId).then(resp=>{
        this.getClubList();
      })
      this.deleteDialogShow = false;
    },
    getClubList(){
      this.loading = true;
      club.getClubList(this.pageNavigation.currentPage,this.pageNavigation.pageSize,this.status)
        .then(response => {
          if (response.data.code === 200) {
            this.loading = false;
            this.clubLists = response.data.data.list
            this.pageNavigation.currentPage = response.data.data.pageNum;
            this.pageNavigation.pageSize = response.data.data.pageSize;
            this.pageNavigation.totalCount = response.data.data.total;
          }
        })
    },
    showWarrning(msg){
      this.$message({
        message:msg,
        type:'warning',
        center:true
      })
    },
    showSuccess(msg){
      this.$message({
        message:msg,
        type:'success',
        center:true
      })
    },
  },

  mounted () {
    this.getClubList();
  }
}
</script>

<style>
.list-box{
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  margin-top: 5px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.data-v-3cad7a59 {
  background: #409EFF;
}
.loop-list-box .el-table{
  min-height: 300px;
}
.user-list-page-navigation-bar{
  float: right;
  margin-right: 50px;
  margin-top: 10px;
}
</style>
