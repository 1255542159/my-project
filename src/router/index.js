import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../views/front/views/login";
import RightContent from "../layout/RightContent";
import BaseView from "../layout/BaseView";
import dashboard from "../views/dashboard/index";
import userInfo from '../views/content/userInfo'
import listClub from '../views/content/listClub'
import addClub from '../views/content/addClub'
import listPersonnel from '../views/content/listPersonnel'
import addPersonnel from '../views/content/addPersonnel'
import listActivity from '../views/content/listActivity'
import addActivity from '../views/content/addActivity'
//前台
import FrontBaseView from '../views/front/layout/BaseView'
import index from '../views/front/views/content/index'
import activity from '../views/front/views/content/activity'
import association from '../views/front/views/content/association'
import about from '../views/front/views/content/about'
Vue.use(VueRouter)

export const routes = [
  {
    path: '/admin',
    name: 'BaseView',
    component: BaseView,
    children: [
      {
        /*仪表盘*/
        path: '/admin',
        component: dashboard,
        name: '首页',
        icon: 'el-icon-s-home'
      },
      {
        path: '/club',
        name: '社团',
        icon: 'el-icon-tickets',
        component: RightContent,
        children: [
          {
            path: 'add',
            component: addClub,
            icon: 'el-icon-edit-outline',
            name: '创建社团',
          },
          {
            path: 'list',
            component: listClub,
            icon: 'el-icon-edit-outline',
            name: '社团列表',
          },

        ]
      },
      {
        path: '/personnel',
        name: '人员管理',
        icon: 'el-icon-tickets',
        component: RightContent,
        children: [
          {
            path: 'add',
            component: addPersonnel,
            icon: 'el-icon-edit-outline',
            name: '添加人员',
          },
          {
            path: 'list',
            component: listPersonnel,
            icon: 'el-icon-edit-outline',
            name: '人员列表',
          },
        ]
      },
      {
        path: '/activity',
        name: '活动管理',
        icon: 'el-icon-tickets',
        component: RightContent,
        children: [
          {
            path: 'add',
            component: addActivity,
            icon: 'el-icon-edit-outline',
            name: '发布活动',
          },
          {
            path: 'list',
            component: listActivity,
            icon: 'el-icon-edit-outline',
            name: '活动列表',
          },

        ]
      },

      {
        path: '/user',
        name: '用户',
        icon: 'el-icon-tickets',
        component: RightContent,
        children: [
          {
            path: 'info',
            component: userInfo,
            icon: 'el-icon-edit-outline',
            name: '账户设置',
          },
        ]
      },
    ]
  },
  //前台
  {
    path: '/',
    name: 'FrontBaseView',
    redirect: "/index",
    component: FrontBaseView,
    children: [
      {
        //首页
        path: '/index',
        name: '前端首页',
        component:index,
      },
      {
        //首页
        path: '/ac',
        name: '活动页面',
        component:activity,
      },
      {
        //首页
        path: '/association',
        name: '社团页面',
        component:association,
      },
      {
        //关于
        path: '/about',
        name: '关于页面',
        component:about,
      },
    ]

  },
  {
    path: '/login',
    name: "login",
    component: login,
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 挂在路由守卫
router.beforeEach((to, form, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (to.path === '/login') return next()
  if (to.path === '/index') return next()
  if (to.path === '/association') return next()
  if (to.path === '/ac') return next()
  if (to.path === '/about') return next()
  if (to.path === '/join') return next()
  // 获取token
  let Authorization = window.localStorage.getItem('cms_token');
  if (!Authorization) return next('/')
  next()
})

export default router


