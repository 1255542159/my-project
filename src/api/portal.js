import request from '../utils/request'

export default {
  getCarousel(){
    return request({
      url:'/api/portal/list/carousel',
      method:'get'
    })
  },

  getActivity(page,size){
    return request({
      url:'/api/portal/list/activity/'+page+'/'+size,
      method:'get'
    })
  },
  getClub(page,size){
    return request({
      url:'/api/portal/list/club/'+page+'/'+size,
      method:'get'
    })
  },

  getHotActivity(){
    return request({
      url:'/api/portal/hot/activity/',
      method:'get'
    })
  },

  getActivityDetail(id){
    return request({
      url:'/api/portal/activity/'+id,
      method:'get'
    })
  },

  getActivityUserInfo(id){
    return request({
      url:'/api/portal/userInfo/'+id,
      method:'get'
    })
  },
  getClubDetail(id){
    return request({
      url:'/api/portal/club/'+id,
      method:'get'
    })
  },

}
