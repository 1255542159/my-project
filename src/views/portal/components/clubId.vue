<template>
  <div class="main-content">
    <div class="article-detail">
      <div class="article-detail clear-fix">
        <div id="article-detail-left-part" class="float-left"></div>
        <div id="article-detail-center-part" class="float-left">
          <div class="article-content-part border-radius-default">
            <div class="article-header">

              <div class="article-title-part">
                <span v-text="club.clubName"></span>
              </div>
              <div class="article-cover">
                <img :src="club.clubImg"/>
              </div>
              <div class="article-publish-time clear-fix">
                <div class="publish-info-left-part">
                  <span>创建于</span>
                  <i class="el-icon-s-promotion"/>
                  <span class="iconfont iconriqi2" v-text="formatDate(club.createTime)"></span>
                </div>
              </div>
            </div>
            <div class="article-content-container">
              <div id="article-content" class="article-content">
                <no-ssr>
                  <mavon-editor
                    :subfield = "false"
                    :defaultOpen = "'preview'"
                    :toolbarsFlag = "false"
                    :editable="false"
                    :scrollStyle="true"
                    :boxShadow="false"
                    :boxShadowStyle="'0 2px 12px 0 rgba(0, 0, 0, 0.1)'"
                    :previewBackground="'#FFFFFF'"
                    :ishljs = "true"
                    v-model="club.introduce"/>
                </no-ssr>
              </div>
            </div>
          </div>
        </div>
        <div id="article-detail-right-part" class="float-left">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>社团Leader</span>
            </div>
            <div class="border-radius-default">
              <div class="user-info-content">
                <div class="blue-line" style="height: 50px; background: rgb(0, 132, 255);"></div>
                <a>
                <span class="user-icon">
                  <span class="el-avatar el-avatar--circle" style="height: 60px; width: 60px; line-height: 60px;"><img
                    :src="user.avatar" style="object-fit: cover;"></span>
                </span>
                </a>
              </div>
              <a v-text="user.name" class="user-name"></a>
              <a class="user-sign">{{user.sign}}</a>
<!--              <router-link :to="{path:'clubId',query:{id:user.clubId}}">-->
<!--                <a class="user-clubName">{{club.clubName}}</a>-->
<!--              </router-link>-->
            </div>
          </el-card>
<!--          <el-card class="hot-card">-->
<!--            <div slot="header" class="clearfix">-->
<!--              <span>热门活动</span>-->
<!--            </div>-->
<!--            <div class="border-radius-default">-->
<!--              <div class="user-info-content">-->
<!--                <ul v-for="(item,index) in hotActivity">-->

<!--                  <li> <a  v-bind:href="['/actId?id='+item.id]">{{item.title}}&#45;&#45;&#45;&#45;查阅{{item.viewCount}}次</a></li>-->
<!--                </ul>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-card>-->
        </div>
      </div>
    </div>

  </div>

</template>


<script>
import  portal from '../../../api/portal'
import dateUtils from '../../../utils/date';
import hljs from 'highlight.js'
import 'highlight.js/styles/a11y-dark.css'
export default {
  components: {

  },
  data() {
    return {
        club:'',
      leaderId:'',
      user: [],
    }
  },
  methods:{
    formatDate(dateStr) {
      let date = new Date(dateStr);
      return dateUtils(date, "yyyy-MM-dd hh:mm:ss");
    },
    getClubDetail(){
      portal.getClubDetail(this.$route.query.id).then((res) =>{
        if(res.data.code === 200){
          this.club = res.data.data
          this.leaderId = res.data.data.leaderId;
          this.getClubLeader();
        }
      })
    },
    getClubLeader(){
      portal.getActivityUserInfo(this.leaderId).then((res) =>{
        this.user = res.data.data;
      })
    }

  },
  mounted() {
    hljs.initHighlighting();
    this.getClubDetail();
  },

}
</script>

<style scoped>
#article-detail-right-part {
  width: 320px;
}
.publish-info-left-part{
  text-align: left;
}
.article-cover, .article-title-part {
  margin-bottom: 20px;

}
.article-title-part{
  display:flex;
}
.article-cover {
  overflow: hidden;
}
.article-cover img {
  object-fit: cover;
  width: 100%;
  max-height: 200px;
  border-radius: 4px;
  vertical-align: middle!important;
}
.article-header {
  margin-bottom: 20px;
}
.article-title-part span {
  font-size: 1.75rem;
  line-height: 36px;
  color: #212529;
  font-weight: 600;
}
.clear-fix {
  display: block;
  *zoom: 1;
}

#article-detail-right-part {
  width: 300px;
}
.article-content>p {
  margin-bottom: 20px;
}
.article-content img {
  max-width: 1140px;
  box-shadow: 0 0 6px;
  cursor: zoom-in;
  border-radius: 3px;
  display: block;
  margin: 10px auto;
}
img {
  vertical-align: middle!important;
}
.article-content-part {
  overflow: hidden;
  background: #fff;
  margin-bottom: 20px;
  padding: 20px 20px 40px;
}
.border-radius-default {
  border-radius: 4px;
}
.article-content {
  color: #333;
  margin-bottom: 40px;
  line-height: 28px;

}
.float-left {
  float: left;
}

.main-content{
  margin-top: 10px;
}

.article-content, p {
  word-break: break-all;
}
#article-detail-left-part {
  width: 50px;
  font-size: 22px;
  color: #6c757d;
  top: 145px;
  position: fixed;
}
#article-detail-center-part {
  width: 750px;
  margin-left: 70px;
  margin-right: 20px;
}
.user-info-content {
  width: 100%;
  background: #fcfcfc;
  position: relative;
}
.user-sign{
  position: relative;
  display: block;
  top: -10px;
  text-align: center;
  text-decoration: none;
}

.user-name{
  position: relative;
  top: -20px;
  display: block;
  text-align: center;
  text-decoration: none;
}
.user-icon{
  position: relative;
  top: -30px;
  display: block;
  text-align: center;
}

.user-info-content li{
  list-style: none;
  text-align: left;
  cursor: pointer;

}
.user-info-content li a{
  color: #92979A;
}
.user-info-content li :hover{
  color: #0084FF;
  text-decoration: none;
}
.hot-card{
  margin-top: 30px;
}
.el-icon-view{
  margin-left: 10px;
}
.user-sign{
  position: relative;
  display: block;
  top: -10px;
  text-align: center;
  text-decoration: none;
}
.user-clubName{
  position: relative;
  text-align: center;
  display: block;
  text-decoration: none;
}
.user-name{
  position: relative;
  top: -20px;
  display: block;
  text-align: center;
  text-decoration: none;
}
.article-publish-time {
  margin-top: 10px;
}

.main-content {
  padding: 30px;
}

.article-header {
  margin-bottom: 20px;
}
.article-title-part{
  display: flex;
  justify-content: space-between;
}

/*.article-title-part span {*/
/*  font-size: 1.75rem;*/
/*  line-height: 36px;*/
/*  color: #212529;*/
/*  font-weight: 600;*/
/*}*/

.clear-fix {
  display: block;
  *zoom: 1;
}

.float-left {
  float: left;
}

#article-detail-right-part {
  width: 320px;
}

.article-content > p {
  margin-top: 20px;
  margin-bottom: 20px;
}

.article-content img {
  max-width: 900px;
  box-shadow: 0 0 6px;
  cursor: zoom-in;
  border-radius: 3px;
  display: block;
  margin: 10px auto;
}
.markdown-body img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
  min-width: 100%;
}
img {
  vertical-align: middle !important;
}

.article-content-part {
  overflow: hidden;
  background: #fff;
  margin-bottom: 20px;
  padding: 20px 20px 40px;
}

.border-radius-default {
  border-radius: 4px;
}

.article-content {
  color: #333;
  margin-bottom: 40px;
  line-height: 28px;
}

.article-content, p {
  word-break: break-all;
}



#article-detail-center-part {
  width: 70%;

}

.float-left {
  float: left;
}

.article-detail {
  display: flex;
  justify-content: space-around;
}
.user-info-content {
  width: 100%;
  background: #fcfcfc;
  position: relative;
}
.user-icon{
  position: relative;
  top: -30px;
  display: block;
  text-align: center;
}



</style>
