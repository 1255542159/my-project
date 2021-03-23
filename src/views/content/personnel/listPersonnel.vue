<template>
  <div class="box">
    <div class="list-box">
      <el-table
        v-loading="loading"
        :data="personnelLists"
        :row-class-name="tableRowClassName"
        style="width: 100%"
        class="el-table"
      >
        <el-table-column  width="50" label="序号" type="index"> </el-table-column>
        <el-table-column prop="sno" label="学号" width="110"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>

        <el-table-column prop="sex" label="性别" width="80"> </el-table-column>
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
        <el-table-column prop="phone" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="200">
        </el-table-column>
        <el-table-column label="隶属于部门">
          <template slot-scope="scope">
            <el-popover
              title="隶属于部门"
              trigger="hover"
              placement="top"
              width="200"
            >
              <p>{{ scope.row.club.clubName }}</p>
              <div slot="reference">
                <p
                  size="medium"
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ scope.row.club.clubName }}
                </p>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
        align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="primary" size="mini"
              >编辑</el-button
            >
            <el-button @click="deleteItem(scope.row)" type="danger" size="mini"
              >删除</el-button
            >
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
    <div class="club-dialog">
      <el-dialog title="提示" :visible.sync="deleteDialogShow" width="400px">
        <span>你确定要删除 '{{ deleteMassage }}' 这个成员吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteDialogShow = false"
            >取 消</el-button
          >
          <el-button type="danger" @click="doDeleteItem">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="club-dialog-box">
      <el-dialog :title="editTitle" :visible.sync="editorDialogShow">
        <div class="category-editor-box">
          <el-form label-width="80px">
            <el-form-item label="学号" required>
              <el-input type="text" v-model="personnelList.sno"></el-input>
            </el-form-item>
            <el-form-item label="姓名" required>
              <el-input type="text" v-model="personnelList.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" required>
              <el-select
                v-model="personnelList.sex"
                placeholder="请选择"
                @change="currentSex">
                <el-option
                  v-for="item in sexList"
                  :key="item.id"
                  :label="item.sex"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" required>
              <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="手机号" required>
              <el-input type="text" v-model="personnelList.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" required>
              <el-input type="text" v-model="personnelList.email"></el-input>
            </el-form-item>
            <el-form-item label="部门" required>
              <el-select
                v-model="personnelList.club.clubName"
                placeholder="请选择"
                @change="currentSel"
              >
                <el-option
                  v-for="item in clubList"
                  :key="item.id"
                  :label="item.clubName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog" type="primary">取 消</el-button>
          <el-button type="danger" @click="postClub"
            >{{ editorCommitText }}
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import club from "../../../api/club";
import user from "../../../api/user";
import * as dateUtils from "../../../utils/date";

export default {
  data() {
    return {
      default_value: "",
      searchValue: "",
      value: "",
      loading: false,
      deleteDialogShow: false,
      editorDialogShow: false,
      editorCommitText: "修改人员",
      editTitle: "编辑人员",
      deleteMassage: "",
      deleteTargetId: "",
      search:'',
      pageNavigation: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 10,
      },
      personnelLists: [],
      clubList: [],
      sexList: [
        { id: 1, sex: "男" },
        { id: 2, sex: "女" },
      ],
      personnelList: {
        id: "",
        sno:"",
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
      item: {},
      status:0
    };
  },
  methods: {
    //选择器值获取
    currentSel(selVa) {
      this.personnelList.clubId = this.personnelList.club.clubName;
    },
    currentSex(selVa) {
      console.log(selVa);
      if (selVa == 1) {
        this.personnelList.sex = "男";
      }
      if (selVa == 2) {
        this.personnelList.sex = "女";
      }
    },
    searchPersonnel() {
      //检查数据
      if (this.searchValue != "") {
        club.searchPersonnel(this.searchValue).then((response) => {
          if (response.data.code === 203) {
            this.loading = false;
            this.personnelLists = response.data.data.personnelList;
            this.pageNavigation.currentPage = response.data.data.currentPage;
            this.pageNavigation.pageSize = response.data.data.pageSize;
            this.pageNavigation.totalCount = response.data.data.totalCount;
          }
        });
      } else {
        this.getPersonnelList();
      }
    },
    currentPageChange(page) {
      this.pageNavigation.currentPage = page;
      this.getPersonnelList();
    },
    /*图片上传成功*/
    uploadSuccess(res, file) {
      console.log("图片上传成功 ==>" + res.data);
      /*对图片进行处理*/
      this.clubList.clubImg = "http://" + res.data;
      if (res.code === 200) {
        this.showSuccess("上传成功！");
      } else {
        this.showWarrning("图片过大，请重新上传！");
      }
    },

    //修改成员信息
    postClub() {
      //检查数据
      if (this.personnelList.name === "") {
        this.showWarrning("昵称不能为空");
        return;
      }if (this.personnelList.sno === "") {
        this.showWarrning("学号不能为空");
        return;
      }
      if(this.value === true){
        //启用
        this.personnelList.status = 0;
      }else {
        this.personnelList.status = 1;
      }
      this.editorDialogShow = false;
      //提交数据
      user.updatePersonnel(this.personnelList).then((resp) => {
        if(resp.data.code === 200){
          this.showSuccess(resp.data.msg)
        }
        this.getPersonnelList();
      });
      this.deleteDialogShow = false;
    },
    closeDialog() {
      this.resetLooper();
      this.editorDialogShow = false;
    },
    resetLooper() {
      // this.personnelList.id = '',
      //   this.personnelList.clubCreator = '',
      //   this.personnelList.clubDesc = '',
      //   this.personnelList.clubImg = '',
      //   this.personnelList.clubIntroduce = '',
      //   this.personnelList.clubName = '',
      //   this.personnelList.leaderId = ''
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1 || rowIndex === 5) {
        return "warning-row";
      } else if (rowIndex === 3 || rowIndex === 7) {
        return "success-row";
      }
      return "";
    },
    formatDate(dateStr) {
      let date = new Date(dateStr);
      return dateUtils.formatDate(date, "yyyy-MM-dd");
    },
    edit(item) {
      //获取社团，得到社团名供选择
      this.getClubList();
      //最好的做法是请求单个数据，在显示
      this.personnelList.name = item.name;
      this.personnelList.id = item.id;
      this.personnelList.phone = item.phone;
      this.personnelList.email = item.email;
      this.personnelList.sex = item.sex;
      this.personnelList.createdTime = item.createdTime;
      this.personnelList.club.clubName = item.club.clubName;
      this.personnelList.clubId = item.club.id;
      this.personnelList.status = item.status;
      this.personnelList.sno = item.sno;
      this.editorDialogShow = true;
      this.editorCommitText = "修改人员";
      this.editTitle = "编辑人员";
      this.clubList.clubName = item.clubName;
      if(this.personnelList.status === 0){
        this.value = true;
      }else{
        this.value = false;
      }
    },
    deleteItem(item) {
      //不是马上删除，而是给出警告提示
      this.deleteDialogShow = true;
      this.deleteMassage = item.nickName;
      this.deleteTargetId = item.id;
    },
    doDeleteItem() {
      user.deletePersonnel(this.deleteTargetId).then((resp) => {
        if (resp.data.code === 200) {
          this.getPersonnelList();
        }
      });
      this.deleteDialogShow = false;
    },
    getPersonnelList() {
      this.loading = true;
      user
        .getPersonnelList(
          this.pageNavigation.currentPage,
          this.pageNavigation.pageSize,
          this.status
        )
        .then((response) => {
          if (response.data.code === 200) {
            this.loading = false;
            this.personnelLists = response.data.data.list;
            this.pageNavigation.currentPage = response.data.data.pageNum;
            this.pageNavigation.pageSize = response.data.data.pageSize;
            this.pageNavigation.totalCount = response.data.data.total;
          }
        });
    },

    //获取全部的社团不分页
    getClubList() {
      club.getClubList(0, 0,this.status).then((response) => {
        if (response.data.code === 200) {

          this.clubList = response.data.data.list;
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
  },

  mounted() {
    this.getPersonnelList();
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
