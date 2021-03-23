<template>
  <div class="box">
    <div class="list-box">
      <el-table
        :data="audit"
        style="width: 100%">
        <el-table-column
          label="日期"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 'join'">
              <el-tag type="success" size="medium">入团</el-tag>
            </div>
            <div v-if="scope.row.type === 'leave'">
              <el-tag type="danger" size="medium">请假</el-tag>
            </div>
            <div v-if="scope.row.type === 'quit'">
              <el-tag type="danger" size="medium">退团</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 1">
              <el-tag type="success" size="medium">已通过</el-tag>
            </div>
            <div v-if="scope.row.status === 2">
              <el-tag type="danger" size="medium">审核中</el-tag>
            </div>
            <div v-if="scope.row.status === 3">
              <el-tag type="danger" size="medium">未通过</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-navigation-box margin-bottom clearfix">
      <el-pagination class="user-list-page-navigation-bar" background @current-change="currentPageChange" :current-page="pageNavigation.currentPage" :page-size="pageNavigation.pageSize" layout="prev, pager, next" :total="pageNavigation.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import user from "../../../api/user";
export default {
  data() {
    return {
      loading: false,
      pageNavigation: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 5,
      },
      audit: []
    };
  },
  methods: {
    //同意
    handleEdit(item) {
      //跳转到申请
      this.$router.push({
        'path': '/apply/join',
        'name': '申请',
        params: { audit: item }

      });
    },
    currentPageChange(page) {
      this.pageNavigation.currentPage = page;
      this.getAuditList();
    },

    //删除
    handleDelete(item) {
      let id = item
      user.auditDelete(id).then((response) =>{
        if(response.data.code === 200){
          this.$message.success(response.data.msg)
        }
        this.getAuditList();
      })

    },

    getAuditList() {
      this.loading = true;
      user
        .auditList(
          this.pageNavigation.currentPage,
          this.pageNavigation.pageSize
        )
        .then((response) => {
          if (response.data.code === 200) {
            this.loading = false;
            this.audit = response.data.data.list;
            this.pageNavigation.currentPage = response.data.data.pageNum;
            this.pageNavigation.pageSize = response.data.data.pageSize;
            this.pageNavigation.totalCount = response.data.data.total;
          }
        });
    },

  },

  mounted() {

    this.getAuditList();

  },

};
</script>

<style>
.box{

}
.box .list-box {
  margin-right: 20px;

}

.el-card {
  margin-top: 10px;
}

.el-card__body {
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
}

.el-card__body .item-title {
  font-weight: 600;
  line-height: 28px;
  font-size: 18px;
}

.el-card__body .item-title a {
  color: #000;
}

.success-content .item-content {
  margin-top: 10px;
}

.success-content .item-info {
  width: 1000px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
}

.success-content .item-info .right-control {
  float: right;
}

.success-content .item-info .right-control {
  margin-left: 10px;
  color: #666;
  cursor: pointer;
  margin-right: 10px;
}

.success-content .item-info .right-control span {
  margin-left: 10px;
  color: #666;
  cursor: pointer;
  margin-right: 5px;
}

.user-list-page-navigation-bar {
  float: right;
  margin-right: 50px;
  margin-top: 10px;
}
</style>
