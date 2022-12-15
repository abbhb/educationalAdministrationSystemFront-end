<template>
<div>



  <el-table tooltip-effect="dark" :data="tableData" style="width: 100%" max-height="530">
    <el-table-column fixed prop="id" label="课程ID" width="50" />
    <el-table-column prop="courseName" label="课程名" width="120" />
    <el-table-column show-overflow-tooltip prop="courseZJ" label="上课时间" width="260" />
    <el-table-column show-overflow-tooltip prop="courseZ" label="上课周数" width="300" />
    <el-table-column prop="courseAddress" label="上课地点" width="100" />
    <el-table-column prop="courseTeacherId" label="授课老师ID" width="50" />
    <el-table-column prop="courseTeacherName" label="授课老师" width="120" />
    <el-table-column prop="courseCredits" label="学分" width="40" />
    <el-table-column fixed="right" label="操作" width="170">
      <template #default="scope">
        <div style="display: flex;flex-direction: row;">
          <el-button
              link
              type="primary"
              size="small"
              @click.prevent="bianjiRow(scope)"
          >
            编辑
          </el-button>
          <el-button
              link
              type="danger"
              size="small"
              @click.prevent="deleteRow(scope)"
          >
            删除
          </el-button>
        </div>

      </template>
    </el-table-column>
  </el-table>

  <el-dialog :visible.sync="isbianji">
    <el-form :model="formss" label-width="120px">
      <el-form-item label="课程ID">
        <el-input v-model="formss.id" disabled />
      </el-form-item>
      <el-form-item label="课程名">
        <el-input v-model="formss.courseName" />
      </el-form-item>
      <el-form-item label="课程时间">
        <el-input v-model="formss.courseZJ" />
      </el-form-item>
      <el-form-item label="课程周">
        <el-input v-model="formss.courseZ" />
      </el-form-item>
      <el-form-item label="课程地点">
        <el-input v-model="formss.courseAddress" />
      </el-form-item>
      <el-form-item label="指导教师">
        <el-input v-model="formss.courseTeacherName" />
      </el-form-item>
      <el-form-item label="指导教师ID">
        <el-input v-model="formss.courseTeacherId" />
      </el-form-item>
      <el-form-item label="课程学分">
        <el-input v-model="formss.courseCredits" />
      </el-form-item>
    </el-form>
  </el-dialog>


</div>

</template>

<script>
import * as Api from "@/api/login";
import {MessageBox} from "element-ui";

export default {
  name: "MDCourse",
  data(){
    return{
      tableData:[
        {
          courseId: 1,
          courseName: '大学外语1',
          courseTeacherId: 1,
          courseTeacherName: 'Los Angeles',
          courseAddress: 'No. 189, Grove St, Los Angeles',
          courseZJ: '周二:3,4节',
          courseZ:'1-8周,10-20周',
          courseCredits:3.00
        },
        {
          courseId: 2,
          courseName: '大学外语2',
          courseTeacherId: 2,
          courseTeacherName: 'Los Angeles',
          courseAddress: 'No. 189, Grove St, Los Angeles',
          courseTime: '周二:3,4节',
          courseZ:'1-8周,10-20周',
          courseCredits:3.00
        },
        {
          courseId: 3,
          courseName: '大学外语3',
          courseTeacherId: 3,
          courseTeacherName: 'Los Angeles',
          courseAddress: 'No. 189, Grove St, Los Angeles',
          courseTime: '周二:3,4节',
          courseZ:'1-8周,10-20周',
          courseCredits:3.00
        },
        {
          courseId: 4,
          courseName: '大学外语4',
          courseTeacherId: 4,
          courseTeacherName: 'Los Angeles',
          courseAddress: 'No. 189, Grove St, Los Angeles',
          courseTime: '周二:3,4节',
          courseZ:'1-8周,10-20周',
          courseCredits:3.00
        },
      ],
      formss:{
        id:1,
        courseName:"21",
        courseZJ:"sj",
        courseZ:"z",
        courseAddress:"dd",
        courseTeacherId:1,
        courseTeacherName:"name",
        courseCredits:1.33

      },
      isbianji:false,

    };
  },
  async created() {
    const data = await Api.getAllCourseInfo(1)

    this.tableData = data.data;
    console.log(data)
  },
  methods:{
    deleteRow(scope) {
      var that = this
      console.log(scope.row.id)

      MessageBox.confirm(
          '你将删除这一项,确认要继续吗?',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(async () => {
            const data = await Api.deleteCourseById(scope.row.id)
            if (data.status === 200) {
              that.$message.success(data.msg);
              this.tableData.splice(scope.$index, 1);
            } else if (data.status === 701) {
              that.$message.error(data.msg)
            }
          })
          .catch(() => {

          })
    },
    async bianjiRow(scope) {
      var that = this
      console.log(scope.row)
      that.formss = scope.row
      that.formss.id = scope.row.id
      const data = await Api.getTeacherByCourseId(scope.row.id)
      console.log(data)
      this.isbianji = true
    }

  }
}
</script>


<style>
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color:#f2faff !important; /* def2ff f2faff */
}
</style>
