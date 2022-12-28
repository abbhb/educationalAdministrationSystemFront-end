<template>

  <div class="timetable w100 h100">

    <div style="display: flex;flex-direction: row;padding-left: 10px;padding-top: 15px;align-self: center;">
      <table style="align-self: center;">🪝请选择班级</table>
      <el-cascader v-model="option" @change="elcascaderchange" :options="options" :show-all-levels="false" />
    </div>

    <div class="time-b w100" v-if="isShowTable">
      <div class="time-detail" style="padding-left: 10px;padding-top: 15px;align-self: center;">🍀 第 {{ count }} 周课表</div>
      <div v-if="stateforyjk" style="color: red;font-size: 48px;">已经结课了</div>
      <div class="time-controller">
        <el-button-group>
          <el-button
              type="primary"
              icon="el-icon-arrow-left"
              @click="changeCount(-1)"
          ></el-button>
          <el-button round class="date-btn" @click="gotoCount(thisweek)">本周</el-button>
          <el-button
              type="primary"
              icon="el-icon-arrow-right"
              @click="changeCount(1)"
          ></el-button>
        </el-button-group>
      </div>
    </div>
    <div class="timetable-b w100">
      <table class="timetable-content w100">
        <thead>
        <tr>
          <th></th>
          <th v-for="(item1, index1) in weeks" :key="index1">
            {{ "周" + numberToChinease(item1 + 1, "week") }}

          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item2, index2) in maxCourseLength" :key="index2">
          <td>
            <p>{{ "第" + numberToChinease(item2) + "节" }}</p>
            <p>
              {{numberToTime(item2)}}
            </p>
          </td>
          <template v-for="(item3, index3) in weeks">
            <td
                :key="index3"
                :rowspan="
                  showData(index3, index2 + 1).subject &&
                  showData(index3, index2).subject ===showData(index3, index2 + 1).subject? showData(index3, index2).length: ''
                  "
                :style="[
                  {
                    display:
                      showData(index3, index2 - 1).subject &&
                      showData(index3, index2 - 1).subject ===
                        showData(index3, index2).subject
                        ? 'none'
                        : '',
                  },
                ]"
            >
              <div
                  class="dmsjandjs-b"
                  :style="[
                    {
                      background: showData(index3, index2).index
                        ? getRandomColor(showData(index3, index2).subject)
                        : '#ffffff',
                    },
                    { color: '#fff' },
                    { borderRadius: '15px' },
                    { padding: '4px' },
                    { height: '80%' },
                  ]"
              >
                <!--                <p>-->
                <!--                  {{ showData(index3, index2).startTime }}-->
                <!--                  {{ showData(index3, index2).startTime ? "-" : "" }}-->
                <!--                  {{ showData(index3, index2).endTime }}-->
                <!--                </p>-->
                <div v-if="showData(index3, index2).index? true: false">
                  <p>{{ showData(index3, index2).subject }}</p>
                  <p>{{ showData(index3, index2).major }}</p>
                  <!--                    <p>{{ showData(index3, index2).klass }}</p>-->
                  <p>{{ showData(index3, index2).teacherName }}</p>
                  <p>@{{ showData(index3, index2).classroom }}</p>
                </div>

              </div>
            </td>
          </template>
        </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script>
import { weekCourse, colorList,courseTime } from "./timetablesforadmin";
import * as Api from "@/api/login";

export default {
  name:"TimeTableForAdmin",
  data() {
    return {
      colorList: [], //随机颜色
      weekCourse: [], // 课程详细课程、数量
      coursetime:[],//每节课的时间
      coursename:[],//课程名列表(有序)
      weeks: [], //头部周期
      maxCourseLength: 0, //最大课节数,
      count: 0, //上周、下周、本周选择器flag
      thisweek:0,//本周
      maxweek:0,//最大周
      option:{},//当前选项
      isShowTable:false,//默认不显示课表，当选择了班级显示课表
      stateforyjk:false,//是否已结课
      options:[
        {
          value:1,
          label:'计算机科学技术学院',
          children:[
            {
              label:'计21-2',
              value:212
            },
            {
              label:'软件20-2',
              value:202
            }
          ]
        },
        {
          value:1,
          label:'外国语学院',
          children:[
            {
              label:'法21-3',
              value:213
            },
            {
              label:'英22-2',
              value:222
            }
          ]
        }
      ],//级联选择器选项
    };
  },
  async created() {
    this.weekCourse = weekCourse;
    this.colorList = colorList;
    this.coursetime = courseTime;
    const datas = await Api.getCascaderList()
    // console.log(datas);
    this.options = datas.data


  },
  methods: {
    async gotoCount(i) {
      const data = await Api.getAllCourseInfo(i,this.option[1])
      this.weekCourse = data.data
      this.count = i
      this.sortData();
      this.init();
      this.sortName();
    },
    async setMaxWeek(klassId) {
      const data = await Api.getMaxWeek(klassId)//暂时拿1替代，klassid
      this.maxweek = data.data
    },
    //改变选择器次数
    async changeCount(i) {
      if (i < 0) {
        if (this.count === 1) {
          this.$message.info("前面没有课了哦~")
          return this.count
        }
        if (this.count>this.maxweek){
          this.count = this.maxweek+1;
        }
      }
      if (i>0){
        if (this.count === this.maxweek){
          this.$message.info("后面没有课了哦~")
          return this.count
        }else if (this.count>this.maxweek){
          this.$message.info("后面没有课了哦~")
          return this.count
        }
      }
      this.count += i;

      const data = await Api.getAllCourseInfo(this.count,this.option[1])

      this.weekCourse = data.data
      this.sortData();
      this.init();

      this.sortName();
      return this.count;
    },
    // 排序周期和课数
    sortData() {
      console.log("排序")
      //周期
      this.weekCourse.sort((a, b) => {
        return a.week - b.week;
      });
      this.weekCourse.forEach((item) => {
        for (const key in item) {
          if (key === "resultCourse") {
            item[key].sort((a, b) => {
              return a.index - b.index;
            });
          }
        }
      });
    },
    // 初始化课数(resultCourse)与天数(week)
    init() {
      this.weeks = []; //周集合
      this.maxCourseLength = 0;
      this.weeks = this.weekCourse.map((item, index) => {
        console.log(index)
        for (const key in item) {
          if (key === "resultCourse") {
            let max = 0; //
            //取出一周中最大的课节数及当天的最大课节数
            for (let j of item[key]) {
              j.index > this.maxCourseLength &&
              (this.maxCourseLength = j.index); //取所有一周里最大课节值
              j.index > max && (max = j.index); //取当天最大课节值
              if (!this.coursename.includes(j.subject)){
                this.coursename.push(j.subject)
              }
            }
            // console.log("max:", max);

            //如果当天的课节总数小于当天的最大课节值
            if (item[key].length < max) {
              //以最大课节值为终点遍历当天课节
              for (let i = 0; i < max; i++) {
                //如果下标课节不存在或着与循环的下标不匹配
                if (!item[key][i] || item[key][i].index != i + 1) {
                  item[key].splice(i, 0, " "); //填充空课节
                }
              }
            }
          }
        }
        return item.week;
      });
    },

    /**
     * 处理数据
     * @param { Number } weekIndex 周几对应的下标
     * @param { Number }  courseNum  第几节课对应的下标
     * @returns { String }   返回对应字符
     */
    showData(weekIndex, courseNum) {
      if (
          this.weekCourse[weekIndex] &&
          this.weekCourse[weekIndex].resultCourse[courseNum] &&
          this.weekCourse[weekIndex].resultCourse[courseNum].index === courseNum + 1
      ) {
        // this.getRandomColor();
        return this.weekCourse[weekIndex].resultCourse[courseNum];
      }
      return false;
    },
    async elcascaderchange() {
      console.log(this.option[1]+"班级id")//这是班级id
      this.isShowTable = true
      this.setMaxWeek(this.option[1])
      const data = await Api.getAllCourseInfoThisWeek(this.option[1])
      this.weekCourse = data.data.resultCourseInfoList
      if (data.data.thisweek>this.maxweek){
        this.stateforyjk = true;
      }else {
        this.stateforyjk = false;
      }
      this.count = data.data.thisweek
      this.thisweek = data.data.thisweek
      console.log("create")
      this.sortData();
      this.init();
      this.sortName();
    },

    /**
     * 数字转中文
     * @param { Number } n 需转换的数字
     * @param { Boolean }  identifier  标识符
     * @returns { String }  identifier  转换后的中文
     */
    numberToChinease(n, identifier) {
      const chnArr = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ];
      return identifier === "week" && (n === 0 || n === 7) ? "日" : chnArr[n];
    },
    numberToTime(index) {
      // console.log("time")
      // console.log(this.coursetime[index-1])
      return this.coursetime[index-1].time

    },
    //随机获取颜色
    getRandomColor(subject) {
      let colorList = this.colorList;
      let colorRandom = this.coursename.indexOf(subject);
      console.log("颜色数据"+colorRandom)
      let color;
      for (let i = 0; colorList.length > i; i++) {
        if (i == colorRandom) {
          color = colorList[i];
        }
      }
      return color;
    },

    //随机上、本、下周 日期

    sortName(){
      this.coursename.sort((a, b) => {
        return a - b;
      });
      console.log(this.coursename)
    },
  }
};
</script>

<style scoped lang="scss">
.timetable {
  background-color: #f1f7ff;
  .w100 {
    width: 100% !important;
  }
  .h100 {
    height: 100% !important;
  }
  .time-b {
    height: 46px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .time-detail {
      color: #333333;
      font-weight: 500;
      font-size: 18px;
      font-family: "Microsoft YaHei";
    }
  }
  .timetable-b {
    height: 100%!important;
    background-color: #fff;
    overflow: auto;
    .timetable-content {
      height: 100%;
      table-layout: revert;
      border-collapse: collapse; //设置表格的边框是否被合并为一个单一的边框
      text-align: center;
      color: #333333;
      font-weight: 800;
      font-size: 12px;

      thead {
        height: 40px;

        th {
          border: 2px solid rgba(27, 100, 240, 0.1);

        }
      }
      tbody {
        height: calc(50% - 4px) / 7;
        td {
          padding: 12px;
          border: 2px solid rgba(27, 100, 240, 0.1);
          .dmsjandjs-b {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }
      }
    }
  }
}
::v-deep {
  .time-controller {
    .el-button-group {
      .el-button {
        height: 36px;
        background: #ffffff;
        font-size: 14px;
        font-weight: 600;
        border: 1px solid rgba(27, 100, 240, 0.1);
        border-radius: 55px;
        color: #1b64f0;
      }
      :nth-child(2) {
        margin: 0px 12px;
      }
    }
  }
}
.height{
  height: 10px;
}
</style>