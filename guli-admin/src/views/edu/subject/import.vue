<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'https://guliuedu-online.oss-cn-beijing.aliyuncs.com/import_subject_template/subjectdata.xlsx'">点击下载模版</a>
          <!-- <a :href="'/static/subjectdata.xlsx'">点击下载模版</a> -->
        </el-tag>
      </el-form-item>
      <el-form-item label="选择Excel">
        <!-- ref相当于id 
             auto-upload自动上传
             on-success上传成功调用这个方法
             on-error上传失败调用这个方法
             disabled按钮上传一次之后就不能点击
             limit 唯一标识
             action 接口路径
             name 和input的name一致
             accept 只接受excel格式的文件 mime服务器只认识这种形式的
        -->
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/guliedu/subject/importData'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      BASE_API: process.env.BASE_API, // 接口API地址
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false
    }
  },
  created () {
    
  },
  methods: {
    //提交上传表单的方法
    submitUpload(){
      this.importBtnDisabled = true
      this.loading = true
      //document.getElementById("formid").submit()
      this.$refs.upload.submit()
    },
    //上传成功之后调用的方法
    fileUploadSuccess(response){
       if (response.success === true) {
        this.loading = false
        this.$message({
            type: 'success',
            message: "导入数据成功"
        })
      } else {
        this.loading = false
        const messages = response.data.msg
        let msgString = '<ul>'
        messages.forEach(msg => {
            msgString += `<li>${msg}</li>`
        })
        msgString += '</ul>'
        this.$alert(msgString, response.message, {
            dangerouslyUseHTMLString: true
        })
      }
    },
    //上传失败的方法
    fileUploadError(){
       this.loading = false
       this.$message({
        type: 'error',
        message: '导入失败'
      })
    }
  }
  
}
</script>