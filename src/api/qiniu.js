import { data } from 'jquery'
import request from '../utils/request'
export default {

  uploadImage(data){
    return request({
      url: '/api/user/uploadImage',
      method: 'post',
      data:data
    })
  },
}
