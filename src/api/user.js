import { data, post } from 'jquery'
import request from '../utils/request'
import Qs from 'qs'//引入qs
export default {

  logout(){
    return request({
      url: '/api/logout',
      method: 'get'
    })
  },
  addPersonnel(user){
    return request({
      url: '/api/user/addPersonnel',
      method: 'post',
      data:user
    })
  },

  deletePersonnel(userId){
    return request({
      url:`/api/user/deletePersonnel/`+userId,
      method:'delete',
    })

  },

  updatePersonnel(user){
    return request({
      url:`/api/user/updatePersonnel`,
      method:'put',
      data:user
    })
  },

  getPersonnelList(page,size,status){
    return request({
      url: '/api/user/personnelList/'+page+'/'+size,
      method: 'get',
      params:{
        status:status,
        keyWords:''
      }
    })
  },

  postActivity(activity){
    return request({
      url:'/api/user/post/activity',
      method: 'post',
      data: activity
    })
  },
  getActivityList(page,size,status){
    return request({
      url: '/api/user/list/activity/'+page+'/'+size,
      method: 'get',
      params:{
        status:status,
        keyWords:''
      }
    })
  },
  listImages(page,size,original){
    return request({
      url:'/api/user/image/list?page='+page+'&size='+size+'&original='+original,
      method:'get'
    })
  },
  deleteActivity(id){
    return request({
      url:'/api/user/delete/activity/'+id,
      method:'delete'
    })
  },
}
