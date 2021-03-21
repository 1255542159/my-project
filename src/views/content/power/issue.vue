<template>
  <div class="box">
    <div class="list-box">
      <el-table
        :data="data"
        border stripe
        style="width: 100%">
        <!--索引列-->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="角色" prop="role.roleDesc"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="warning" icon="el-icon-setting"size="mini" @click="setRole(scope.row)">分配角色</el-button>
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
          :total="pageNavigation.totalCount"
        >
        </el-pagination>
      </div>
    </div>

    <div class="club-dialog-box">
      <el-dialog :title="title" :visible.sync="editorDialogShow">
          <div>
            <p>当前的用户:{{userInfo.name}}</p>
            <p>当前的角色:{{currentRoleDesc}}</p>
            <el-select v-model="selectedRoleId" placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleDesc"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editorDialogShow = false" type="info">取 消</el-button>
          <el-button type="primary" @click="issueRole">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import admin from "../../../api/admin";

export default {
  data() {
    return {
      title:"分配角色",
      role:[],
      search:'',
      pageNavigation: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 10,
      },
      data: [],
      editorDialogShow:false,
      status:0,
      //当前选择的用户信息
      userInfo:[],
      //当前用户角色描述
      currentRoleDesc:'',
      roleList:[],
      //待分配的角色id
      selectedRoleId:'',
    };
  },
  methods: {
    issueRole(){
      admin.roleIssue(this.userInfo.id,this.selectedRoleId).then((response) =>{
        if(response.data.code === 200){
          this.$message.success(response.data.msg)
          this.getPersonnelList();
        }else {
          this.$message.error(response.data.msg)
        }
      })
      this.editorDialogShow = false;

    },
    setRole(userInfo){
      this.currentRoleDesc = '';
      this.userInfo = userInfo;
      this.editorDialogShow = true;
      this.currentRoleDesc = this.userInfo.role.roleDesc;
    },

    currentPageChange(page) {
      this.pageNavigation.currentPage = page;
      this.getPersonnelList();
    },
    getPersonnelList() {
      this.loading = true;
      admin
        .getPersonnelList(
          this.pageNavigation.currentPage,
          this.pageNavigation.pageSize,
          this.status
        )
        .then((response) => {
          if (response.data.code === 200) {
            this.loading = false;
            this.data = response.data.data.list;
            this.pageNavigation.currentPage = response.data.data.pageNum;
            this.pageNavigation.pageSize = response.data.data.pageSize;
            this.pageNavigation.totalCount = response.data.data.total;
          }
        });
    },

    getRoleList () {
      admin.roleList().then((res) => {
        if(res.data.code === 200){
          this.roleList = res.data.data
        }
      })

    },

  },

  mounted() {
    this.getPersonnelList();
    this.getRoleList();
  },
};
</script>

<style>
.list-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  margin-top: 5px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.data-v-3cad7a59 {
  background: #409eff;
}

.loop-list-box .el-table {
  min-height: 300px;
}

.user-list-page-navigation-bar {
  float: right;
  margin-right: 50px;
  margin-top: 10px;
}
</style>
