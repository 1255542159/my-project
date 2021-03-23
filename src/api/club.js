import request from '../utils/request'
export default {
  // 获取列表不分页
clubList(){
  return request({
    url:'/api/club/list/club',
    method:'get'
  })
},

  getClubList(page,size,status){
    return request({
      url: '/api/club/clubList/'+page+'/'+size,
      method: 'get',
      params:{
        status:status,
        keyWords:''
      }
    })
  },

  addClub(club){
    return request({
      url: '/api/club/addClub',
      method: 'post',
      data:club
    })
  },
  updateClub(club){
    return request({
      url:'/api/club/updateClub',
      method:'post',
      data:club
    })
  },

  deleteClub(clubId){
    return request({
      url:`/api/club/deleteClub/`+clubId,
      method:'delete',
    })
  },

  searchPersonnel(keyWords){
    return request({
      url: '/api/club/personnelList?keyWords='+keyWords+'&page=1&size=5',
      method: 'get'
    })
  },

  //查询申请列表
  auditList(page,size,type) {
    return request({
      url: '/api/club/auditList/'+page+'/'+size+'/'+type,
      method: 'get'
    })
  },

  //查询申请列表
  agreeAudit(audit) {
    return request({
      url: '/api/club//audit/agree',
      method: 'post',
      data:audit
    })
  },
}
