import request from '../utils/request'
export default {
  getClubList(page,size){
    return request({
      url: '/api/club/clubList?page='+page+'&size='+size,
      method: 'get'
    })
  },

  doSearch(keyWords){
    return request({
      url: '/api/club/clubList?keyWords='+keyWords+'&page=1&size=5',
      method: 'get'
    })
  },
  addClub(club){
    return request({
      url: '/api/club/addClub',
      method: 'post',
      data:{
        "clubCreator": club.clubCreator,
        "clubDesc": club.clubDesc,
        "clubImg": club.clubImg,
        "clubIntroduce": club.clubIntroduce,
        "clubName": club.clubName,
        "createdTime": "",
        "id": '',
        "isDelete": '',
        "leaderId": club.leaderId,
        "updatedTime": ""
      }
    })
  },
  updateClub(club){
    return request({
      url:'/api/club/updateClub',
      method:'post',
      data:{
        "clubCreator": club.clubCreator,
        "clubDesc": club.clubDesc,
        "clubImg": club.clubImg,
        "clubIntroduce": club.clubIntroduce,
        "clubName": club.clubName,
        "id": club.id,
        "leaderId": club.leaderId,
        "isDelete": club.isDelete
      }
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

  addActivity(activity){
    return request({
      url: '/api/club/addActivity',
      method: 'post',
      data:activity
    })
  },
  getActivityList(page,size){
    return request({
      url: '/api/club/getActivityList?page='+page+'&size='+size,
      method: 'get'
    })
  },

  deleteActivity(activityId){
    return request({
      url:'/api/club/deleteActivity/'+activityId,
      method: 'delete'
    })
  }
}
