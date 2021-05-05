
<template>
  <div class="index-page-box">

    <div class="carousel-box">
      <el-carousel :interval="3000" height="500px" arrow="always" class="index-carousel-content">
        <el-carousel-item v-for="(item,index) in looper" :key="index">
          <el-image :src="item.url" style="object-fit: cover"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="activity-box">
      <div class="activity-item" v-for="(item,index) in activity" :key="index">
        <div class="background-img">
          <div class="bg-mask">
            <el-image :src="item.activityImg" class="blur">
            </el-image>
            <div class="cover" v-if="index %2 != 0">
              <el-row>
                <el-col :span="16">
                  <div class="cover-left-box">
                    <!--文字输入-->
                    <div>
                      <div class="postDate">
                        <a v-text="format(item.startTime)"></a>
                      </div>
                      <div class="title">
                        <router-link :to="{path:'actId',query:{id:item.id}}">
                          {{item.title}}
                        </router-link>
                      </div>
                      <div class="summary">
                        摘要:
                        <span>{{item.summary}}</span>
                      </div>

                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="cover-img">
                    <el-image :src="item.activityImg"></el-image>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="cover" v-if="index %2 == 0">
              <el-row>
                <el-col :span="8">
                  <div class="cover-img">
                    <el-image :src="item.activityImg"></el-image>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="cover-left-box">
                    <!--文字输入-->
                    <div>
                      <div class="postDate">
                        <a v-text="format(item.startTime)"></a>
                      </div>
                      <div class="title">
                        <router-link :to="{path:'actId',query:{id:item.id}}">
                          {{item.title}}
                        </router-link>
                      </div>
                      <div class="summary">
                        摘要:
                        <span>{{item.summary}}</span>
                      </div>

                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>

      </div>
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
import  portal from '../../../api/portal'
import dateUtils from '../../../utils/date';
export default {
  data() {
    return {
      activity:undefined,
      looper:'',
      pageNavigation: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 5,
      },
    }
  },
  methods:{
    format(dateStr){
      let date = new Date(dateStr);
      return dateUtils(date,'yyyy-MM-dd hh:mm:ss')
    },
    currentPageChange(page) {
      this.pageNavigation.currentPage = page;
      this.getActivity();
    },
    getActivity(){
      portal.getActivity(this.pageNavigation.currentPage,this.pageNavigation.pageSize).then((response) =>{
        this.activity = response.data.data.list;
        this.pageNavigation.currentPage = response.data.data.pageNum;
        this.pageNavigation.pageSize = response.data.data.pageSize;
        this.pageNavigation.totalCount = response.data.data.total;
      })
    },
    getCarousel(){
      portal.getCarousel().then((res) =>{
        this.looper = res.data.data
      })
    },
  },

  mounted() {
    this.getCarousel();
    this.getActivity();
  }
}
</script>
<!--1140px 240px 660px 240px-->
<style scoped>
.cover-left-box{
  padding: 30px;
  color: #fff;
}
.cover-left-box .postDate{
  font-size: 13px;
  margin-bottom: 10px;
}
.el-col el-col-16{
  height: 100%;
}

.cover-left-box .title a{
  font-size: 30px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.cover-left-box .title :hover{
  color: #0084FF;
}

.cover-left-box .summary{
  font-size: 19px;
  margin-top: 10px;
}

.activity-item {
  margin-top: 20px;
}
.activity-box {
  margin: 70px auto;
  width: 1140px;
  height: 100%;

  z-index: 9999;
}

.blur {
  position: absolute;
  top: -5%;
  left: -5%;
  right: -5%;
  bottom: -5%;
  width: 110%;
  height: 110%;
  object-fit: cover;
  -webkit-filter: blur(30px); /* Chrome, Opera */
}

.bg-mask {
  position: relative;
  height: 300px;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  border-radius: 4px;
}

/*半透明黑色蒙版*/
.bg-mask .cover {
  width: 100%;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.3);
  position: relative;

}
.cover-img .el-image {
  width: 100%;
  height: 300px;
  position: relative;
}

.user-list-page-navigation-bar {
  text-align: center;
  margin-top: 30px;
}

.postDate a{
  color: white;
  text-decoration: none;
}
.el-image img{
  height: 500px;
}
</style>
