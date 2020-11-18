import request from '@/utils/request'
export default {
  // 查找一级分类
  getCatalog1() {
    return request({
      url: '/gmall/manageweb/getCatalog1',
      method: 'get'
    })
  },

   // 查找二级分类
   getCatalog2(catalog1Id) {
    return request({
      //url: '/gmall/manageweb/getCatalog2?'+'catalog1Id='+catalog1Id,//正常风格的
      url: '/gmall/manageweb/getCatalog2/'+catalog1Id,//restful风格的
      method: 'get'
    })
  },

   // 查找三级分类
   getCatalog3(catalog2Id) {
    return request({
      //url: '/gmall/manageweb/getCatalog3?'+'catalog2Id='+catalog2Id,
      url: '/gmall/manageweb/getCatalog3/'+catalog2Id,
      method: 'get'
    })
  },

  //根据三级分类Id查找商品属性
  getAttrInfo(catalog3Id){
    return request({
      url: '/gmall/manageweb/attrInfoList/'+catalog3Id,
      method: 'get'
    })
  },

  //添加平台属性
   //添加章节
   saveAttrInfo(attrInfo){
    return request({
      url: '/gmall/manageweb/saveAttrInfo',
      method: 'post',
      data:attrInfo
    })
  },

  //根据属性Id查询属性值
  getAttrValueByAttrId(attrId){
    return request({
      url: '/gmall/manageweb/getAttrValueList/'+attrId,
      method: 'get'
    })
  }

}
