import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import router from '../router/index'

// 创建一个axios实例
const service = axios.create({

     headers: {
       'content-type': 'application/json;charset=UTF-8',
     },
    //baseURL: 'http://dianphp.fyz.com',
    withCredentials: false,
    timeout: 5000
})
//let token = cookie.getCookie('cms_token')
// 添加请求拦截器
service.interceptors.request.use(config => {
    // 在发送请求之前做某事，比如说 设置token
  let Authorization = window.localStorage.getItem('cms_token');
     config.headers['Authorization'] = Authorization;
    //config.headers['X-Token'] = 'xxxxxxxxxxxxxxxxxxx';
    return config;
}, error => {
    // 请求错误时做些事
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(response => {
  const res = response.data;
  // if(res.code === 200 || res.code === 201){
  //   Message({
  //     message: res.msg || res.message|| "success",
  //     type: "success",
  //     center:true
  //   });
  // }
  if (res.code===400 || res.code ===401){
    Message({
      message: res.msg ||  res.message|| "Error",
      type: "error",
      center:true
    });
  }
  if(res.code === 403){
    window.localStorage.removeItem('cms_token')
    MessageBox.alert('登录信息超时', "登录失效", {
      confirmButtonText: "跳转登录页面",
      callback: action => {
        // 跳转登录页
    window.location.href='/'
      }
    });
   
  }
  return response;
}, error => {
  return Promise.reject(error); // 返回接口返回的错误信息
})
export default service
