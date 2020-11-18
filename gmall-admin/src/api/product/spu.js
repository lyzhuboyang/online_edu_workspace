import request from '@/utils/request'

export default {

  // 根据三级分类id获取属性列表
  getSpuList(catalog3Id) {
    return request({
      url: '/gmall/manageweb/getSpuList/' + catalog3Id,
      method: 'get'
    })
  },

  getBaseSaleAttrList(){
    return request({
      url: '/gmall/spumanage/getBaseSaleAttrList' ,
      method: 'get'
    })
  },

  saveSpu(spuInfo){
    return request({
      url: '/gmall/spumanage/saveSpuInfo' ,
      method: 'post',
      data:spuInfo
    })
  },

  getSpuImgList(spuId){
    return request({
      url: '/gmall/spumanage/spuImageList/'+spuId,
      method: 'get'
    })
  },

  getSaleAttrList(spuId){
    return request({
      url: '/gmall/spumanage/spuSaleAttrList/'+spuId,
      method: 'get'
    })
  },


}
