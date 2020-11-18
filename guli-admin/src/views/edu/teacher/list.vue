<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherquery.name" placeholder="讲师名"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherquery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherquery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherquery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getListPageTeacher()">查询</el-button>
      <!-- getListPageTeacher()这里必须加括号 -->
      <!-- <el-button type="default" @click="resetData()">清空</el-button> -->
    </el-form>

    讲师列表
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="success" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteTeacher(scope.row.id)">删除</el-button>
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
      @current-change="getListPageTeacher"
    />
    <!--有的浏览器分页效果可能出不来 @current-change="getListPageTeacher()"  -->
  </div>
</template>
<script>
//引入api里面teacher.js文件
import teacher from '@/api/edu/teacher'
export default {
  data () {//定义变量和初始值
    return {
      listLoading:false,//显示转图标，true表示显示，false表示不显示
      list:null,//
      total:0,//
      page:1,//页码
      limit:10,//每页记录数
      teacherquery:{}//多条件查询，条件分装对象
    }
  },
  created () {//在页面渲染之前执行，一般都是调用methods里面的方法
    this.getListPageTeacher()
  },
  methods: {//创建方法，调用api
    //讲师列表的方法
    getListPageTeacher(page=1){
      this.listLoading = true
      this.page = page
      //调用api
      teacher.getTeacherPageList(this.page,this.limit,this.teacherquery)
      .then(response=>{
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })//调用成功
      .catch(response=>{

      })//调用失败
    },
    //讲师删除的方法
    deleteTeacher(id){
        this.$confirm('此操作将永久删除讲师数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//点击确定，执行then
          //调用api的方法执行删除
          // teacher.removeTeacher(id)
          // .then(response =>{
          //   this.$message({
          //     type: 'success',
          //     message: '删除成功!'
          //   });
          // })
          // .catch(response=>{})
          return teacher.removeTeacher(id) //下面继续执行
        }).then(resopnse=>{
            //刷新页面
            this.getListPageTeacher()
            this.$message({
            type: 'success',
            message: '删除成功'
          });        
        })
        .catch(response => {//点击取消，执行catch
          //如果以下提示信息出现两次，可以把catch这段代码删除
          if (response === 'cancel') {
            this.$message({
                type: 'info',
                message: '已取消删除'
            })
          } else {
            this.$message({
                type: 'error',
                message: '删除失败'
            })
          }
        });
    }
  }
}
</script>