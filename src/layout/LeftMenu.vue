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
import user from "../api/user"
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
    changStatus() {
      this.isCollapse = !this.isCollapse;
      this.icon = "el-icon-s-unfold";
    },
    openSystemInfo(){
      this.$router.push({
        path:'/user/system'
      })
  }

  },
  created() {
    login.getMenuList().then((response) => {
      if (response.data.code === 200) {
        this.menuList = response.data;
        this.data = response.data;
      }
    });
    user.getActivityInfo().then((res) =>{
      if(res.data.code === 200){
        this.$notify.info({
          title: "系统通知",
          message: '你有'+ res.data.data.length +'条通知',
          position: 'bottom-right',
          onClick:this.openSystemInfo,
        });
      }

    })
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
