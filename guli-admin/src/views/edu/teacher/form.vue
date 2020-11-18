<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 
        field="file"底层是 <input type="file" name="file"/>
        -->
        <image-cropper v-show="imagecropperShow"
        :width="300"
        :height="300"
        :key="imagecropperKey"
        :url="BASE_API+'/eduoss/fileupload/upload'"
        field="file"
        @close="close"
        @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

const defaultform = {
  name: '',
  sort: 0,
  level: '',
  career: '',
  intro: '',
  avatar: ''
}

export default {
  components: { ImageCropper, PanThumb },

  data () {
    return {
      //用于封装
      teacher:defaultform,//用于封装表单数据的对象
      saveBtnDisabled:false,//保存按钮是否禁用
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件 
      imagecropperKey: 0 // 上传组件id
    }
  },
  watch: {//监听
    $route(to,from){
      this.init()
    }
  },
  created () {//在页面渲染之前执行
    this.init()
  },
  methods: {
    init(){
      //根据讲师id进行执行
      //1 从路由中获取id
      //2 判断路由里面是否有id的值，如果有id值，根据id查询
      if(this.$route.params &&  this.$route.params.id){
        const id = this.$route.params.id
        //调用方法根据id查询
        this.getTeacherInfoById(id)
      }else{
        //路由里面没有id值，做添加
        //把表单数据清空
        //this.teacher.name = ''
        //使用对象拓展运算符，拷贝对象，。而不是引用
        //否则，新增一条记录后，defaultform变成了之前新增的teacher值
        this.teacher = {...defaultform}
      }
    },
    //根据id查询讲师信息
    getTeacherInfoById(id){
      teacher.getTeacherInfoById(id)
      .then(response=>{
        this.teacher = response.data.teacher
      })
    },
    saveOrUpdate(){
      this.saveBtnDisabled = true
      //判断讲师对象里面的id值
      if(!this.teacher.id){
        //添加操作
        this.addTeacher()
      }else{
        //修改操作
        this.updateTeacher()
      }
    },
    //添加的方法
    addTeacher(){
      teacher.saveTeacher(this.teacher)
      .then(response=>{//添加成功调用then
        this.$message({
            type: 'success',
            message: '添加成功'
          });
          //回到列表页面 
          //使用路由跳转
          this.$router.push({path:'/edu/teacher/list'})       
      })
    },
    //修改的方法
    updateTeacher(){
      teacher.modifyTeacher(this.teacher).then(response=>{
        this.$message({
            type: 'success',
            message: '修改成功'
          });
        this.$router.push({path:'/edu/teacher/list'})
      })
    },
    //上传头像成功之后调用的方法
    cropSuccess(data){ 
      //关闭弹框
      this.imagecropperShow = false
      //获取上传之后的oss地址
      this.teacher.avatar = data.url
      //上传弹框组件初始化
      this.imagecropperKey = this.imagecropperKey+1
    },
    //关闭弹框之后的方法
    close(){
      this.imagecropperShow = false;
      //上传弹框组件初始化
      this.imagecropperKey = this.imagecropperKey+1
    }
  }
}
</script>