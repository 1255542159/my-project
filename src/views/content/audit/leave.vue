<template>
  <div class="box">
    <div class="list-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="入团" name="join">
          <!-- join -->
          <div class="success-content clearfix" v-for="(item, index) in activity" :key="index">
            <div class="el-card is-hover-shadow">
              <div class="el-card__body">
                <div>
                  <!-- 标题 -->
                  <div class="item-title">
                    <a v-text="item.type"></a>
                  </div>
                  <div class="item-description">
                    理由：
                    <a v-text="item.description"></a>
                  </div>
                  <!-- 点赞，浏览 -->
                  <div class="item-info">
                    <span class="el-tag el-tag--warning el-tag--smjoin el-tag--light" v-if="item.status===1">已通过</span>
                    <span class="el-tag el-tag--danger el-tag--smjoin el-tag--light" v-if="item.status===2">审核中</span>
                    <span class="el-tag el-tag--warning el-tag--smjoin el-tag--light" v-if="item.status===3">未通过</span>
                    <span class="el-tag el-tag--info el-tag--smjoin el-tag--light" v-text="item.createTime"></span>
                    <!-- 编辑删除等 -->
                    <div class="right-control">
                                        <span type="primary" size="mini" @click="agreeAudit(item)"><i class="el-icon-check"></i>同意
                                        </span>
                      <span size="mini" @click="reject(item)"><i class="el-icon-close"></i>拒绝
                                        </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="退团" name="quit">
          <div class="success-content clearfix" v-for="(item, index) in activity" :key="index">
            <div class="el-card is-hover-shadow">
              <div class="el-card__body">
                <div>
                  <!-- 标题 -->
                  <div class="item-title">
                    <a v-text="item.type"></a>
                  </div>
                  <div class="item-description">
                    理由：
                    <a v-text="item.description"></a>
                  </div>
                  <!-- 点赞，浏览 -->
                  <div class="item-info">
                    <span class="el-tag el-tag--warning el-tag--smjoin el-tag--light" v-if="item.status===1">已通过</span>
                    <span class="el-tag el-tag--danger el-tag--smjoin el-tag--light" v-if="item.status===2">审核中</span>
                    <span class="el-tag el-tag--warning el-tag--smjoin el-tag--light" v-if="item.status===3">未通过</span>
                    <span class="el-tag el-tag--info el-tag--smjoin el-tag--light" v-text="item.createTime"></span>
                    <!-- 编辑删除等 -->
                    <div class="right-control">
                                        <span type="primary" size="mini" @click="agreeAudit(item)"><i class="el-icon-check"></i>同意
                                        </span>
                      <span size="mini" @click="reject(item)"><i class="el-icon-close"></i>拒绝
                                        </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="请假" name="leave">
          <div class="success-content clearfix" v-for="(item, index) in activity" :key="index">
            <div class="el-card is-hover-shadow">
              <div class="el-card__body">
                <div>
                  <!-- 标题 -->
                  <div class="item-title">
                    <a v-text="item.type"></a>
                  </div>
                  <div class="item-description">
                    理由：
                    <a v-text="item.description"></a>
                  </div>
                  <!-- 点赞，浏览 -->
                  <div class="item-info">
                    <span class="el-tag el-tag--warning el-tag--smjoin el-tag--light" v-if="item.status===1">已通过</span>
                    <span class="el-tag el-tag--danger el-tag--smjoin el-tag--light" v-if="item.status===2">审核中</span>
                    <span class="el-tag el-tag--warning el-tag--smjoin el-tag--light" v-if="item.status===3">未通过</span>
                    <span class="el-tag el-tag--info el-tag--smjoin el-tag--light" v-text="item.createTime"></span>
                    <!-- 编辑删除等 -->
                    <div class="right-control">
                                        <span type="primary" size="mini" @click="agreeAudit(item)"><i class="el-icon-check"></i>同意
                                        </span>
                      <span size="mini" @click="reject(item)"><i class="el-icon-close"></i>拒绝
                                        </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="page-navigation-box margin-bottom clearfix">
      <el-pagination class="user-list-page-navigation-bar" background @current-change="currentPageChange" :current-page="pageNavigation.currentPage" :page-size="pageNavigation.pageSize" layout="prev, pager, next" :total="pageNavigation.totalCount">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import club from "../../../api/club";

export default {
  data() {
    return {
      activeName: 'join',
      status: 0,
      loading: false,
      deleteDialogShow: false,
      deleteMassage: "",
      deleteTargetId: "",
      pageNavigation: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 5,
      },
      activity: []
    };
  },
  methods: {
    agreeAudit(item){
      item.status = 1;
      club.agreeAudit(item).then((response) =>{
        if(response.data.code === 200){
          this.$message.success(response.data.msg)
        }
        this.getActivityList();
      })

    },
    reject(item){
      item.status = 3;
      club.agreeAudit(item).then((response) =>{
        if(response.data.code === 200){
          this.$message.success(response.data.msg)
        }
        this.getActivityList();
      })
    },
    currentPageChange(page) {
      this.pageNavigation.currentPage = page;
      this.getActivityList();
    },
    //标签页切换事件
    handleClick(tab, event) {
      //0表示全部1表示已通过，2审核中，3已拒绝
      this.activeName = tab.name;
      this.getActivityList();
    },

    getActivityList() {
      console.log(this.activeName)
      this.loading = true;
      club
        .auditList(
          this.pageNavigation.currentPage,
          this.pageNavigation.pageSize, this.activeName
        )
        .then((response) => {
          if (response.data.code === 200) {
            this.loading = false;
            this.activity = response.data.data.list;
            this.pageNavigation.currentPage = response.data.data.pageNum;
            this.pageNavigation.pageSize = response.data.data.pageSize;
            this.pageNavigation.totalCount = response.data.data.total;
          }
        });
    },

  },

  mounted() {
    this.getActivityList();

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
.el-card__body .item-description {
  font-weight: 600;
  line-height: 28px;
  font-size: 10px;
}

.el-card__body .item-description a{
  color: #000;
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
