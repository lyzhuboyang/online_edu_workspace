import request from '@/utils/request'
export default {
  //课程列表  
  getUserInfoJwt(token) {   
    return request({
      url: '/educenter/member/getUserInfoJwt/'+token,
      method: 'get'
    })
  },
 
}