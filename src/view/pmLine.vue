<!--
 * @Descripttion: 
 * @Author: Jason
 * @Date: 2021-02-22 22:50:14
 * @LastEditTime: 2021-02-25 22:56:02
-->

<template>
  <div class="container">
    <div class="change-button">
      <el-button type="primary" @click="goPmMap"
        >查看PM<font class="pm-small">2.5</font>实况分布</el-button
      >
    </div>
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
            @change="dateChange"
          >
          </el-date-picker></div
      ></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row class="box">
      <div class="tip">污染等级</div>
      <el-col :span="17">
        <div class="box-line" ref="aqiLevle"></div>
        <div class="line-name-real line-name-font">实况监测</div>
        <div class="line-name-exp line-name-font">人工预报</div>
      </el-col>
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
            <div class="circle_num">{{ aqiRangeDescription.percent }} %</div>
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
import moment from "moment";
//表格顶部图表的SVG PATH
const upIcon =
  "path://M512 68.267C266.944 68.267 68.267 266.944 68.267 512S266.944 955.733 512 955.733 955.733 757.056 955.733 512 757.056 68.267 512 68.267zM706.901 521.92a34.133 34.133 0 0 1-48.277 0.192l-112.49-111.616v284.97a34.133 34.133 0 0 1-68.267 0v-284.97L365.376 522.112a34.133 34.133 0 1 1-48.085-48.512l170.666-169.365a34.133 34.133 0 0 1 48.086 0L706.709 473.6a34.133 34.133 0 0 1 0.192 48.32z";
const downIcon =
  "path://M512 955.733c245.056 0 443.733-198.677 443.733-443.733S757.056 68.267 512 68.267 68.267 266.944 68.267 512 266.944 955.733 512 955.733zM317.099 502.08a34.133 34.133 0 0 1 48.277-0.192l112.49 111.616v-284.97a34.133 34.133 0 0 1 68.267 0v284.97l112.491-111.616a34.133 34.133 0 1 1 48.085 48.512L536.043 719.765a34.133 34.133 0 0 1-48.086 0L317.291 550.4a34.133 34.133 0 0 1-0.192-48.32z";
const okIcon =
  "path://M514.52 958.13h-1.17C268.76 957.53 70.25 758 70.82 513.35c0.3-118.5 46.71-229.8 130.74-313.41a440.82 440.82 0 0 1 312.9-129.12h1.14c118.5 0.3 229.8 46.68 313.41 130.71A440.91 440.91 0 0 1 958.13 515.6a440.58 440.58 0 0 1-130.71 313.38 440.76 440.76 0 0 1-312.9 129.15z m-76.02-272.7a31.23 31.23 0 0 0 19.56 6.51c8.85 0 17.64-3.6 24-10.56l264.96-291.09a31.68 31.68 0 0 0-2.4-45.12 32.7 32.7 0 0 0-45.63 2.4L457.37 613.01l-129.24-139.2a31.26 31.26 0 0 0-44.61-1.32 32.37 32.37 0 0 0-1.32 45.24l150.6 162.18a32.4 32.4 0 0 0 5.7 5.52z";
export default {
  name: "pmLine",
  data() {
    return {
      pickerOptions: {
        //时间选择器快捷选项
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
      date: null, //当前选择的时间范围
      aqiLevleDescription: {}, //AQI等级描述信息
      aqiRangeDescription: {}, //AQI范围描述信息
      circleTextTop: "", //圆环中间文字定位
      circleTextRight: "",
      aqiLineData: {}, //AQI折线数据
      aqiLevleData: [], //污染等级数据
      aqiLevleChart: null, //污染等级图表
      aqiLineChart: null, //AQI折线图
      aqiPieChart: null, //AQI等级图表
      aqiRangePieChart: null //AQI范围图标
    };
  },
  mounted() {
    //计算圆环中间文字定位
    let wrap = document.getElementsByClassName("aqi-pie-contianer")[0];
    this.circleTextTop = parseFloat(getComputedStyle(wrap)["height"]) / 2 - 30;
    this.circleTextRight = parseFloat(getComputedStyle(wrap)["width"]) / 2 - 85;
    this.init(); //初始化
  },
  methods: {
    /**
     * @description: 初始化数据
     * @param {*}
     */
    init() {
      this.initAqiLevleDescription(); //初始化AQI等级
      this.initAqiRangeDescription(); //初始化AQI范围
      this.getAqiChartData(); //初始化AQI折现数据
      this.getAqiLevleChartData(); //初始化污染等级数据
    },
    /**
     * @description:前往Pm2.5分布
     * @param {*}
     */
    goPmMap() {
      this.$router.push("pmMap");
    },
    /**
     * @description: 日期选择器触发
     * @param {*}
     */
    dateChange() {
      this.$message({
        message:
          "选择了日期 : " +
          moment(this.date[0]).format("YYYY-MM-DD") +
          "  至  " +
          moment(this.date[1]).format("YYYY-MM-DD"),
        type: "success"
      });
    },
    /**
     * @description: 初始化AQI等级数据
     * @param {*}
     */
    initAqiLevleDescription() {
      this.$api.pmLine.getAqiLevleDes().then(res => {
        this.aqiLevleDescription = res.data;
        this.initAqiLevlePie();
      });
    },
    /**
     * @description: 初始化AQI范围数据
     * @param {*}
     */
    initAqiRangeDescription() {
      this.$api.pmLine.getAqiRangeDes().then(res => {
        this.aqiRangeDescription = res.data;
        this.initAqiRangePie();
      });
    },
    /**
     * @description: 初始化AQI折现数据
     * @param {*}
     */
    getAqiChartData() {
      this.$api.pmLine.getAqiLineData().then(res => {
        this.aqiLineData = res.data;
        this.initAqiChart();
      });
    },
    /**
     * @description: 初始化污染等级数据
     * @param {*}
     */
    getAqiLevleChartData() {
      this.$api.pmLine.getAqiLevleData().then(res => {
        this.aqiLevleData = res.data.data;
        this.initAqiLevleChart();
      });
    },
    /**
     * @description: 生成AQI文字
     * @param {*} val
     */
    getAqiDec(val) {
      switch (val) {
        case 0:
          return "优";
        case 1:
          return "良";
        case 2:
          return "轻度污染";
        case 3:
          return "中度污染";
        case 4:
          return "重度污染";
        case 5:
          return "严重污染";
        default:
          return "";
      }
    },
    /**
     * @description: 初始化污染等级表格
     * @param {*}
     */
    initAqiLevleChart() {
      let xData = [];
      let exceptData = [];
      for (let i in this.aqiLevleData) {
        xData.push(this.aqiLevleData[i].date);
      }
      for (let i in this.aqiLevleData) {
        let heightData;
        if (this.aqiLevleData[i].except.length == 1) {
          heightData = "-";
        } else {
          heightData = this.aqiLevleData[i].except[1];
        }
        exceptData.push([
          xData[i],
          this.aqiLevleData[i].except[0],
          heightData,
          this.aqiLevleData[i].real,
          this.aqiLevleData[i].deviation
        ]);
      }
      // console.log(exceptData);
      let chartDom = this.$refs.aqiLevle;
      this.aqiLevleChart = this.$echarts.init(chartDom);
      let option;
      option = {
        legend: {
          top: 30,
          data: [
            { name: "优", icon: "rect" },
            { name: "良", icon: "rect" },
            { name: "轻度污染", icon: "rect" },
            { name: "中度污染", icon: "rect" },
            { name: "重度污染", icon: "rect" },
            { name: "严重污染", icon: "rect" }
          ]
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.8)",
          borderColor: "rgb(39,211,252)",
          borderRadius: 8,
          borderWidth: 1,
          textStyle: {
            color: "black"
          },
          axisPointer: {
            type: "shadow"
          },
          formatter: datas => {
            let realdec;
            let exceptdec;
            for (let i in this.aqiLevleData) {
              if (this.aqiLevleData[i].date == datas[0].data[0]) {
                realdec = this.getAqiDec(this.aqiLevleData[i].real);
                if (this.aqiLevleData[i].except[1]) {
                  exceptdec =
                    this.getAqiDec(this.aqiLevleData[i].except[0]) +
                    " - " +
                    this.getAqiDec(this.aqiLevleData[i].except[1]);
                } else {
                  exceptdec = this.getAqiDec(this.aqiLevleData[i].except[0]);
                }
              }
            }
            let res =
              '<div class="showBoxTip">' +
              datas[0].name +
              "<br/>" +
              "实况监测" +
              " : " +
              realdec +
              "<br/>" +
              "人工预报" +
              " : " +
              exceptdec +
              "</div>";

            // for (var i = 0, length = datas.length; i < length; i++) {
            //   res += datas[i].seriesName + "：" + datas[i].data + "<br/>";
            // }
            return res;
          }
        },
        grid: {
          x: 160,
          y: 80,
          x2: 5,
          y2: 40
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            splitLine: {
              //网格线
              show: true
            }
          },
          {
            type: "category",
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              //y轴刻度线
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            data: [1, 2, 3, 4, 5, 6, 7],
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              //y轴刻度线
              show: false
            }
          },
          {
            type: "category",
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              //y轴刻度线
              show: false
            }
          }
        ],
        series: [
          {
            data: [],
            name: "辅助",
            type: "line",
            color: "rgb(255,171,35)",
            markLine: {
              symbol: false,
              itemStyle: {
                normal: {
                  lineStyle: {
                    type: "solid",
                    color: "black"
                    // type: 'solid'  //'dotted'虚线 'solid'实线
                  },
                  label: {
                    show: false
                    //  position: 'center',
                    //  formatter: '{a}',
                  }
                }
              },
              data: [
                {
                  yAxis: 5
                }
              ]
            }
          },
          {
            data: [],
            name: "优",
            type: "line",
            color: "rgb(0,228,0)"
          },
          {
            data: [],
            name: "良",
            type: "line",
            color: "rgb(255,255,0)"
          },
          {
            data: [],
            name: "轻度污染",
            type: "line",
            color: "rgb(255,216,0)"
          },
          {
            data: [],
            name: "中度污染",
            type: "line",
            color: "rgb(255,0,0)"
          },
          {
            data: [],
            name: "重度污染",
            type: "line",
            color: "rgb(153,0,76)"
          },
          {
            data: [],
            name: "严重污染",
            type: "line",
            color: "rgb(126,0,35)"
          },
          {
            type: "custom",
            name: "数据",
            color: "rgb(0,207,0)",
            itemStyle: {
              normal: {
                borderWidth: 1.5
              }
            },
            renderItem: function(params, api) {
              let xValue = api.value(0);
              let highPoint = api.coord([xValue, 2]);
              let lowPoint = api.coord([xValue, 1]);
              let realPoint = api.coord([xValue, 5]);
              let deviationPoint = api.coord([xValue, 6]);
              let style;
              let style1;
              let style2;
              let style3;
              let path;
              let res = { type: "group", children: [] };
              switch (api.value(4)) {
                case 0:
                  path = okIcon;
                  style3 = api.style({
                    fill: "rgb(0,228,0)"
                  });
                  break;
                case 1:
                  path = downIcon;
                  style3 = api.style({
                    fill: "rgb(55,162,218)"
                  });
                  break;
                case 2:
                  path = upIcon;
                  style3 = api.style({
                    fill: "red"
                  });
                  break;
                default:
                  break;
              }
              switch (api.value(1)) {
                case 0:
                  style = api.style({
                    stroke: "rgb(0,228,0)",
                    fill: "rgb(0,228,0)"
                  });
                  break;
                case 1:
                  style = api.style({
                    stroke: "rgb(255,255,0)",
                    fill: "rgb(255,255,0)"
                  });
                  break;
                case 2:
                  style = api.style({
                    stroke: "rgb(255,216,0)",
                    fill: "rgb(255,216,0)"
                  });
                  break;
                case 3:
                  style = api.style({
                    stroke: "rgb(255,0,0)",
                    fill: "rgb(255,0,0)"
                  });
                  break;
                case 4:
                  style = api.style({
                    stroke: "rgb(153,0,76)",
                    fill: "rgb(153,0,76)"
                  });
                  break;
                case 5:
                  style = api.style({
                    stroke: "rgb(126,0,35)",
                    fill: "rgb(126,0,35)"
                  });
                  break;
                default:
                  break;
              }
              switch (api.value(3)) {
                case 0:
                  style2 = api.style({
                    stroke: "rgb(0,228,0)",
                    fill: "rgb(0,228,0)"
                  });
                  break;
                case 1:
                  style2 = api.style({
                    stroke: "rgb(255,255,0)",
                    fill: "rgb(255,255,0)"
                  });
                  break;
                case 2:
                  style2 = api.style({
                    stroke: "rgb(255,216,0)",
                    fill: "rgb(255,216,0)"
                  });
                  break;
                case 3:
                  style2 = api.style({
                    stroke: "rgb(255,0,0)",
                    fill: "rgb(255,0,0)"
                  });
                  break;
                case 4:
                  style2 = api.style({
                    stroke: "rgb(153,0,76)",
                    fill: "rgb(153,0,76)"
                  });
                  break;
                case 5:
                  style2 = api.style({
                    stroke: "rgb(126,0,35)",
                    fill: "rgb(126,0,35)"
                  });
                  break;
                default:
                  break;
              }
              if (!api.value(2)) {
                res.children.push(
                  {
                    type: "rect",
                    transition: ["shape"],
                    shape: {
                      x: lowPoint[0] - 15,
                      y: lowPoint[1] + 12,
                      width: 30,
                      height: 30
                    },
                    style: style
                  },
                  {
                    type: "rect",
                    transition: ["shape"],
                    shape: {
                      x: realPoint[0] - 15,
                      y: realPoint[1] + 2,
                      width: 30,
                      height: 30
                    },
                    style: style2
                  },
                  {
                    type: "path",
                    transition: ["shape"],
                    shape: {
                      x: deviationPoint[0] - 14,
                      y: deviationPoint[1] - 5,
                      pathData: path,
                      width: 30,
                      height: 30,
                      layout: "center"
                    },
                    style: style3
                  }
                );
              } else {
                switch (api.value(2)) {
                  case 0:
                    style1 = api.style({
                      stroke: "rgb(0,228,0)",
                      fill: "rgb(0,228,0)"
                    });
                    break;
                  case 1:
                    style1 = api.style({
                      stroke: "rgb(255,255,0)",
                      fill: "rgb(255,255,0)"
                    });
                    break;
                  case 2:
                    style1 = api.style({
                      stroke: "rgb(255,216,0)",
                      fill: "rgb(255,216,0)"
                    });
                    break;
                  case 3:
                    style1 = api.style({
                      stroke: "rgb(255,0,0)",
                      fill: "rgb(255,0,0)"
                    });
                    break;
                  case 4:
                    style1 = api.style({
                      stroke: "rgb(153,0,76)",
                      fill: "rgb(153,0,76)"
                    });
                    break;
                  case 5:
                    style1 = api.style({
                      stroke: "rgb(126,0,35)",
                      fill: "rgb(126,0,35)"
                    });
                    break;
                  default:
                    break;
                }
                res.children.push(
                  {
                    type: "rect",
                    transition: ["shape"],
                    shape: {
                      x: highPoint[0] - 15,
                      y: highPoint[1] + 9,
                      width: 30,
                      height: 30
                    },
                    style: style1
                  },
                  {
                    type: "rect",
                    transition: ["shape"],
                    shape: {
                      x: lowPoint[0] - 15,
                      y: lowPoint[1] + 12,
                      width: 30,
                      height: 30
                    },
                    style: style
                  },
                  {
                    type: "rect",
                    transition: ["shape"],
                    shape: {
                      x: realPoint[0] - 15,
                      y: realPoint[1] + 2,
                      width: 30,
                      height: 30
                    },
                    style: style2
                  },
                  {
                    type: "path",
                    transition: ["shape"],
                    shape: {
                      x: deviationPoint[0] - 14,
                      y: deviationPoint[1] - 5,
                      pathData: path,
                      width: 30,
                      height: 30,
                      layout: "center"
                    },
                    style: style3
                  }
                );
              }
              return res;
            },
            data: exceptData,
            z: 100
          }
        ]
      };

      option && this.aqiLevleChart.setOption(option);
    },
    initAqiChart() {
      let chartDom = this.$refs.aqiLine;
      this.aqiLineChart = this.$echarts.init(chartDom);
      let expectX = this.aqiLineData.X;
      let expectH = this.aqiLineData.expectYHeight;
      let expectL = this.aqiLineData.expectYLow;
      let exceptData = [];
      for (let i in expectX) {
        exceptData.push([expectX[i], expectH[i], expectL[i]]);
      }
      let option;
      option = {
        legend: {
          top: 30,
          data: [{ name: "实况监测" }, { name: "人工预报", icon: "rect" }]
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.8)",
          borderColor: "rgb(39,211,252)",
          borderRadius: 8,
          borderWidth: 1,
          textStyle: {
            color: "black"
          },
          formatter: datas => {
            let res =
              '<div class="showBoxTip">' +
              datas[0].name +
              "<br/>" +
              datas[0].seriesName +
              " : " +
              datas[0].data +
              "<br/>" +
              datas[1].seriesName +
              " : " +
              datas[1].data[2] +
              "-" +
              datas[1].data[1] +
              "</div>";

            // for (var i = 0, length = datas.length; i < length; i++) {
            //   res += datas[i].seriesName + "：" + datas[i].data + "<br/>";
            // }
            return res;
          }
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
            name: "实况监测",
            type: "line",
            color: "rgb(255,171,35)",
            showSymbol: false,
            smooth: true,
            symbol: "circle"
          },
          {
            type: "custom",
            name: "人工预报",
            color: "rgb(0,207,0)",
            itemStyle: {
              normal: {
                borderWidth: 1.5
              }
            },
            renderItem: function(params, api) {
              let xValue = api.value(0);
              let highPoint = api.coord([xValue, api.value(1)]);
              let lowPoint = api.coord([xValue, api.value(2)]);
              let style;
              if (api.value(1) > 80) {
                style = api.style({
                  stroke: "red",
                  fill: "red"
                });
              } else {
                style = api.style({
                  stroke: api.visual("color"),
                  fill: api.visual("color")
                });
              }

              return {
                type: "group",
                children: [
                  {
                    type: "circle",
                    transition: ["shape"],
                    shape: {
                      cx: highPoint[0],
                      cy: highPoint[1],
                      r: 2.5
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
                      r: 2.5
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

      option && this.aqiLineChart.setOption(option);
    },
    initAqiLevlePie() {
      let chartDom = this.$refs.aqiLevlePie;
      this.aqiPieChart = this.$echarts.init(chartDom);
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

      option && this.aqiPieChart.setOption(option);
    },
    initAqiRangePie() {
      let chartDom = this.$refs.aqiRangePie;
      this.aqiRangePieChart = this.$echarts.init(chartDom);
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

      option && this.aqiRangePieChart.setOption(option);
    },
    clearChart() {
      if (this.aqiLevleChart && !this.aqiLevleChart.isDisposed()) {
        this.aqiLevleChart.clear(); //释放图形资源
        this.aqiLevleChart.dispose(); //释放图形资源
      }
      if (this.aqiLineChart && !this.aqiLineChart.isDisposed()) {
        this.aqiLineChart.clear(); //释放图形资源
        this.aqiLineChart.dispose(); //释放图形资源
      }
      if (this.aqiPieChart && !this.aqiPieChart.isDisposed()) {
        this.aqiPieChart.clear(); //释放图形资源
        this.aqiPieChart.dispose(); //释放图形资源
      }
      if (this.aqiRangePieChart && !this.aqiRangePieChart.isDisposed()) {
        this.aqiRangePieChart.clear(); //释放图形资源
        this.aqiRangePieChart.dispose(); //释放图形资源
      }
    }
  },
  beforeDestroy() {
    this.clearChart();
  }
};
</script>
<style>
.showBoxTip {
  text-align: left;
}
</style>
<style lang="scss" scoped>
.container {
  width: auto;
  margin: 60px 32px 0 32px;
  height: 800px;
  background: rgb(246, 249, 252);
  border-radius: 2px;
  box-shadow: 1px 1px 5px #888888;
  .header {
    height: 32px;
    text-align: left;
    margin: 13px 0 0 13px;

    .header-text {
      margin-right: 8px;
    }
    .head-icon {
      font-size: 19px;
      color: rgb(39, 211, 252);
    }
  }
  .change-button {
    position: absolute;
    right: 35px;
    top: 10px;
    .pm-small {
      font-size: 1px;
    }
  }
  .box {
    width: auto;
    margin: 16px 32px;
    box-shadow: 1px 1px 5px #888888;
    background: white;
    height: 330px;
    .tip {
      width: 85px;
      background: rgb(39, 211, 252);
      padding: 8px 13px;
      float: left;
      position: absolute;
      top: 20px;
      border-radius: 0 80px 80px 0;
      color: white;
    }
    .line-name-real {
      position: absolute;
      top: 130px;
      left: 80px;
    }
    .line-name-exp {
      position: absolute;
      bottom: 90px;
      left: 80px;
    }
    .line-name-font {
      font-weight: bold;
    }
    .box-circle {
      .aqi-pie-contianer {
        height: 240px;
      }
      .circle_text {
        position: absolute;
        width: 160px;
        text-align: center;
        .circle_num {
          font-size: 32px;
          line-height: 32px;
        }

        .circle_numLabel {
          font-size: 14px;
          line-height: 32px;
        }
      }
      .box-text-row {
        width: auto;
        margin: 0 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 14px;
        .boxtext-font {
          font-size: 14px;
        }
        .up-icon {
          font-size: 16px;
          margin-right: 9px;
          color: blue;
        }
        .down-icon {
          font-size: 16px;
          margin-right: 9px;
          color: red;
        }
      }
    }
    .box-line {
      height: 320px;
    }
  }
}
</style>
