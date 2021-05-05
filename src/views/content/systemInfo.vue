<template>
<div id="share-comment">
  <div class="comment-list" >
    <div class="comment-item" v-for="(item,index) in Info">
      <div class="title-part">
        <span class="item-title">活动开始通知</span>
        <span class="item-publishTime">{{item.startTime}}</span>
      </div>
      <div class="item-content">
        <a v-bind:href="['/actId?id='+item.id]" style="color:#e6a23c"><span>{{item.title}}</span></a>
        请准时参加
      </div>
    </div>
  </div>
</div>
</template>
<script>
import user from '../../api/user'
export default {

  data() {
    return {
    Info:"",
      baseUrl:this.BASE_URL.baseUrl +'/activity/',
    }
  },
  methods: {
    getInfo(){
      user.getActivityInfo().then((res) =>{
       if(res.data.code === 200){
         this.Info = res.data.data
       }
      })
    }
  },
  mounted() {
    this.getInfo();
  }
}

</script>

<style scoped>
#share-comment {
  padding: 20px 30px;
  background: #fff;
  -webkit-box-shadow: 0 1px 4px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 12%);
}
.comment-list {
  position: relative;
  width: 100%;
}
.comment-list .comment-item {
  position: relative;
  padding: 22px 0;
  font-size: 14px;
  border-bottom: 1px solid #e8e8e8;
}
#share-comment .comment-list .comment-item .title-part {
  line-height: 24px;
}
#share-comment .comment-list .comment-item .title-part .item-title {
  font-size: 18px;
  font-weight: 600;
}
#share-comment .comment-list .comment-item .title-part .item-publishTime {
  margin-left: 10px;
}
#share-comment .comment-list .comment-item .item-content {
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 16px;

}
</style>
