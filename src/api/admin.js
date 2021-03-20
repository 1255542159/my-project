import request from '../utils/request'
export default{

  roleList(){
        return request({
          url:'/api/admin/role/list',
          method:'get'
        })
  },
  powerAllList(){
    return request({
      url:'/api/admin/power/list',
      method:'get'
    })
  },
  powerOwnerList(id){
    return request({
      url:'/api/admin/power/list?id='+id,
      method:'get'
    })
  },
}
