<template>
  <div class="index-page-box">
    <div class="content-box">
      <el-row :gutter="24" >
        <el-col :span="6" v-for="(item,index) in club" :key="index" class="elclo">
          <div class="grid-content bg-purple">
            <div class="course-item course-item-normal">
              <router-link :to="{path:'clubId',query:{id:item.id}}">
                <div class="course-cover">
                  <img :src="item.clubImg">
                </div>
                <div class="course-title" v-text="item.clubName"></div>
              </router-link>
            </div>
          </div>
        </el-col>

      </el-row>
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
  </div>
</template>

<script>
import portal from '../../../api/portal'

export default {
  data() {
    return {
      club:'',
      pageNavigation: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 12,
      },
    }
  },
  methods: {
    currentPageChange(page) {
      this.pageNavigation.currentPage = page;
      this.getClub();
    },
    getClub(){
      portal.getClub(this.pageNavigation.currentPage,this.pageNavigation.pageSize).then((response) =>{
        this.club=response.data.data.list;
        this.pageNavigation.currentPage = response.data.data.pageNum;
        this.pageNavigation.pageSize = response.data.data.pageSize;
        this.pageNavigation.totalCount = response.data.data.total;
      })
    }

  },
  mounted () {
    this.getClub();
  }

}
</script>

<style>
.content-box{
  padding: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.course-item {
  margin-bottom: 30px;
  float: left;
  overflow: hidden;
  cursor: pointer;
  transition: height .2s;
}
.course-item-normal {
  margin-right: 20px;
}
.course-item .course-cover img {
  border-radius: 4px;
  width: 270px;
  border: 1px solid #f1f1f1;
  height: 148px;
}
.course-item .course-title {
  margin-top: 5px;
  height: 50px;
  cursor: pointer;
  font-size: 14px;
  color: #47494e;
  line-height: 24px;
  font-weight: 600;
}

</style>
