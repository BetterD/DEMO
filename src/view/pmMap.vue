<!--
 * @Descripttion: 
 * @Author: Jason
 * @Date: 2021-02-25 16:07:40
 * @LastEditTime: 2021-02-26 17:02:15
-->

<template>
  <div class="pm-tem-container">
    <el-row>
      <el-col :span="showTimeList ? 19 : 24">
        <div class="map-container">
          <div class="map-chart-container" ref="mapContainer"></div>
          <div class="map-title">
            <div class="map-titlt-top">
              江苏省气温+PM<font class="small-font">2.5</font>实况分布
            </div>
            <div class="map-titlt-bottom">{{ slectedDate }}</div>
          </div>
          <div class="station_legend"></div>
          <div
            class="menu-fade-container"
            v-if="!showTimeList"
            @click="openOrCloseMenu"
          >
            <i class="el-icon-d-arrow-left"></i>
          </div>
          <div class="data-type-contorl">
            <el-row>
              <el-col :span="8"
                ><div class="lable-container">
                  站点 ：
                  <el-switch
                    v-model="form.station"
                    active-value="0"
                    inactive-value="1"
                    @change="showSation()"
                    active-color="#13ce66"
                  >
                  </el-switch></div
              ></el-col>
              <el-col :span="8"
                ><div class="lable-container">
                  <el-select v-model="form.select1" size="mini" placeholder="">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select></div
              ></el-col>
              <el-col :span="8"
                ><div class="lable-container">
                  <el-select v-model="form.select2" size="mini" placeholder="">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select></div
              ></el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="showTimeList ? 5 : 0">
        <div class="menu-container">
          <div class="control-container">
            <div class="menu-control-title">
              <div class="menu-control-name">
                <i class="el-icon-s-tools"></i>
                条件选择
              </div>
              <div class="menu-control-button" @click="openOrCloseMenu">
                <i class="el-icon-d-arrow-right"></i>
              </div>
            </div>
            <div class="date-picker-container">
              <div class="time-font">
                时间范围：
              </div>
              <el-date-picker
                v-model="form.date"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="dateChange"
              >
              </el-date-picker>
            </div>
            <div class="button-group-container">
              <el-button-group style="width:90%">
                <el-button plain style="width:35%;font-size:17px"
                  ><i class="el-icon-d-arrow-left contorl-icon"></i>
                  上一时刻</el-button
                >
                <el-button plain style="width:30%;font-size:17px"
                  ><i class="el-icon-video-play contorl-icon"></i>
                  播放</el-button
                >
                <el-button plain style="width:35%;font-size:17px"
                  ><i class="el-icon-d-arrow-right contorl-icon"></i>
                  下一时刻</el-button
                >
              </el-button-group>
            </div>
          </div>
          <div class="list-container">
            <div
              class="list-item"
              v-for="(item, index) in timeList"
              :key="index"
              :class="{
                item_focus: item == slectedDate
              }"
              @click="setChart(item)"
            >
              {{ item }}
            </div>
          </div>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import "echarts/extension/bmap/bmap";
import geoData from "../assets/jiangsu";
const fiveStar =
  "path://M1077.529145 388.206248C1072.06379 371.533456 1056.511742 360.326019 1039.008769 360.326019L686.956883 360.326019 578.161726 27.824884C572.876243 11.207437 557.37954 0 539.765877 0 522.262904 0 506.710856 11.207437 501.370028 27.700357L392.450343 360.326019 40.467639 360.326019C22.909321 360.326019 7.398781 371.533456 2.002608 388.206248-3.462747 404.713004 2.528389 422.963139 16.682967 433.119014L301.504067 638.533348 192.764255 971.214355C187.243555 987.776457 193.234691 1005.860556 207.444614 1016.127121 221.474665 1026.338342 240.845544 1026.338342 254.944776 1016.127121L539.765877 810.588261 824.642322 1016.127121C831.629675 1021.191223 839.972989 1023.820128 848.371649 1023.820128 856.701127 1023.820128 865.099787 1021.191223 872.142485 1016.127121 886.297062 1005.860556 892.288199 987.776457 886.767498 971.214355L778.138377 638.533348 1062.793441 433.119014C1076.934183 422.963139 1082.869974 404.713004 1077.529145 388.206248Z";
const fourStar =
  "path://M510.643 70.147l-111.633 328.864-327.354 111.331 325.847 113.443 113.14 328.864 110.727-328.26 330.372-113.14-327.354-110.727z";
const threeStar =
  "path://M0 996.8l364.8-433.6L524.8 14.4l148.8 556.8L1024 1009.6 513.6 822.4z";
export default {
  name: "pmMap",
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
      form: {
        date: "",
        station: "0",
        select1: "PM2.5",
        select2: "气温"
      },
      options1: [
        {
          value: "PM2.5",
          label: "PM2.5"
        }
      ],
      options2: [
        {
          value: "气温",
          label: "气温"
        }
      ],
      showTimeList: true,
      slectedDate: "2021-02-03 23时",
      timeList: [
        "2021-02-03 21时",
        "2021-02-03 22时",
        "2021-02-03 23时",
        "2021-02-04 00时",
        "2021-02-04 01时",
        "2021-02-04 02时",
        "2021-02-04 03时",
        "2021-02-04 04时",
        "2021-02-04 05时",
        "2021-02-04 06时",
        "2021-02-04 07时",
        "2021-02-04 08时",
        "2021-02-04 09时",
        "2021-02-04 10时",
        "2021-02-04 11时",
        "2021-02-04 12时"
      ],
      mapChart: null,
      bmap: {},
      stationData: []
    };
  },
  mounted() {
    this.getStationChartData();
  },
  methods: {
    openOrCloseMenu() {
      this.showTimeList = !this.showTimeList;
    },
    showSation() {
      console.log(this.form.station);
    },
    dateChange() {},
    setChart(val) {
      this.slectedDate = val;
    },
    getStationChartData() {
      this.$api.pmMap.getStationData().then(res => {
        console.log(res.data.data);
        this.stationData = res.data.data;
        this.initChart();
      });
    },
    convertData(data) {
      console.log(data);
      let res = [];
      let value;
      for (let i in data) {
        value = data[i].coord.concat(data[i].value).concat(data[i].type);
        res.push({
          name: data[i].name,
          value: value
        });
      }
      return res;
    },
    initChart() {
      let chartDom = this.$refs.mapContainer;
      this.mapChart = this.$echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: "item"
        },
        bmap: {
          center: [118.78, 32.04],
          zoom: 8,
          roam: true
        },
        visualMap: {
          id: "station",
          min: 0,
          max: 300,
          calculable: false,
          realtime: false,
          dimension: 2,
          orient: "horizontal",
          text: ["", "PM2.5(aqi)"],
          textStyle: {
            fontWeight: "bolder",
            fontSize: 13
          },
          pieces: [
            { gte: 0, lt: 50 },
            { gte: 50, lt: 150 },
            { gte: 150, lt: 200 },
            { gte: 20, lt: 300 },
            { gte: 300 }
          ],
          inRange: {
            color: [
              "rgb(0,228,0)",
              "rgb(255,255,0)",
              "rgb(255,216,0)",
              "rgb(255,0,0)",
              "rgb(153,0,76)",
              "rgb(126,0,35)"
            ],
            symbol: "rect"
          }
        },
        series: [
          {
            name: "pm2.5",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.convertData(this.stationData),
            symbolSize: 20,
            symbol: val => {
              switch (val[3]) {
                case 0:
                  return "circle";
                case 1:
                  return "diamond";
                case 2:
                  return "rect";
                case 3:
                  return fiveStar;
                case 4:
                  return "triangle";
                case 5:
                  return fourStar;
                case 6:
                  return threeStar;
              }
            },
            itemStyle: {
              /**
               * 优：0~50    
                良 ：50~100    
                轻度污染：100~150    
                中度污染：150~200    
                重度污染：200~300    
                严重污染：大于300及以上
               */
              color: params => {
                let val = params.value[2];
                switch (true) {
                  case val <= 50:
                    return "rgb(0,228,0)";
                  case val > 50 && val <= 100:
                    return "rgb(255,255,0)";
                  case val > 100 && val <= 150:
                    return "rgb(255,216,0)";
                  case val > 150 && val <= 200:
                    return "rgb(255,0,0)";
                  case val > 250 && val <= 300:
                    return "rgb(153,0,76)";
                  case val > 300:
                    return "rgb(126,0,35)";
                }
              }
            },
            encode: {
              value: 2
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            }
          }
        ]
      };
      option && this.mapChart.setOption(option);
      this.bmap = this.mapChart
        .getModel()
        .getComponent("bmap")
        .getBMap();
      this.bmap.setMapStyleV2({
        styleId: "124b43db44a089beb32803ef10299f8c"
      });
    }
  },
  beforeDestroy() {}
};
</script>
<style lang="scss">
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
.pm-tem-container {
  .el-select .el-input__inner {
    border: none !important;
    background: rgba(0, 0, 0, 0) !important;
  }
}
</style>
<style lang="scss" scoped>
.pm-tem-container {
  .map-container {
    height: 100vh;
    position: relative;
    .map-chart-container {
      height: 100vh;
    }
    .map-title {
      position: absolute;
      top: 10px;
      left: 10px;
      .map-titlt-top {
        padding: 5px 25px;
        font-size: 18px;
        font-weight: bold;
        background-color: white;
        border-radius: 10px 0 0 0;
        .small-font {
          font-size: 8px;
        }
      }
      .map-titlt-bottom {
        text-align: right;
        font-size: 13px;
        color: white;
        padding: 2px 10px;
        background-color: rgba(74, 79, 84, 0.8);
        border-radius: 0 0 10px 0;
      }
    }
    .station_legend {
      height: 200px;
      width: 150px;
      background-color: rgba(255, 255, 255, 0.8);
      position: absolute;
      bottom: 30px;
      right: 20px;
    }
    .data-type-contorl {
      position: absolute;
      top: 10px;
      right: 30px;
      width: 30%;
      .lable-container {
        height: 20px;
        padding: 5px;
        background-color: white;
        font-size: 10px;
        font-weight: bold;
        margin-right: 10px;
        .switch-container {
          margin-top: 6px;
        }
      }
    }
  }
  .menu-fade-container {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: white;
    font-size: 25px;
    cursor: pointer;
  }
  .menu-container {
    height: 100vh;
    .control-container {
      .menu-control-title {
        height: 40px;
        background-color: rgb(232, 245, 240);
        font-size: 18px;
        .menu-control-name {
          float: left;
          margin: 10px 0 0 15px;
        }
        .menu-control-button {
          float: right;
          margin: 10px 20px 0 0;
          cursor: pointer;
        }
      }
      .date-picker-container {
        .time-font {
          text-align: left;
          margin: 10px 0 10px 20px;
        }
      }
      .button-group-container {
        margin-top: 10px;
        .contorl-icon {
          font-size: 17px;
          color: rgb(35, 138, 202);
        }
      }
    }
    .list-container {
      width: 90%;
      height: 705px;
      overflow: auto;
      margin: 20px auto 0 auto;
      .list-item {
        background-color: rgb(248, 234, 234);
        margin: auto 0;
        width: 100%;
        height: 54px;
        border-bottom: dashed 0.5px;
        box-sizing: border-box;
        line-height: 54px;
        font-size: 16px;
        cursor: pointer;
        &:hover {
          color: white;
          border: none;
          background-color: rgba(65, 154, 248, 0.8);
        }
      }
      .item_focus {
        color: white;
        border: none;
        background-color: rgb(65, 154, 248);
      }
    }
  }
}
</style>
