<template>
  <div class="left-menu-box">
    <el-menu
      :default-active= "'0'"
      class="el-menu-vertical-demo"
      :collapse="$store.getters.isCollapse"
      background-color="#FFFFFF"
      active-text-color="#FFFFFF">
      <template v-for="(item, index) in menuList.data">
        <router-link :to="item.path" v-if="!item.childMenu" :key="index">
          <el-menu-item :index="index + ''">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else :key="index" :index="index + ''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <router-link
            :to="item.path + subItem.path"
            v-for="(subItem, subIndex) in item.childMenu"
            :key="subIndex"
          >
            <el-menu-item :index="index + '-' + subIndex">
              <i :class="subItem.icon"></i>
              <span slot="title">{{ subItem.name }}</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import login from "../api/login";
export default {
  name: "LeftMenu",
  data() {
    return {
      icon: "el-icon-s-fold",
      isCollapse: true,
      menuList: [],
    };
  },
  methods: {
    // activeMenu() {
    //   var path =
    //     "/" +
    //     window.location.href.split("/")[3] +
    //     "/" +
    //     window.location.href.split("/")[4] +
    //     "/" +
    //     window.location.href.split("/")[5];
    //   return path;
    // },
    changStatus() {
      this.isCollapse = !this.isCollapse;
      this.icon = "el-icon-s-unfold";
    },
    // handleOpen(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    //   }
  },
  created() {
    login.getMenuList().then((response) => {
      if (response.data.code === 200) {
        this.menuList = response.data;
        this.data = response.data;
      }
    });
  },
};
</script>

<style scoped>
.el-menu {
  border-right: none;
}

.el-aside {
  text-align: center;
  line-height: 200px;
}
.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 100%;
}
.el-menu-item {
  background-color: #ffffff !important;
  border-bottom: 1px solid #ffffff;
}
.el-menu-item.is-active {
  background-color: #409eff !important;
}
.left-menu-box{
  height: 100%;
}

</style>
