<template>
<div class="base-box">
    <el-container>
      <el-header id="index-header-box">
        <fTopHeader></fTopHeader>
      </el-header>
      <el-container class="main-container">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import fTopHeader from '../../front/layout/TopHeader'
export default {
  components:{
      fTopHeader,
  }
  
};
</script>

<style >
#left-menu-list-box .el-menu {
  border-right: none;
}

.el-header{
  background-color: #fff;
  line-height: 46px;
  height: 46px !important;
}
/* .el-footer {
  background-color: #02090f;
  line-height: 46px;
  height: 46px !important;
  -webkit-box-direction:normal
} */


.el-main {
  padding: 0;
  background: #E7E5E8  ;
}
.main-container {
  position: absolute;
  top: 46px;
  bottom: 0;
  width: 100%;
}



</style>
