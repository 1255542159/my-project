<template>
  <div class="box">
    <div class="list-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="审核中" name="approving">
          <!-- all -->
          <div class="success-content clearfix" v-for="(item, index) in clubLists" :key="index">
            <div class="el-card is-hover-shadow">
              <div class="el-card__body">
                <div>
                  <div class="item-title">
                    <a v-text="item.clubName"></a>
                  </div>
                  <div class="item-content clearfix" v-text="'摘要:'+item.clubDesc"></div>
                  <!-- 点赞，浏览 -->
                  <div class="item-info">
                    <span class="el-tag el-tag--small el-tag--light" v-text="'人数:'+item.amount"></span>
                    <span class="el-tag el-tag--warning el-tag--small el-tag--light" v-if="item.status===1">已通过</span>
                    <span class="el-tag el-tag--danger el-tag--small el-tag--light" v-if="item.status===2">审核中</span>
                    <span class="el-tag el-tag--warning el-tag--small el-tag--light" v-if="item.status===3">未通过</span>
                    <span class="el-tag el-tag--info el-tag--small el-tag--light" v-text="item.createTime"></span>
                    <!-- 编辑删除等 -->
                    <div class="right-control">
                                        <span type="primary" size="mini" @click="agree(item)"><i class="el-icon-check"></i>同意
                                        </span>
                      <span size="mini" @click="refuse(item)"><i class="el-icon-close"></i>拒绝
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
import user from '../../../api/user'

export default {
  data() {
    return {
      clubLists:[],
      activeName: 'approving',
      status: 2,
      loading: false,
      deleteDialogShow: false,
      deleteMassage: "",
      deleteTargetId: "",
      pageNavigation: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 5,
      },
    };
  },
  methods: {
    agree(item) {
      item.status = 1;
      club.updateClub(item).then((response) =>{
        if(response.data.code === 200){
          this.$message.success(response.data.msg)
        }else {
          this.$message.error(response.data.msg)
        }
        this.getClubList();
      })

    },
    currentPageChange(page) {
      this.pageNavigation.currentPage = page;
      this.getClubList();
    },
    //标签页切换事件
    handleClick(tab, event) {
      //0表示全部1表示已通过，2审核中，3已拒绝
      this.status = tab.index;
      this.getClubList();
    },
    refuse(item) {
      //马上拒绝
      item.status = 3;
      club.updateClub(item).then((response) =>{
        if(response.data.code === 200){
          this.$message.success(response.data.msg)
        }else {
          this.$message.error(response.data.msg)
        }
        this.getClubList();
      })

    },
    getClubList() {
      this.loading = true;
      club
        .getClubList(
          this.pageNavigation.currentPage,
          this.pageNavigation.pageSize, 2
        )
        .then((response) => {
          if (response.data.code === 200) {
            this.loading = false;
            this.clubLists = response.data.data.list;
            this.pageNavigation.currentPage = response.data.data.pageNum;
            this.pageNavigation.pageSize = response.data.data.pageSize;
            this.pageNavigation.totalCount = response.data.data.total;
          }
        });
    },

  },

  mounted() {
    this.getClubList();
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
