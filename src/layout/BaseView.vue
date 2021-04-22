<template>
  <div class="base-box">
    <el-container>
      <el-header id="admin-header-box">
        <TopHeader></TopHeader>
      </el-header>
      <el-container class="main-container">
        <el-aside id="left-menu-list-box" width="auto">
          <LeftMenu></LeftMenu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from "./LeftMenu";
import TopHeader from "./TopHeader";
export default {
  name: "BaseView",
  components: {
    LeftMenu,
    TopHeader
  },
  mounted() {
    //动态设置侧边栏的高度
    // let leftMenuBox = document.getElementById("left-menu-list-box");
    // let adminHeaderBox = document.getElementById("admin-header-box");
    // if (leftMenuBox && adminHeaderBox) {
    //   leftMenuBox.style.height =
    //     window.innerHeight - adminHeaderBox.offsetHeight + "px";
    // }
  },
};
</script>

<style >
#left-menu-list-box {
  min-height: calc(80vh);
  z-index: 2000;
}
#left-menu-list-box .el-menu {
  border-right: none;
}

.el-header{
  background-color: #409eff;
  line-height: 46px;
  height: 46px !important;
}
/* .el-footer {
  background-color: #02090f;
  line-height: 46px;
  height: 46px !important;
  -webkit-box-direction:normal
} */

.el-aside {
  border-right: solid 1px #e6e6e6;
  line-height: 50px;
}


.el-main {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  overflow: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0px;
}

.main-container {
position: absolute;
top: 46px;
bottom: 0;
width: 100%;
}
.rightPart {
height: 100%;
width: 100%;
overflow-y: scroll;
}

</style>
