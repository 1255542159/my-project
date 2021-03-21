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
        // "clubCreator": club.clubCreator,
        // "clubDesc": club.clubDesc,
        // "clubImg": club.clubImg,
        // "clubIntroduce": club.clubIntroduce,
        // "clubName": club.clubName,
        // "createdTime": "",
        // "id": '',
        // "isDelete": '',
        // "leaderId": club.leaderId,
        // "updatedTime": ""

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


}
