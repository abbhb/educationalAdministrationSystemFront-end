<template>
  <div>
    <!--        :data="tableData"-->
    <el-table

        border
        style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="tou" label="12月" width="180" />
      <el-table-column prop="mon" label="12周一" />
      <el-table-column prop="tue" label="13周二" />
      <el-table-column prop="wes" label="14周三" />
      <el-table-column prop="tes" label="15周四" />
      <el-table-column prop="fri" label="16周五" />
      <el-table-column prop="sta" label="17周六" />
      <el-table-column prop="sun" label="18周日" />

      <el-table-row v-for="(item,index) in tabledata" :key="index" :prop="item.tableProp" :label="item.label"/>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CourseTable",
  data(){
    return{
      tabledata:[
        {tableProp:"time",label:"1:8:00-9:00"},
        {tableProp:"time",label:"1:8:00-9:00"},
        {tableProp:"time",label:"1:8:00-9:00"},
        {tableProp:"time",label:"1:8:00-9:00"},
        {tableProp:"time",label:"1:8:00-9:00"},
        {tableProp:"time",label:"1:8:00-9:00"},
        {tableProp:"time",label:"1:8:00-9:00"},
        {tableProp:"time",label:"1:8:00-9:00"},
      ],
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>