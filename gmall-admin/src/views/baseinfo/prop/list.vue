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


    <!--属性列表-->
    <div v-show="!showAttrInfoForm">
      <div style="margin-bottom:10px;">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addAttrInfo()">添加平台属性</el-button>
      </div>

      <!-- fit:宽度自适应 -->
      <el-table highlight-current-row
      :data="attrInfoList"
      v-loading="attrInfoListLoading" 
      element-loading-text="数据正在加载......"
      border
      fit
      >
        <el-table-column align="center" label="序号" width="100">
          <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
        </el-table-column>
        <el-table-column label="属性id" width="100">
          <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
        </el-table-column>
        <el-table-column label="属性名称">
          <template slot-scope="scope">
            <span>{{ scope.row.attrName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editAttrInfo(scope.row.id, scope.row.attrName)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

     <!--添加属性表单-->
    <el-form v-show="showAttrInfoForm" :model="attrInfoForm" :inline="true" class="demo-form-inline">

      <el-form-item label="属性名称">
        <el-input v-model="attrInfoForm.attrName"/>
      </el-form-item>

      <div style="margin-bottom:10px;">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addAttrValue()">添加属性值</el-button>
      </div>
      <div>
        <el-table
          v-loading="attrValueListLoading"
          :data="attrInfoForm.attrValueList"
          element-loading-text="数据正在加载......"
          border
          fit
          highlight-current-row>
          <el-table-column align="center" label="序号" width="100">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="属性值id" width="100">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="属性值名称">
            <!-- 
                 keyup.enter.native 键盘回车事件
                 blur 失去焦点事件
             -->
            <template slot-scope="scope">
              <el-input
                v-show="scope.row.edit"
                v-model="scope.row.valueName"
                class="edit-input"
                size="mini"
                @keyup.enter.native="unableEdit(scope.row)"
                @blur="unableEdit(scope.row)" />
              <span v-show="!scope.row.edit">{{ scope.row.valueName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="400" align="center">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-edit" @click="editAttrValueByName(scope.row)" >编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-edit" @click="deleteAttrValueByName(scope.row.valueName)" >删除</el-button>   
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top:22px;">
        <el-button type="primary" size="mini" @click="saveAttrInfoForm()">保存</el-button>
        <el-button type="default" size="mini" @click="backToAttrList()">返回</el-button>
      </div>
    </el-form>


  </div>
</template>

<script>
import prop from '@/api/baseinfo/prop'
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
      attrInfoList:[],
      attrInfoListLoading:false,
      //添加
      showAttrInfoForm:false,
      attrValueListLoading:false,
      attrInfoForm: {
        id: '',
        attrName: '',
        catalog3Id: '',
        attrValueList: []
      }


    }
  },
  created () {
    //初始化一级分类
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
       this.attrInfoList = []//一变，商品属性列表清空
       this.showAttrInfoForm = false

    },
    //二级分类change事件
    catalog2Changed(){
      prop.getCatalog3(this.catalog2Id)
      .then(response=>{
         this.catalog3Id = ''//二变，三数据为空
         this.catalog3ListInfo = response.data.catalog3List
      })
      this.attrInfoList = []//二变，商品属性列表清空
    },
    //三级分类change事件
    catalog3Changed(){
      prop.getAttrInfo(this.catalog3Id)
      .then(response=>{
        this.attrInfoList = response.data.attrList
      })
    },

    //添加属性列表
    addAttrInfo(){
      //表单显示之前 清空值
      this.attrInfoForm.id = null
      this.attrInfoForm.attrName = null
      this.attrInfoForm.attrValueList = []
      //显示添加属性值表单
      this.showAttrInfoForm = true
    },

    //添加属性值列表
    addAttrValue(){
      //点击一次，往this.attrInfoForm.attrValueList 添加一个attrValue
      const attrValue = {
        valueName: null,
        edit: true
      }
      this.attrInfoForm.attrValueList.push(attrValue)
    },

    //添加属性值时的键盘回车事件和失去焦点事件
    unableEdit(row){
      console.log("unable")
      row.edit = false
    },
    editAttrValueByName(row){
       row.edit = true
    },

    //点击保存按钮
    saveAttrInfoForm(){
      this.attrInfoForm.catalog3Id = this.catalog3Id
      prop.saveAttrInfo(this.attrInfoForm)
      .then(response=>{
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        //刷新属性列表
        this.getAttrInfoList()    
         //隐藏添加属性值的表单
        this.showAttrInfoForm = false  
      })

    },

    // 获取属性列表
    getAttrInfoList() {
      // 查询数据
      this.attrInfoListLoading = true
       prop.getAttrInfo(this.catalog3Id)
      .then(response=>{
        this.attrInfoList = response.data.attrList
        this.attrInfoListLoading = false
      })
    },

    editAttrInfo(attrId,valueName){
      this.attrInfoForm.id = attrId
      this.attrInfoForm.attrName = valueName
      this.attrValueListLoading = false
      //从后台取值，赋给attrInfoForm
      prop.getAttrValueByAttrId(attrId)
      .then(response=>{
        this.attrInfoForm.attrValueList = response.data.attrValueList
      })
       //显示属性表单
      this.showAttrInfoForm = true

    },

    backToAttrList(){
       // 隐藏添加属性值的表单
      this.showAttrInfoForm = false
    }







  }
}
</script>