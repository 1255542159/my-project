<template>
<div class="header-container">
    <div class="center-part-1140 clear-fix">
        <div class="logo">
            <a href="/">CMS</a>
        </div>
        <div class="header-navigation-bar">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item v-for="(item,index) in routerList" :key="index">
                    <a :href="item.path">{{item.name}}</a>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="header-right-part clear-fix">
            <div id="header-un-login-part" style="display: block;">
                <a href="/login">
                    <span class="login"><i class="iconfont iconfingerprint"></i>
                        登录</span></a>
                <a href="/join">
                    <span class="join-in"><i class="iconfont iconadduser"></i>
                        注册
                    </span></a>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '0',
            routerList: [{
                    name: '首页',
                    path: '/',
                },
                {
                    name: '社团',
                    path: '/association',
                },
                {
                    name: '活动',
                    path: '/ac',
                },
                {
                    name: '关于',
                    path: '/about',
                },
            ]
        }
    }
}
</script>   

<style scoped>
.el-container {
    color: #ffff;
}

.center-part-1140 {
    height: 46px;
    width: 1140px;
    margin: 0 auto;
}

.logo {
    margin-left: 37px;
    float: left;
    text-decoration: none;
    line-height: 50px;
    color: #0084ff;
    height: 46px;
    font-size: 30px;
}
.logo a{
    margin-left: 37px;
    float: left;
    text-decoration: none;
    line-height: 50px;
    color: #0084ff;
    height: 46px;
    font-size: 30px;
}

.header-navigation-bar {
    float: left;
    margin-left: 30px;
}

.header-navigation-bar li a {
    float: left;
    line-height: 50px;
    cursor: pointer;
    margin-left: 10px;
    font-size: 16px;
    text-decoration-line: none;
}

.el-menu-item {
    height: 46px;
    border-right: none;
}

.header-right-part {
    float: right;
    line-height: 61px;
}

#header-un-login-part{
    height: 46px;
}
#header-un-login-part span {
    line-height: 40px;
    font-size: 16px;
    margin-left: 10px;
}
* a{
    line-height: 40px;
    text-decoration-line: none;
}
</style>
