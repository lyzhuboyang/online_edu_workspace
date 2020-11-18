import request from '@/utils/request'
export default {
  // 保存Sku
  saveSkuInfo(skuInfo){
    return request({
      url: '/gmall/skumanage/saveSku' ,
      method: 'post',
      data:skuInfo
    })
  }
}
