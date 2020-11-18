<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="活动名称">
        <el-input v-model="courseQuery.title"/>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="courseQuery.status" clearable>
          <el-option label="未发布" value="Draft"></el-option>
          <el-option label="已发布" value="Normal"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getListPageCourse()">查询</el-button>
    </el-form>
    课程列表
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column prop="title" label="课程名称" width="290" />
      <el-table-column prop="lessonNum" label="课时数" width="180" />
      <el-table-column prop="price" label="课程价格(元)" width="150" />
      <el-table-column label="课程状态" width="120">
        <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'Draft' ? 'primary' : 'success'">{{scope.row.status === 'Draft' ? '未发布' : '已发布'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope" >
          <el-button id="editCourseButton" type="primary" icon="el-icon-edit" size="mini" @click="editCourseInfo(scope.row.id)" >编辑课程信息</el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editCourseOutline(scope.row.id)">编辑课程大纲</el-button>
          <el-button type="success" icon="el-icon-message" size="mini" @click="courseFinalPublish(scope.row.id)">课程最终发布</el-button>
          <el-button type="danger"  icon="el-icon-delete" size="mini" @click="deleteCourse(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getListPageCourse"
    />
  </div>
</template>
<script>
import course from '@/api/edu/course'
export default {
  data () {//定义变量和初始值
    return {
      listLoading:false,//显示转图标，true表示显示，false表示不显示
      list:null,//
      total:0,//
      page:1,//页码
      limit:10,//每页记录数
      courseQuery:{}//多条件查询，条件分装对象
    }
  },
  created () {//在页面渲染之前执行，一般都是调用methods里面的方法
    this.getListPageCourse()
  },
  methods: {//创建方法，调用api
    //编辑课程信息
    editCourseInfo(courseId){
        this.$router.push({path:'/edu/course/info/'+courseId})
    },
    //编辑课程大纲
    editCourseOutline(courseId){
        this.$router.push({path:'/edu/course/chapter/'+courseId})
    },
    //课程最终发布
    courseFinalPublish(courseId){
        this.$router.push({path:'/edu/course/publish/'+courseId})
    },
    deleteCourse(courseId){
      this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return  course.deleteCourseByCourseId(courseId)
      }).then(() => {
        this.getListPageCourse()// 刷新列表
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    //讲师列表的方法
    getListPageCourse(page=1){
      this.listLoading = true
      this.page = page
      //调用api
      course.getAllCoursePageCondition(this.page,this.limit,this.courseQuery)
      .then(response=>{
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })//调用成功
      .catch(response=>{
      })//调用失败
    }
  }
}
</script>

<style scoped>
/* 上下两个按钮没有对齐的解决办法 */
#editCourseButton {
    margin-left: 10px;
}
</style>