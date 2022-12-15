<template>
  <div class="courses">
    <!-- <h2>这里是课程界面啊啊啊啊</h2> -->
    <div class="handle">
      <!-- 查询 -->
      <div class="menu">
        <el-timeline>
          <el-timeline-item placement="top">
            <el-card>
              <h4>课程查询</h4>
              <el-input placeholder="请输入课程名" class="searchName" v-model="searchName">
                <!-- <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button> -->
              </el-input>
              <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
            </el-card>
          </el-timeline-item>
          <el-timeline-item placement="top">
            <el-card>
              <h4>添加课程</h4>
              <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="80px"
                  class="coursesForm"
              >
                <el-form-item label="课程名" prop="Title">
                  <el-input v-model="ruleForm.Title" placeholder="请输入课程名"></el-input>
                </el-form-item>

                <el-form-item label="课程简介" prop="Introduction">
                  <el-input
                      type="textarea"
                      v-model="ruleForm.Introduction"
                      placeholder="请填写课程信息"
                      maxlength="50"
                      :autosize="{ minRows: 4, maxRows: 6}"
                      show-word-limit
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-timeline-item>
          <el-timeline-item placement="top">
            <el-card>
              <h4>created by©刘俊超 &nbsp;<span style="font-weight:100;font-size:0.7em">深自缄默，如云漂泊</span></h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="formData">
      <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          :data="coursesData.filter(data => !searchName || data.Title.toLowerCase().includes(searchName.toLowerCase()))"
          border
          style="width: 100%"
          min-height="650"
          max-height="650"
      >
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="Title" label="课程名" width="150"></el-table-column>
        <el-table-column prop="Enrollments.length" sortable label="选修人数" width="120"></el-table-column>
        <el-table-column prop="Introduction" label="课程简介" :formatter="checkNull"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="warning" size="small">修改</el-button>
            <el-tooltip
                content="删除这门课程？"
                placement="top"
                effect="light"
                :hide-after="1000"
                :enterable="false"
            >
              <el-button
                  @click="handleDelete(scope.$index, scope.row)"
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  circle
                  plain
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="课程信息" :visible.sync="dialogFormVisible">
        <el-form :model="updateForm" class="content" :rules="rules" ref="updateForm">
          <el-form-item label="课程名" prop="Title" :label-width="formLabelWidth">
            <el-input v-model="updateForm.Title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="课程简介" prop="Introduction" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                v-model="updateForm.Introduction"
                placeholder="请填写课程信息"
                maxlength="50"
                :autosize="{ minRows: 4, maxRows: 6}"
                show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateStudent('updateForm')">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
name: "CourseTableEdit",
  data() {
    return {
      name: "liudaxia",
      searchName: "",
      coursesData: [],
      loading: true,
      // 增加课程 表单项设置
      ruleForm: {
        Title: "",
        Number: "",
        Introduction: ""
      },
      // 修改时课程信息 表单项设置
      updateForm: {
        Id: "",
        Title: "",
        Introduction: ""
      },
      // 校验规则
      rules: {
        Title: [
          { required: true, message: "请输入课程名", trigger: "change" },
          { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" }
        ],
        Introduction: [
          {
            required: true,
            message: "请填写课程信息,否则无法通过喔~",
            trigger: "change"
          }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "6em"
    };
  },methods: {
    //为表格添加序号
    indexMethod(index) {
      return index + 1;
    },
    handleClick(row) {
      // 数据回显
      console.log(row);
      // this.resetForm(updateForm);
      this.updateForm.Title = row.Title;
      this.updateForm.Introduction = row.Introduction;
      this.updateForm.Id = row.Id;
      this.dialogFormVisible = true;
    },
    // 查验简介是否为空
    checkNull(row, column) {
      console.log(row)
      console.log(column)
      return row.Introduction == null
          ? "该课程暂无介绍信息 ￣□￣｜｜"
          : row.Introduction;
    },
  },
}
</script>

<style lang="css">
.courses {
  display: flex;
  height: 42em;
}
.courses.formData {
  flex: 3;
  text-align: center;
  /*// background-color: lightpink;*/
}
.courses.formData.el-table {
  text-align: center !important;
  float: right;
  /*// padding: 5%*/
  margin: 2%;
}
.courses.handle {
  flex: 2;
  /*// height: 50em;*/
  /*// background-color: lightblue;*/

}
.courses.handle.searchName {
  width: 70%;
}
.courses.handle.menu {
  padding: 5% 10% 0 10%;


}
.courses.handle.menu.stydentForm.el-form-item__content.el-input__suffix {
  right: 0 !important;
}
.courses.handle.menu.stydentForm.el-form-item__content.el-input {
  width: 70%;
}
.courses.handle.menu h4 {
  margin: 0.2em;
  padding-bottom: 0.5em;
}
</style>