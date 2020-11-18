import request from '@/utils/request'
export default {
  //讲师列表  
  getTeacherPageList(page, limit) {   
    return request({
      url: '/edufront/teacher/getFrontTeacherList/'+page+'/'+limit,
      method: 'get'
    })
  },
  //讲师详情
  getTeacherInfo(id){
    return request({
        url: '/edufront/teacher/getFrontTeacherInfo/'+id,
        method: 'get'
    })
  }
}