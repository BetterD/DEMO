<!--
 * @Descripttion: 
 * @Author: Jason
 * @Date: 2021-02-22 22:50:14
 * @LastEditTime: 2021-02-24 16:59:21
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
      <el-col :span="17"> <div class="box-line"></div></el-col>
      <el-col :span="7"
        ><div class="box-circle">
          <div ref="aqiLevlePie" class="aqi-pie-contianer"></div>
          <div
            class="circle_text"
            :style="{
              top: circleTextTop + 'px',
              right: circleTextRight + 'px'
            }"
          >
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
      <el-col :span="17"> <div class="box-line" ref="aqiLine"></div></el-col>
      <el-col :span="7"
        ><div class="box-circle">
          <div ref="aqiRangePie" class="aqi-pie-contianer"></div>
          <div
            class="circle_text"
            :style="{
              top: circleTextTop + 'px',
              right: circleTextRight + 'px'
            }"
          >
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
      aqiRangeDescription: {},
      circleTextTop: "",
      circleTextRight: "",
      aqiLineData: {}
    };
  },
  mounted() {
    let wrap = document.getElementsByClassName("aqi-pie-contianer")[0];
    this.circleTextTop = parseFloat(getComputedStyle(wrap)["height"]) / 2 - 30;
    this.circleTextRight = parseFloat(getComputedStyle(wrap)["width"]) / 2 - 85;
    this.initAqiLevleDescription();
    this.initAqiRangeDescription();
    this.getAqiChartData();
  },
  methods: {
    initAqiLevleDescription() {
      this.$api.pmLine.getAqiLevleDes().then(res => {
        this.aqiLevleDescription = res.data;
        this.initAqiLevlePie();
      });
    },
    initAqiRangeDescription() {
      this.$api.pmLine.getAqiRangeDes().then(res => {
        this.aqiRangeDescription = res.data;
        this.initAqiRangePie();
      });
    },
    getAqiChartData() {
      this.$api.pmLine.getAqiLineData().then(res => {
        this.aqiLineData = res.data;
        this.initAqiChart();
      });
    },
    renderApiItem(params, api) {
      console.log(api);
      let xValue = api.value(0);
      let highPoint = api.coord([xValue, api.value(1)]);
      let lowPoint = api.coord([xValue, api.value(2)]);
      let style = api.style({
        stroke: api.visual("color"),
        fill: null
      });
      return {
        type: "group",
        children: [
          {
            type: "circle",
            transition: ["shape"],
            shape: {
              cx: highPoint[0],
              cy: highPoint[1],
              r: 1
            },
            style: style
          },
          {
            type: "line",
            transition: ["shape"],
            shape: {
              x1: highPoint[0],
              y1: highPoint[1],
              x2: lowPoint[0],
              y2: lowPoint[1]
            },
            style: style
          },
          {
            type: "circle",
            transition: ["shape"],
            shape: {
              cx: lowPoint[0],
              cy: lowPoint[1],
              r: 1
            },
            style: style
          }
        ]
      };
    },
    initAqiChart() {
      let chartDom = this.$refs.aqiLine;
      let aqiLineChart = this.$echarts.init(chartDom);
      let expectX = this.aqiLineData.X;
      let expectH = this.aqiLineData.expectYHeight;
      let expectL = this.aqiLineData.expectYLow;
      let exceptData = [];
      for (let i in expectX) {
        exceptData.push([expectX[i], expectH[i], expectL[i]]);
      }
      console.log(exceptData);
      let option;
      option = {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          x: 160,
          y: 80,
          x2: 5,
          y2: 80
        },
        dataZoom: [
          {
            type: "slider"
          },
          {
            type: "inside"
          }
        ],
        xAxis: {
          type: "category",
          data: this.aqiLineData.X
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.aqiLineData.realY,
            type: "line",
            smooth: true
          },
          {
            type: "custom",
            name: "error",
            itemStyle: {
              normal: {
                borderWidth: 1.5
              }
            },
            renderItem: function(params, api) {
              console.log(api);
              let xValue = api.value(0);
              let highPoint = api.coord([xValue, api.value(1)]);
              let lowPoint = api.coord([xValue, api.value(2)]);
              let style = api.style({
                stroke: api.visual("color"),
                fill: null
              });
              return {
                type: "group",
                children: [
                  {
                    type: "circle",
                    transition: ["shape"],
                    shape: {
                      cx: highPoint[0],
                      cy: highPoint[1],
                      r: 1
                    },
                    style: style
                  },
                  {
                    type: "line",
                    transition: ["shape"],
                    shape: {
                      x1: highPoint[0],
                      y1: highPoint[1],
                      x2: lowPoint[0],
                      y2: lowPoint[1]
                    },
                    style: style
                  },
                  {
                    type: "circle",
                    transition: ["shape"],
                    shape: {
                      cx: lowPoint[0],
                      cy: lowPoint[1],
                      r: 1
                    },
                    style: style
                  }
                ]
              };
            },
            data: exceptData,
            z: 100
          }
        ]
      };

      option && aqiLineChart.setOption(option);
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
      height: 20rem;
    }
  }
}
</style>
