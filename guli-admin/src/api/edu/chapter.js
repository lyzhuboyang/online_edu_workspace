import request from '@/utils/request'
export default {
  //根据课程id查询所有章节和小节
  getAllChapterVideo(courseId) {
    return request({
      url: '/guliedu/chapter/getChapterVideoByCourseId/'+courseId,
      method: 'get'
    })
  },
  //添加章节
  saveChapter(chapter){
    return request({
      url: '/guliedu/chapter/saveChapter',
      method: 'post',
      data:chapter
    })
  },
   //根据章节id查询
   getChapterInfo(chapterId){
    return request({
      url: '/guliedu/chapter/getChapterInfo/'+chapterId,
      method: 'get'
    })
  },
  //修改章节的方法
  updateChapterInfo(chapter){
    return request({
      url: '/guliedu/chapter/updateChapter',
      method: 'post',
      data:chapter
    })
  },
  //删除章节
  deleteChapter(chapterId){
    return request({
      url: '/guliedu/chapter/'+chapterId,
      method: 'delete'
    })
  }



}