import request from '@/utils/request'
export default {
  //讲师条件查询带分页列表
  getTeacherPageList(page, limit, teacherQuery) {
    return request({
      url: '/guliedu/edu-teacher/findMoreConditionPage/'+page+'/'+limit,
      method: 'post',
      data: teacherQuery //data表示数据使用json进行传递
    })
  },
  //删除讲师
  removeTeacher(id){
    return request({
      url: '/guliedu/edu-teacher/'+id,
      method: 'delete',
    })
  },
  //添加讲师
  saveTeacher(teacher){
    return request({
      url: '/guliedu/edu-teacher/addTeacher',
      method: 'post',
      data:teacher
    })
  },
  //根据id查询
  getTeacherInfoById(id){
    return request({
      url: '/guliedu/edu-teacher/getTeacherInfo/'+id,
      method: 'get'
    })
  },
  //修改讲师的方法
  modifyTeacher(teacher){
    return request({
      url: '/guliedu/edu-teacher/updateTeacher',
      method: 'post',
      data:teacher
    })
  }

}