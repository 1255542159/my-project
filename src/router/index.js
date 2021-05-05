import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../views/login";
import register from "../views/register";
import RightContent from "../layout/RightContent";
import BaseView from "../layout/BaseView";
import dashboard from "../views/dashboard/index";
import userInfo from '../views/content/userInfo'
import systemInfo from '../views/content/systemInfo'
//活动
import listActivity from '../views/content/activity/listActivity'
import addActivity from '../views/content/activity/addActivity'
//人员
import listPersonnel from '../views/content/personnel/listPersonnel'
import addPersonnel from '../views/content/personnel/addPersonnel'
//社团
import listClub from '../views/content/club/listClub'
import addClub from '../views/content/club/addClub'
//权限
import issue from '../views/content/power/issue'
import manage from '../views/content/power/manage'
//审核
import activity from '../views/content/audit/activity'
import leave from '../views/content/audit/leave'
import club from '../views/content/audit/club'
//申请
import apply from '../views/content/apply/apply'
import mineApply from '../views/content/apply/mineApply'
//系统设置
import Looper from '../views/content/system/looper'
//前台
import portal from '../views/portal/portal'
import pActivity from '../views/portal/components/activity'
import actId from '../views/portal/components/actId'
import clubId from '../views/portal/components/clubId'
import pClub from '../views/portal/components/club'
import pAbout from '../views/portal/components/about'
Vue.use(VueRouter)

export const routes = [

  {
    path: '/admin',
    name: 'BaseView',
    redirect: "/index",
    component: BaseView,
    children: [
      {
        /*仪表盘*/
        path: '/index',
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
        path: '/power',
        name: '权限管理',
        icon: 'el-icon-s-management',
        component: RightContent,
        children: [
          {
            path: 'issue',
            component: issue,
            icon: 'el-icon-edit-outline',
            name: '分配角色',
          },
          {
            path: 'manage',
            component: manage,
            icon: 'el-icon-edit-outline',
            name: '角色管理',
          },

        ]
      },
      {
        path: '/audit',
        name: '审核管理',
        icon: 'el-icon-s-check',
        component: RightContent,
        children: [
          {
            path: 'activity',
            component: activity,
            icon: 'el-icon-edit-outline',
            name: '活动审核',
          },
          {
            path: 'leave',
            component: leave,
            icon: 'el-icon-edit-outline',
            name: '请假审核',
          },
          {
            path: 'club',
            component: club,
            icon: 'el-icon-edit-outline',
            name: '社团审核',
          },

        ]
      },
      {
        path: '/apply',
        name: '申请管理',
        icon: 'el-icon-s-management',
        component: RightContent,
        children: [
          {
            path: 'join',
            component: apply,
            icon: 'el-icon-edit-outline',
            name: '申请',
          },
          {
            path: 'list',
            component: mineApply,
            icon: 'el-icon-edit-outline',
            name: '我的申请',
          },
        ]
      },

      {
        path: '/system',
        name: '系统管理',
        icon: 'el-icon-s-management',
        component: RightContent,
        children: [
          {
            path: 'list',
            component: Looper,
            icon: 'el-icon-edit-outline',
            name: '轮播图',
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
          {
            path: 'system',
            component: systemInfo,
            icon: 'el-icon-edit-outline',
            name: '系统消息',
          }
        ]
      },
    ]
  },
  //前台
  {
    path: '/',
    name: "portal",
    redirect: "/pActivity",
    component: portal,
    children: [
      {
        path: 'pActivity',
        component: pActivity,
        icon: 'el-icon-edit-outline',
        name: '门户活动',

      },
      {
        path: 'actId',
        component: actId,
        icon: 'el-icon-edit-outline',
        name: 'actId',
      },
      {
        path: 'clubId',
        component: clubId,
        icon: 'el-icon-edit-outline',
        name: 'clubId',
      },
      {
        path: 'pClub',
        component: pClub,
        icon: 'el-icon-edit-outline',
        name: '门户社团',
      },
      {
        path: 'pAbout',
        component: pAbout,
        icon: 'el-icon-edit-outline',
        name: '门户关于',
      },
    ]
  },

  {
    path: '/login',
    name: "login",
    component: login,
  },
  {
    path: '/register',
    name: "register",
    component: register,
  },


]

const router = new VueRouter({

  routes
})

// 挂在路由守卫
router.beforeEach((to, form, next) => {
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  // 获取token
  let Authorization = window.localStorage.getItem('cms_token');
  if (to.path === '/login')
  {
   if (Authorization){
     return next('/admin')
   }
    return next()
  }
  if (to.path === '/register') return next()
  if (to.path === '/pActivity') return next()
  if (to.path === '/actId') return next()
  if (to.path === '/clubId') return next()
  if (to.path === '/pClub') return next()
  if (to.path === '/pAbout') return next()


  if (!Authorization) return next('/')
  next()
})



export default router


