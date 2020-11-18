import request from '@/utils/request'
export default {
  //根据日期获取数据添加到统计分析表
  createData(day) {
    return request({
      url: '/edusta/statistics/getRegisterCount/'+day,
      method: 'get'
    })
  },

  showCountData(searchObj){
    return request({
        url: `/edusta/statistics/getCountData/${searchObj.begin}/${searchObj.end}/${searchObj.type}`,
        method: 'get'
      })
  },








}