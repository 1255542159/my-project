import { post } from 'jquery'
import request from '../utils/request'
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

  getPersonnelList(page,size){
    return request({
      url: '/api/user/personnelList?page='+page+'&size='+size,
      method: 'get'
    })
  },

  postActivity(activity){
    return request({
      url:'/api/user/post/activity',
      method: 'post',
      data: activity
    })
  },
  getActivityList(page,size){
    return request({
      url: '/api/user/list/activity?page='+page+'&size='+size,
      method: 'get'
    })
  },
  listImages(page,size,original){
    return request({
      url:'/api/user/image/list?page='+page+'&size='+size+'&original='+original,
      method:'get'
    })
  }
}
