import request from '@/utils/request'
export default {
  //添加小节
  saveVideo(video){
    return request({
      url: '/guliedu/video/saveVideo',
      method: 'post',
      data:video
    })
  },
   //根据小节id查询
   getVideoInfo(videoId){
    return request({
      url: '/guliedu/video/getVideoInfo/'+videoId,
      method: 'get'
    })
  },
  //修改小节的方法
  updateVideoInfo(video){
    return request({
      url: '/guliedu/video/updateVideo',
      method: 'post',
      data:video
    })
  },
  //删除小节的方法
  deleteVideo(videoId){
    return request({
      url: '/guliedu/video/'+videoId,
      method: 'delete'
    })
  },
  //删除小节中的视频
  removeVideoAliyun(videoId){
    return request({
      url: '/eduvod/video/'+videoId,
      method: 'delete'
    })
  },
  

}