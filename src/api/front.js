import request from '../utils/request'
export default {
    getCarousel(){
        return request({
            url: '/api/portal/list/carousel',
            method:'get'
        })
    },



}