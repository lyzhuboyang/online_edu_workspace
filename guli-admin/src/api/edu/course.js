import request from '@/utils/request'
export default {
  //添加课程信息
  addCourseInfo(courseInfo) {
    return request({
      url: '/guliedu/course/addCourse',
      method: 'post',
      data:courseInfo
    })
  },
   //查询所有讲师，为了添加课程信息使用
   getAllTeacherList() {
    return request({
      url: '/guliedu/edu-teacher',
      method: 'get'
    })
  },
  //根据课程id查询课程信息
  getCourseInfo(id){
    return request({
      url: '/guliedu/course/getCourseInfo/'+id,
      method: 'get'
    })
  },
  //修改课程信息
  updateCourseInfo(courseInfo){
    return request({
      url: '/guliedu/course/updateCourse',
      method: 'post',
      data:courseInfo
    })
  },
  //根据课程id查询课程信息（为了确认页面）
  getPublishCourseInfo(courseId){
    return request({
      url: '/guliedu/course/publishCourseInfo/'+courseId,
      method: 'get'
    })
  },
  //修改课程状态，实现最终发布
  finalPublishCourse(courseId){
    return request({
      url: '/guliedu/course/finalPublishCourse/'+courseId,
      method: 'put'
    })
  },
  //查询所有的课程
  getAllCoursePageCondition(page,limit,courseQuery){
    return request({
      url: '/guliedu/course/getAllCoursePageCondition/'+page+'/'+limit,
      method: 'post',
      data:courseQuery
    })
  },
  //根据课程id删除课程
  deleteCourseByCourseId(courseId){
    return request({
      url: '/guliedu/course/'+courseId,
      method: 'delete'
    })
  }


}