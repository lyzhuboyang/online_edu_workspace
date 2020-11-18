<template>
  <div class="app-container">

  <!--查询表单-->
  <el-form :inline="true" class="demo-form-inline">
    <!-- 一级分类 -->
    <el-form-item label="一级分类">
      <el-select v-model="catalog1Id" placeholder="请选择" @change="catalog1Changed">
        <el-option
          v-for="catalog1 in catalog1ListInfo"
          :key="catalog1.id"
          :label="catalog1.name"
          :value="catalog1.id"
        />
      </el-select>
    </el-form-item>

    <!-- 二级分类 -->
    <el-form-item label="二级分类">
      <el-select v-model="catalog2Id" placeholder="请选择" @change="catalog2Changed">
        <el-option
          v-for="catalog2 in catalog2ListInfo"
          :key="catalog2.id"
          :label="catalog2.name"
          :value="catalog2.id"
        />
      </el-select>
    </el-form-item>

    <!-- 三级分类 -->
    <el-form-item label="三级分类">
      <el-select v-model="catalog3Id" placeholder="请选择" @change="catalog3Changed">
         <el-option
          v-for="catalog3 in catalog3ListInfo"
          :key="catalog3.id"
          :label="catalog3.name"
          :value="catalog3.id"
        />
      </el-select>
    </el-form-item>
  </el-form>

    <!--spu列表-->
    <div v-show="!showSpuForm && !showSkuForm">
      <div style="margin-bottom:10px;">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addSpu()">添加SPU</el-button>
      </div>

      <el-table
        v-loading="spuListLoading"
        :data="spuList"
        element-loading-text="数据正在加载......"
        border
        fit
        highlight-current-row>
        <el-table-column align="center" label="序号" width="100">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="商品id" width="100">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="商品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.spuName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品描述">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addSku(scope.row.id, scope.row.spuName)">添加SKU</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div  v-show="showSpuForm">
      <!--spuForm表单-->
      <el-form :model="spuForm" label-width="70px">

        <el-form-item label="spu名称">
          <el-input v-model="spuForm.spuName"/>
        </el-form-item>

        <el-form-item label="spu描述">
          <el-input v-model="spuForm.description" :rows="5" type="textarea"/>
        </el-form-item>

        <el-form-item label="图片上传" >
          <el-upload
            :on-success="onUploadSuccess"
            :before-upload="beforeUpload"
            :on-preview="onUploadPreview"
            :on-remove="onUploadRemove"
            :multiple="true"
            :action="BASE_API+'/fileUpload'"
            class="upload-demo"
            list-type="picture-card">
            <i class="el-icon-plus"/>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过2MB</div>
          </el-upload>
        </el-form-item>

        <div style="margin-bottom:10px;">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addSaleAttr()">添加销售属性</el-button>
        </div>
        <div>
          <el-table
            v-loading="spuSaleAttrListLoading"
            :data="spuSaleAttrListTemp"
            element-loading-text="数据正在加载......"
            border
            fit
            highlight-current-row>
            <el-table-column align="center" label="序号" width="100">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="销售属性id" width="100">
              <template slot-scope="scope">
                {{ scope.row.saleAttrId }}
              </template>
            </el-table-column>
            <el-table-column label="销售属性名称" width="200">
              <template slot-scope="scope">
                <el-select
                  ref="saleAttr"
                  v-model="scope.row.saleAttr"
                  placeholder="请选择">
                  <el-option
                    v-for="baseSaleAttr in baseSaleAttrList"
                    :key="baseSaleAttr.id"
                    :label="baseSaleAttr.name"
                    :value="baseSaleAttr.id+'|'+baseSaleAttr.name"/>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="销售属性值">
              <template slot-scope="scope">
                <el-tag
                  v-for="tag in scope.row.spuSaleAttrValueList"
                  :key="tag"
                  :disable-transitions="false"
                  closable
                  @close="handleTagClose(tag, scope.row)">
                  {{ tag }}
                </el-tag>

                <el-input
                  v-if="scope.row.edit"
                  v-model="scope.row.saleAttrValue"
                  class="input-new-tag"
                  size="small"
                  @keyup.enter.native="saveAttrValue(scope.row)"
                  @blur="saveAttrValue(scope.row)" />
                <el-button v-else class="button-new-tag" size="small" @click="editAttrValue(scope.row)">+ 添加</el-button>

            </template></el-table-column>

            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" icon="el-icon-edit" @click="deleteSaleAttr(scope.row.saleAttr)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!--按钮-->
        <div style="margin-top:22px;">
          <el-button type="primary" size="mini" @click="saveSpuInfo()">保存</el-button>
          <el-button type="default" size="mini" @click="backToSpuList()">返回</el-button>
        </div>

        <!--图片预览-->
        <el-dialog :visible.sync="dialogImageVisible">
          <img :src="dialogImageUrl" width="100%" alt="">
        </el-dialog>
      </el-form>
  </div>

  <div v-show="showSkuForm">
      <!--skuForm基本表单-->
      <el-form :model="skuForm" label-width="150px">

        <el-form-item label="spu名称">
          <span>{{ spuForm.spuName }} </span>
        </el-form-item>

        <el-form-item label="sku名称">
          <el-input v-model="skuForm.skuName"/>
        </el-form-item>

        <el-form-item label="商品价格">
          <el-input v-model="skuForm.price"/>
        </el-form-item>

        <el-form-item label="商品重量（千克)">
          <el-input v-model="skuForm.weight"/>
        </el-form-item>

        <el-form-item label="商品规格描述">
          <el-input v-model="skuForm.skuDesc" :rows="5" type="textarea"/>
        </el-form-item>

      </el-form>

      <!--平台属性表单-->
      <el-form :model="skuForm" :inline="true" label-width="150px" class="demo-form-inline">
        <el-form-item
          v-for="(attrInfo, index) in attrInfoList"
          :key="attrInfo.id"
          :label="attrInfo.attrName">

          <el-select
            v-model="skuAttrValueListTemp[index]"
            placeholder="请选择">
            <el-option
              v-for="attrValue in attrInfo.attrValueList"
              :key="attrValue.id"
              :label="attrValue.valueName"
              :value="attrInfo.id+'|'+attrValue.id"/>
          </el-select>
        </el-form-item>
      </el-form>

      <!--销售属性表单-->
      <el-form :model="skuForm" :inline="true" label-width="150px" class="demo-form-inline">
        <el-form-item
          v-for="(saleAttr, index) in saleAttrList"
          :key="saleAttr.saleAttrId"
          :label="saleAttr.saleAttrName">

          <el-select
            v-model="skuSaleAttrValueListTemp[index]"
            placeholder="请选择">
            <el-option
              v-for="spuSaleAttrValue in saleAttr.spuSaleAttrValueList"
              :key="spuSaleAttrValue.id"
              :label="spuSaleAttrValue.saleAttrValueName"
              :value="spuSaleAttrValue.id+'|'+spuSaleAttrValue.saleAttrValueName+'|'+ saleAttr.saleAttrId+'|'+saleAttr.saleAttrName"/>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 图片列表 -->
      <el-table
        v-loading="skuImageListLoading"
        :data="skuImageList"
        element-loading-text="数据正在加载......"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column align="center" label="序号" width="100">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="图片" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" :alt="scope.row.imgName" width="178">
          </template>
        </el-table-column>
        <el-table-column label="图片名称">
          <template slot-scope="scope">
            {{ scope.row.imgName }}
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.default" size="mini" type="success">默认</el-tag>
            <el-button v-else type="primary" size="mini" @click="setDefault(scope.row)">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--表单按钮-->
      <el-form :model="skuForm" label-width="150px">
        <!--按钮-->
        <div style="margin-top:22px;">
          <el-button type="primary" size="mini" @click="saveSkuInfo()">保存</el-button>
          <el-button type="default" size="mini" @click="backToSpuList()">返回</el-button>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>
import spu from '@/api/product/spu'
import prop from '@/api/baseinfo/prop'
import sku from '@/api/product/sku'
export default {
  data() {
    return {
      //查询
      catalog1Id:"",
      catalog2Id:"",
      catalog3Id:"",
      catalog1ListInfo:[],
      catalog2ListInfo:[],
      catalog3ListInfo:[],
      attrInfoListLoading:false,

      spuList:[],
      spuListLoading:false,
     
    
      //spuForm相关的数据
      showSpuForm:false,
      // 基本销售属性列表
      baseSaleAttrList: [],
      // 接口API地址
      BASE_API: process.env.BASE_API,

      // Spu表单数据
      spuForm:{
        id: null,
        spuName: null,
        description: null,
        catalog3Id: null,
        // 上传文件列表
        spuImageList: [],
        // 销售属性
        spuSaleAttrList: []
      },
      spuSaleAttrListTemp: [], // 临时数据：格式：saleAttrId|saleAttrName

      // 销售属性列表loading
      spuSaleAttrListLoading: false,

      // 图片预览区域url
      dialogImageUrl: '',
      // 图片预览对话框
      dialogImageVisible: false,


      // Sku相关的数据
      showSkuForm:false,
      skuForm: {
        id: null,
        spuId: null,
        price: null,
        skuName: null,
        weight: null,
        skuDesc: null,
        catalog3Id: null,

        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuImageList: [],
        skuDefaultImg: null
      },

      // 平台属性列表数据
      attrInfoList: [],
      // 销售属性列表数据
      saleAttrList: [],
      // 图片列表数据
      skuImageList: [],
      // 图片列表多选选中的数据
      multipleSelectionSkuImageList: [],
      skuImageListLoading: false,

      // 当前sku的平台属性：格式：attrId|valueId
      skuAttrValueListTemp: [],
      // 当前sku的销售属性：格式：saleAttrValueId|saleAttrValueName|saleAttrId|saleAttrName
      skuSaleAttrValueListTemp: []


    }
  },

  created () {
    this.getCatalog1List()
  },

  methods: {
      //查询一级分类
    getCatalog1List(){
      prop.getCatalog1()
      .then(response=>{
        this.catalog1ListInfo = response.data.catalog1List
      })
    },
    //一级分类change事件
    catalog1Changed(){
       prop.getCatalog2(this.catalog1Id)
       .then(response=>{
         this.catalog2Id = ''//一变，二三数据为空
         this.catalog3Id = ''
         this.catalog2ListInfo = response.data.catalog2List
       })
       this.spuList = []//一变，商品属性列表清空
       this.showAttrInfoForm = false

    },
    //二级分类change事件
    catalog2Changed(){
      prop.getCatalog3(this.catalog2Id)
      .then(response=>{
         this.catalog3Id = ''//二变，三数据为空
         this.catalog3ListInfo = response.data.catalog3List
      })
       this.spuList = []//二变，商品属性列表清空
    },
    //三级分类change事件
    catalog3Changed(){
      spu.getSpuList(this.catalog3Id)
      .then(response=>{
        this.spuList = response.data.spuList
      })
    },
     // 选择三级分类确认
    confirmSelect() {
      if (!this.catalog3Id) {
        this.$alert('请选择三级分类', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return false
      }
      return true
    },
    
    //添加Spu事件
    addSpu(){
      if (!this.confirmSelect()) {
        return
      }
      // 初始化表单
      this.spuFormInit()

      // 显示表单
      this.showSpuForm = true
    },
    spuFormInit(){
      // 初始化值
      // Spu表单数据
      this.spuForm = {
        id: null,
        spuName: null,
        description: null,
        catalog3Id: null,
        // 上传文件列表
        spuImageList: [],
        // 销售属性
        spuSaleAttrList: []
      }
      this.getBaseSaleAttrList()
    },

    // 获取基本销售属性列表
    getBaseSaleAttrList() {
      spu.getBaseSaleAttrList().then(response => {
        this.baseSaleAttrList = response.data.baseSaleAttrList
      })
    },

     // 文件上传限制条件
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isGIF = file.type === 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG && !isPNG && !isGIF) {
          this.$message.error('上传头像图片只能是 JPG、PNG 或 GIF 格式!')
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return false
        }
        return true
      },

      // 上传图片成功的回调
      onUploadSuccess(res, file) {
        // 填充上传文件列表
        this.spuForm.spuImageList.push({
          imgName: file.name,
          imgUrl: file.response.data.imageUrl
        })
      },

      // 上传的文件预览
      onUploadPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogImageVisible = true
      },

      // 删除上传的文件
      onUploadRemove(file, fileList) {
        this.spuForm.spuImageList = []
        fileList.forEach(file => {
          this.spuForm.spuImageList.push({
            imgName: file.name,
            imgUrl: file.response.data.imageUrl
          })
        })
      },
      // 图片多选的数据
      handleSelectionChange(val) {
        this.multipleSelectionSkuImageList = val
      },

      // 添加销售属性
    addSaleAttr() {
      const saleAttr = {
        saleAttr: null, // id|name 字符串
        saleAttrValue: null, // current input tag
        edit: false,
        spuSaleAttrValueList: [] // [tag1, tag2, tag3]
      }
      this.spuSaleAttrListTemp.push(saleAttr)
    },

    saveSpuInfo(){
      this.spuForm.catalog3Id = this.catalog3Id
      this.spuForm.spuSaleAttrList = []
      this.spuSaleAttrListTemp.forEach(spuSaleAttr => {
        // 处理销售属性
        const arr = spuSaleAttr.saleAttr.split('|')
        spuSaleAttr.saleAttrId = arr[0]
        spuSaleAttr.saleAttrName = arr[1]
        const saleAttr = {
          saleAttrId: arr[0],
          saleAttrName: arr[1],
          spuSaleAttrValueList: []
        }

        // 处理销售属性值
        spuSaleAttr.spuSaleAttrValueList.forEach(spuSaleAttrValue => {
          const saleAttrValue = {
            saleAttrId: arr[0],
            saleAttrValueName: spuSaleAttrValue
          }
          saleAttr.spuSaleAttrValueList.push(saleAttrValue)
        })

        this.spuForm.spuSaleAttrList.push(saleAttr)
      })

      spu.saveSpu(this.spuForm)
      .then(response=>{
        //隐藏SpuForm表单
        this.showSpuForm = false
        //刷新列表
        spu.getSpuList(this.catalog3Id).then(response=>{this.spuList = response.data.spuList})
      })
    },

     // 保存销售属性值
    saveAttrValue(row) {
      if (!row.spuSaleAttrValueList) {
        row.spuSaleAttrValueList = []
      }

      const saleAttrValue = row.saleAttrValue
      if (saleAttrValue) {
        row.spuSaleAttrValueList.push(saleAttrValue)
      }

      row.saleAttrValue = ''
      row.edit = false
    },

    editAttrValue(row){
      row.edit = true
    },
    // 根据name删除销售属性
    deleteSaleAttr(saleAttr) {
      const tempList = []
      this.spuForm.spuSaleAttrList.forEach(item => {
        if (item.saleAttr !== saleAttr) {
          tempList.push(item)
        }
      })
      this.spuForm.spuSaleAttrList = tempList
    },

      // 删除销售属性值
    handleTagClose(tag, row) {
      const index = row.spuSaleAttrValueList.indexOf(tag)
      row.spuSaleAttrValueList.splice(index, 1)
    },

    //添加SKU
    // 添加sku
    addSku(spuId, spuName) {
      this.spuForm.spuId = spuId
      this.spuForm.spuName = spuName
      // 初始化表单
      this.SkuFormInit(spuId)
      // 显示表单
      this.showSkuForm = true
    },

     SkuFormInit(spuId) {
      // Sku表单数据
      this.skuForm = {
        id: null,
        spuId: null,
        price: null,
        skuName: null,
        weight: null,
        skuDesc: null,
        catalog3Id: null,

        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuImageList: [],
        skuDefaultImg: null
      }
      this.skuAttrValueListTemp=[],
      this.skuSaleAttrValueListTemp=[],
      // 获取平台属性列表
      this.getAttrInfoList()
      // 获取销售属性列表
      this.getSaleAttrList(spuId)
      // 获取图片列表
      this.getSpuImageList(spuId)
    },

    getAttrInfoList(){
      prop.getAttrInfo(this.catalog3Id)
      .then(response=>{
         this.attrInfoList = response.data.attrList
      })
    },
    getSaleAttrList(spuId){
      spu.getSaleAttrList(spuId)
      .then(response=>{
        this.saleAttrList = response.data.spuSaleAttrList
      })
    },

    getSpuImageList(spuId){
      spu.getSpuImgList(spuId)
      .then(response=>{
        this.skuImageList = response.data.spuImgList
      })
    },

   // 设为默认
    setDefault(row) {
      this.skuImageList.forEach(skuImage => {
        skuImage.default = false
      })
      row.default = true
    },

    // 保存Sku
    saveSkuInfo() {
      this.skuForm.catalog3Id = this.catalog3Id
      this.skuForm.spuId =  this.spuForm.spuId

      // 填充平台属性
      this.skuForm.skuAttrValueList = []
      this.skuAttrValueListTemp.forEach(skuAttrValueTemp => {
        const arr = skuAttrValueTemp.split('|')
        const skuAttrValue = {
          attrId: arr[0],
          valueId: arr[1]
        }
        this.skuForm.skuAttrValueList.push(skuAttrValue)
      })

      // 填充销售属性
      this.skuForm.skuSaleAttrValueList = []
      this.skuSaleAttrValueListTemp.forEach(skuSaleAttrValueTemp => {
        const arr = skuSaleAttrValueTemp.split('|')
        const skuSaleAttrValue = {
          saleAttrValueId: arr[0],
          saleAttrValueName: arr[1],
          saleAttrId: arr[2],
          saleAttrName: arr[3]
        }
        this.skuForm.skuSaleAttrValueList.push(skuSaleAttrValue)
      })

      // 填充图片列表
      this.skuForm.skuImageList = []
      this.multipleSelectionSkuImageList.forEach(skuImageTemp => {
        const skuImage = {
          spuImgId: skuImageTemp.id,
          imgName: skuImageTemp.imgName,
          imgUrl: skuImageTemp.imgUrl,
          isDefault: skuImageTemp.default ? 1 : 0
        }
        this.skuForm.skuImageList.push(skuImage)

        if (skuImageTemp.default) {
          this.skuForm.skuDefaultImg = skuImageTemp.imgUrl
        }
      })

      sku.saveSkuInfo(this.skuForm)
      .then(response => {
        // 隐藏表单
        this.showSpuForm = false
        this.showSkuForm = false
        // 刷新Spu列表
        spu.getSpuList(this.catalog3Id).then(response=>{this.spuList = response.data.spuList})
        
      })
    },

  }  
}
</script>
