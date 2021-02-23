<!--
 * @Descripttion: 
 * @Author: Jason
 * @Date: 2021-02-22 22:50:14
 * @LastEditTime: 2021-02-23 23:56:36
-->

<template>
  <div class="container">
    <el-row>
      <el-col :span="24"
        ><div class="header">
          <i class="el-icon-time head-icon"></i>
          <font class="header-text">时间范围</font>
          <el-date-picker
            v-model="date"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker></div
      ></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row class="box">
      <div class="tip">污染等级</div>
      <el-col :span="17"
        >11
        <div class="box-line"></div
      ></el-col>
      <el-col :span="7"
        ><div class="box-circle">
          <div ref="aqiLevlePie" class="aqi-pie-contianer"></div>
          <div class="circle_text">
            <div class="circle_num">{{ aqiLevleDescription.percent }} %</div>
            <div class="circle_numLabel">AQI等级</div>
          </div>
          <div class="box-text">
            <div class="box-text-row">
              <div>
                <i class="up-icon el-icon-top"></i
                ><font class="boxtext-font"
                  >偏高：{{ aqiLevleDescription.height }} %</font
                >
              </div>
              <div>
                <i class="down-icon el-icon-bottom"></i
                ><font class="boxtext-font"
                  >偏低：{{ aqiLevleDescription.low }} %</font
                >
              </div>
            </div>
            <div class="box-text-row">
              <div>
                <font class="boxtext-font"
                  >评估天数：{{ aqiLevleDescription.expect }}</font
                >
              </div>
              <div>
                <font class="boxtext-font"
                  >有效天数：{{ aqiLevleDescription.real }}</font
                >
              </div>
            </div>
            <div class="box-text-row"></div>
          </div></div
      ></el-col>
    </el-row>
    <el-row class="box">
      <div class="tip">AQI</div>
      <el-col :span="17"
        >11
        <div class="box-line"></div
      ></el-col>
      <el-col :span="7"
        ><div class="box-circle">
          <div ref="aqiRangePie" class="aqi-pie-contianer"></div>
          <div class="circle_text">
            <div class="circle_num">{{ aqiRangeDescription.percent }}%</div>
            <div class="circle_numLabel">AQI范围</div>
          </div>
          <div class="box-text">
            <div class="box-text-row">
              <div>
                <i class="up-icon el-icon-top"></i
                ><font class="boxtext-font"
                  >偏高：{{ aqiRangeDescription.height }} %</font
                >
              </div>
              <div>
                <i class="down-icon el-icon-bottom"></i
                ><font class="boxtext-font"
                  >偏低：{{ aqiRangeDescription.low }} %</font
                >
              </div>
            </div>
            <div class="box-text-row">
              <div>
                <font class="boxtext-font"
                  >评估天数：{{ aqiRangeDescription.expect }}</font
                >
              </div>
              <div>
                <font class="boxtext-font"
                  >有效天数：{{ aqiRangeDescription.real }}</font
                >
              </div>
            </div>
            <div class="box-text-row"></div>
          </div></div
      ></el-col>
    </el-row>
  </div>
</template>
<script>
import { login, getAqiLevleDes, getAqiRangeDes } from "@/api/pmLine";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      date: "",
      aqiLevleDescription: {},
      aqiRangeDescription: {}
    };
  },
  mounted() {
    login().then(res => {
      console.log(res);
    });

    this.initAqiLevleDescription();
    this.initAqiRangeDescription();
  },
  methods: {
    initAqiLevleDescription() {
      getAqiLevleDes().then(res => {
        this.aqiLevleDescription = res.data;
        this.initAqiLevlePie();
      });
    },
    initAqiRangeDescription() {
      getAqiRangeDes().then(res => {
        this.aqiRangeDescription = res.data;
        this.initAqiRangePie();
      });
    },
    initAqiLevlePie() {
      let chartDom = this.$refs.aqiLevlePie;
      let aqiPieChart = this.$echarts.init(chartDom);
      let option;
      option = {
        series: [
          {
            name: "AQI",
            type: "pie",
            radius: ["80%", "70%"],
            color: ["rgb(252, 202, 46)", "rgb(237, 241, 244)"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.aqiLevleDescription.percent },
              { value: 100 - this.aqiLevleDescription.percent }
            ]
          }
        ]
      };

      option && aqiPieChart.setOption(option);
    },
    initAqiRangePie() {
      let chartDom = this.$refs.aqiRangePie;
      let aqiPieChart = this.$echarts.init(chartDom);
      let option;
      option = {
        series: [
          {
            name: "AQI",
            type: "pie",
            radius: ["80%", "70%"],
            color: ["rgb(95, 120, 194)", "rgb(237, 241, 244)"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.aqiRangeDescription.percent },
              { value: 100 - this.aqiRangeDescription.percent }
            ]
          }
        ]
      };

      option && aqiPieChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: auto;
  margin: 2rem 2rem;
  height: 50rem;
  background: rgb(246, 249, 252);
  border-radius: 0.1rem;
  box-shadow: 1px 1px 5px #888888;
  .header {
    height: 2rem;
    text-align: left;
    margin: 0.8rem 0 0 0.8rem;

    .header-text {
      margin-right: 0.5rem;
    }
    .head-icon {
      font-size: 1.2rem;
      color: rgb(39, 211, 252);
    }
  }
  .box {
    width: auto;
    margin: 1rem 2rem;
    box-shadow: 1px 1px 5px #888888;
    background: white;
    height: 20rem;
    .tip {
      width: 5rem;
      background: rgb(39, 211, 252);
      padding: 0.5rem 0.8rem;
      float: left;
      position: absolute;
      top: 3rem;
      border-radius: 0 5rem 5rem 0;
      color: white;
    }
    .box-circle {
      .aqi-pie-contianer {
        height: 15rem;
      }
      .circle_text {
        position: absolute;
        width: 10rem;
        text-align: center;
        right: 7.5rem;
        top: 6rem; /*top: 60px;*/
        .circle_num {
          font-size: 2rem;
          line-height: 2rem;
        }

        .circle_numLabel {
          font-size: 0.8rem;
          line-height: 2rem;
        }
      }
      .box-text-row {
        width: auto;
        margin: 0 5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 0.9rem;
        .boxtext-font {
          font-size: 0.9rem;
        }
        .up-icon {
          font-size: 1rem;
          margin-right: 0.6rem;
          color: blue;
        }
        .down-icon {
          font-size: 1rem;
          margin-right: 0.6rem;
          color: red;
        }
      }
    }
    .box-line {
    }
  }
}
</style>
