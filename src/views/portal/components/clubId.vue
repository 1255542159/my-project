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
        <div id="article-detail-right-part" class="float-left"></div>
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
        }
      })
    }

  },
  mounted() {
    hljs.initHighlighting();
    this.getClubDetail();
  },

}
</script>

<style>
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


</style>
