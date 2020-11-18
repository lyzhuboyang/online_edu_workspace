<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
    <!-- ref类似于id，唯一标识
    data 数据库中查出的数据
    props 定义子节点和节点的键名称 
     -->
     <el-button type="text" @click="openDialogOneLevel()">添加一级分类</el-button>
     <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      class="filter-tree"
      default-expand-all
      node-key="id">
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <!-- 使用Chrome的Vue插件调试 -->
          <el-button
            v-if="node.level == 1"
            type="text"
            size="mini"
            @click="() => append(data)">添加</el-button>
          <el-button
            v-if="node.level == 2||node.level == 1"
            type="text"
            size="mini"
            @click="() => remove(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog :visible.sync="dialogFormVisible" title="添加分类">
        <el-form :model="subject" label-width="120px">
            <el-form-item label="分类标题">
                <el-input v-model="subject.title"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="saveSubject()">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import subject from '@/api/edu/subject'
export default {
  data() {
    return {
      filterText: '',
      data2: [],
      defaultProps: {
          //和后端的OneSubjectDto中的属性名称一样
        children: 'children',
        label: 'title'
      },
      dialogFormVisible:false,//弹框默认不显示
      subject:{
        title:'',
        parentId:''
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  created () {
      this.getSubjectListAll()

  },

  methods: {
    //点击添加二级分类按钮，弹框
    append(data){
       //弹框
      this.dialogFormVisible = true
      //清空表单数据
      this.subject.title = ''
      //把一级分类id设置到subject对象
      this.subject.parentId = data.id
    },
    //添加分类
    saveSubject(){
      //判断添加一级还是二级
      if(!this.subject.parentId){
        //没有parentid，添加一级分类
        this.saveOneLevel()
      }else{
        //有parentid，添加二级分类  
        this.saveTwoLevel()
      }
    },
    //添加一级分类
    saveOneLevel(){
      subject.addOne(this.subject)
      .then(response=>{
         //关闭弹框
         this.dialogFormVisible = false
         //刷新界面
         this.getSubjectListAll()
         this.$message({
              type: 'success',
              message: '添加成功'
          }); 
      })
    },
    //弹出一级分类
    openDialogOneLevel(){
      this.dialogFormVisible = true
      //清空表单数据
      this.subject.title = ''
      this.subject.parentId = ''
    },
    //删除分类
    remove(node,data){
      this.$confirm('此操作将永久删除分类数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//点击确定，执行then
          return subject.removeSubject(data.id) //下面继续执行
        }).then(resopnse=>{
            //刷新页面
            //this.getSubjectListAll()
            //使用dom操作，把节点删除，不需要查询数据库，直接在页面操作
            //document.getElementById("父节点id").removeChild("删除节点")
            this.$refs.tree2.remove(node)
            this.$message({
              type: 'success',
              message: '删除成功'
            });        
        })
        // .catch(response => {//点击取消，执行catch
        //   //如果以下提示信息出现两次，可以把catch这段代码删除
        //   if (response === 'cancel') {
        //     this.$message({
        //         type: 'info',
        //         message: '已取消删除'
        //     })
        //   } else {
        //     this.$message({
        //         type: 'error',
        //         message: response.message
        //     })
        //   }
        // });
    },
    //获取所有分类列表    
    getSubjectListAll(){
        subject.getSubjectList()
        .then(response=>{
            this.data2 = response.data.subjectList
        })
    },
    filterNode(value, data) {
      //value是框中输入的值
      if (!value) return true
        return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },

    //添加二级分类
    saveTwoLevel(){
      subject.addTwo(this.subject)
      .then(response=>{
        //关闭弹框
         this.dialogFormVisible = false
         //刷新界面
         this.getSubjectListAll()
         this.$message({
              type: 'success',
              message: '添加成功'
          }); 
      })
    }





  }
}
</script>
