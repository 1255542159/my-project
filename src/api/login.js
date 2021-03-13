import request from '../utils/request'
export default {

    doLogin(user){
      let  formData = new FormData();
      formData.append("username",user.username)
      formData.append("password",user.password)
        return request({
            url: '/api/login',
            method:'post',
            data:formData,
        })
    },

    getMenuList(){
        return request({
            url: '/api/user/getMenu',
            method:'get'
        })
    },
  checkRole() {
    return request({
      url: '/api/user/check-token',
      method: 'get'
    })
  },






}

