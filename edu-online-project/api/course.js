import request from '@/utils/request'
export default {
  //课程列表  
  getCoursePageList(page, limit) {   
    return request({
      url: '/edufront/course/getFrontCourseList/'+page+'/'+limit,
      method: 'get'
    })
  },
  //课程详情
  getWebCourseInfo(id){
    return request({
        url: '/edufront/course/getFrontCourseInfo/'+id,
        method: 'get'
    })
  },
  //根据视频id获取视频凭证
  getPlayAuthByVideoId(id){
    return request({
        url: '/edufront/video/getPlayAuthByVideoId/'+id,
        method: 'get'
    })
  }
}