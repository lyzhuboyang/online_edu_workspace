import request from '@/utils/request'
export default {
  //分类列表显示
  getSubjectList() {
    return request({
      url: '/guliedu/subject/getAllSubject',
      method: 'get'
    })
  },
  //删除分类的方法
  removeSubject(id){
    return request({
      url: '/guliedu/subject/deleteSubjectId/'+id,
      method: 'delete'
    })
  },
  //添加一级分类
  addOne(subject){
    return request({
      url: '/guliedu/subject/addOneLevel',
      method: 'post',
      data:subject
    })
  },
  //添加二级分类
  addTwo(subject){
    return request({
      url: '/guliedu/subject/addOneLevel',
      method: 'post',
      data:subject
    })
  }

}