import request from '../utils/request'
export default{

  getUserInfo(){
        return request({
          url:'/api/user/userInfo',
          method:'get'
        })
  },
}
