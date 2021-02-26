<!--
 * 
 * 　　┏┓　　　┏┓+ +
 * 　┏┛┻━━━┛┻┓ + +
 * 　┃　　　　　　　┃ 　
 * 　┃　　　━　　　┃ ++ + + +
 *  ████━████ ┃+
 * 　┃　　　　　　　┃ +
 * 　┃　　　┻　　　┃
 * 　┃　　　　　　　┃ + +
 * 　┗━┓　　　┏━┛
 * 　　　┃　　　┃　　　　　　　　　　　
 * 　　　┃　　　┃ + + + +
 * 　　　┃　　　┃
 * 　　　┃　　　┃ +  神兽保佑
 * 　　　┃　　　┃    代码无bug　　
 * 　　　┃　　　┃　　+　　　　　　　　　
 * 　　　┃　 　　┗━━━┓ + +
 * 　　　┃ 　　　　　　　┣┓
 * 　　　┃ 　　　　　　　┏┛
 * 　　　┗┓┓┏━┳┓┏┛ + + + +
 * 　　　　┃┫┫　┃┫┫
 * 　　　　┗┻┛　┗┻┛+ + + +
 * 
 -->

<!--
 * @Descripttion: 
 * @Author: 中科博微 段世煜
 * @Date: 2021-02-26 08:04:52
 * @LastEditTime: 2021-02-27 00:50:33
-->
<!--
 * @Descripttion:    优：0~50    
                良 ：50~100    
                轻度污染：100~150    
                中度污染：150~200    
                重度污染：200~300    
                严重污染：大于300及以上
 * @Author: Jason
 * @Date: 2021-02-25 16:07:40
 * @LastEditTime: 2021-02-27 00:45:13
-->

<template>
  <div class="pm-tem-container">
    <el-row>
      <el-col :span="showTimeList ? 19 : 24">
        <div class="map-container">
          <!-- 地图容器 -->
          <div
            class="map-chart-container"
            ref="mapContainer"
            :style="{ height: wHeight + 'px' }"
          ></div>
          <!-- 图表标题 -->
          <div class="map-title">
            <div class="map-titlt-top">
              江苏省气温+PM₂.₅实况分布
            </div>
            <div class="map-titlt-bottom">{{ slectedDate }}</div>
          </div>
          <!-- 图表站点图例 -->
          <div class="station_legend">
            <div class="dec_item">
              <div class="dec_svg">
                <svg viewBox="0 0 1024 1024" width="16" height="16">
                  <path
                    d="M512 988.096c-262.528 0-476.096-213.568-476.096-476.096S249.472 35.968 512 35.968c262.592 0 476.096 213.568 476.096 476.096S774.592 988.096 512 988.096zM512 67.968C267.136 67.968 67.904 267.136 67.904 512c0 244.864 199.232 444.096 444.096 444.096S956.096 756.864 956.096 512C956.096 267.136 756.864 67.968 512 67.968z"
                    fill="#1296db"
                    p-id="1124"
                  ></path>
                </svg>
                国控站 {{ stationDec.guo }} 个
              </div>
            </div>
            <div class="dec_item">
              <div class="dec_svg">
                <svg viewBox="0 0 1024 1024" width="16" height="16">
                  <path
                    d="M512 0l512 512-512 512-512-512 512-512z m0 80.497778L80.497778 512 512 943.502222 943.502222 512 512 80.497778z"
                    fill="#1296db"
                    p-id="3086"
                  ></path>
                </svg>
                省控站 {{ stationDec.sheng }} 个
              </div>
            </div>
            <div class="dec_item">
              <div class="dec_svg">
                <svg viewBox="0 0 1025 1024" width="16" height="16">
                  <path
                    d="M18.559716 0.02C7.929718 0.88-0.20028 9.849998 0.00472 20.499995v983.01778c-0.164 11.139997 8.744998 20.315995 19.885996 20.479995H1003.522495c11.139997 0.164 20.315995-8.744998 20.479995-19.885996V20.499995c0.163-11.139997-8.744998-20.315995-19.885996-20.479995H20.484715c-0.635-0.02-1.29-0.02-1.924999 0z m22.404995 40.959991h942.077788v942.057788H40.964711V40.979991z"
                    fill="#1296db"
                    p-id="4452"
                  ></path>
                </svg>
                边界站 {{ stationDec.bian }} 个
              </div>
            </div>
            <div class="dec_item">
              <div class="dec_svg">
                <svg viewBox="0 0 1024 1024" width="16" height="16">
                  <path
                    d="M737.792 910.6944a57.2416 57.2416 0 0 1-26.7264-6.656l-197.5296-103.8336-197.5296 103.8336a57.2416 57.2416 0 0 1-83.0464-60.3648l37.6832-220.16L110.848 467.968a57.2928 57.2928 0 0 1 31.744-97.6896L363.52 338.2272 462.1824 138.24a56.832 56.832 0 0 1 51.2-31.8976 56.9344 56.9344 0 0 1 51.2 31.8976l98.7648 200.1408 220.8256 32.0512A57.2928 57.2928 0 0 1 916.48 467.968l-159.7952 155.7504 37.7344 220.16a57.3952 57.3952 0 0 1-56.32 67.0208zM159.8464 430.08l155.2896 151.3984a57.2416 57.2416 0 0 1 16.4352 50.688l-36.6592 213.5552 192-100.9152a57.088 57.088 0 0 1 53.2992 0L732.16 845.7216l-36.6592-213.76a57.344 57.344 0 0 1 16.4352-50.688L867.2768 430.08l-214.6304-31.1808a57.2928 57.2928 0 0 1-43.1104-31.3344l-96-194.56-96 194.56a57.2416 57.2416 0 0 1-43.1104 31.3344z m715.6736 1.024zM509.7984 165.2736z"
                    fill="#1296db"
                    p-id="5926"
                  ></path>
                </svg>
                质控站 {{ stationDec.zhi }} 个
              </div>
            </div>
            <div class="dec_item">
              <div class="dec_svg">
                <svg viewBox="0 0 1251 1024" width="16" height="16">
                  <path
                    d="M1170.409244 978.488889L625.777778 87.267556 81.146311 978.488889h1089.262933M1251.555556 1024H0L625.777778 0l625.777778 1024z"
                    fill="#1296db"
                    p-id="6802"
                  ></path>
                </svg>
                创模站 {{ stationDec.chuang }} 个
              </div>
            </div>
            <div class="dec_item">
              <div class="dec_svg">
                <svg
                  t="1614351086286"
                  viewBox="0 0 1024 1024"
                  width="16"
                  height="16"
                >
                  <path
                    d="M896.5 497.5c-185.4-39.8-330.2-184.6-370-370L512 60l-14.9 69.3c-39.6 184.3-183.6 328.3-367.9 367.9L60 512l68.6 14.7c184.7 39.7 329 183.9 368.6 368.6L512 964l14.3-66.6c39.9-185.9 185.2-331.2 371.1-371.1L964 512l-67.5-14.5z m-113.3 24.6c-130.8 28.1-233 130.3-261.1 261.1L512 830l-10.4-48.3c-27.9-129.9-129.4-231.4-259.3-259.3L194 512l48.7-10.5c129.7-27.8 231-129.1 258.8-258.8L512 194l10.2 47.5c28 130.4 129.9 232.3 260.3 260.3L830 512l-46.8 10.1z"
                    p-id="7385"
                    fill="#1296db"
                  ></path>
                </svg>
                农村站 {{ stationDec.nong }} 个
              </div>
            </div>
            <div class="dec_item">
              <div class="dec_svg">
                <svg viewBox="0 0 1024 1024" width="16" height="16">
                  <path
                    d="M0 996.8l364.8-433.6L524.8 14.4l148.8 556.8L1024 1009.6 513.6 822.4z"
                    p-id="8400"
                    fill="#1296db"
                  ></path>
                </svg>
                省控+创模站 {{ stationDec.sc }} 个
              </div>
            </div>
          </div>
          <!-- 展开菜单栏 -->
          <div
            class="menu-fade-container"
            v-if="!showTimeList"
            @click="openOrCloseMenu"
          >
            <i class="el-icon-d-arrow-left"></i>
          </div>
          <!-- 顶部选择器 -->
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
        <!-- 右侧菜单 -->
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
                type="datetimerange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
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
          <!-- 时间列表 -->
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
// echart 百度地图组件
import "echarts/extension/bmap/bmap";
import $ from "jquery";
// echart svg数据
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
      form: {
        date: "", //时间
        station: "0", //站点是否开启
        select1: "PM₂.₅", //点数据
        select2: "气温" //区域数据
      },
      // select 选择器数据
      options1: [
        {
          value: "PM₂.₅",
          label: "PM₂.₅"
        }
      ],
      options2: [
        {
          value: "气温",
          label: "气温"
        }
      ],
      // 是否展示右侧菜单
      showTimeList: true,
      // 当前选中时间
      slectedDate: "2021-02-03 23时",
      timeList: [], //时间列表
      mapChart: null, //chart图表对象
      bmap: {}, //百度地图对象
      stationData: [], //站点数据
      stationDec: {}, //站点图例个数
      wHeight: 1080 //自适应高度 用于图表渲染
    };
  },
  mounted() {
    //页面尺寸变化时 改变图表容器高度
    this.wHeight = ($(window).height() * 1920) / $(window).width();
    $(window).resize(() => {
      this.wHeight = ($(window).height() * 1920) / $(window).width();
      this.initChart();
    });
    this.getStationChartData();
    this.getTimeListData();
    this.getStationDecData();
  },
  methods: {
    // 获取各类别站点数量信息
    getStationDecData() {
      this.$api.pmMap.getStationDecData().then(res => {
        this.stationDec = res.data.data;
      });
    },
    // 开启关闭右侧菜单
    openOrCloseMenu() {
      this.showTimeList = !this.showTimeList;
    },
    // 站点开关触发函数
    showSation() {
      console.log(this.form.station);
    },
    // 日期选择器触发
    dateChange() {},
    //选择时刻列表触发
    setChart(val) {
      this.slectedDate = val;
    },
    //api获取chart数据源
    getStationChartData() {
      this.$api.pmMap.getStationData().then(res => {
        this.stationData = res.data.data;
        this.initChart();
      });
    },
    /**
     * @description: 获取事件列表数据源
     * @param {*}
     * @return {*}
     */
    getTimeListData() {
      this.$api.pmMap.getTimeListData().then(res => {
        this.timeList = res.data.data;
      });
    },
    /**
     * @description: 地图数据处理
     * @param {*} data
     * @return {*}
     */
    convertData(data) {
      console.log(data);
      let res = [];
      let value;
      for (let i in data) {
        //拼接数据
        value = data[i].coord.concat(data[i].value).concat(data[i].type);
        res.push({
          name: data[i].name,
          value: value
        });
      }
      return res;
    },
    // 初始化图表
    initChart() {
      let chartDom = this.$refs.mapContainer;
      this.mapChart = this.$echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderColor: "rgb(39,211,252)",
          borderRadius: 8,
          borderWidth: 1,
          textStyle: {
            color: "black"
          },
          formatter: datas => {
            //自定义显示内容
            let res =
              '<div class="showStationTip">' +
              '<font class="lenged_name">' +
              datas.data.name +
              "</font>" +
              " PM₂.₅浓度为: " +
              datas.data.value[2] +
              "μg/m³" +
              "</div>";
            return res;
          }
        },
        bmap: {
          //初始化百度地图
          center: [118.78, 32.04],
          zoom: 8,
          roam: true
        },
        visualMap: [
          //数据映射
          {
            id: "station",
            min: 0,
            max: 300,
            split_number: 5,
            is_piecewise: true,
            calculable: false,
            realtime: false,
            dimension: 2,
            orient: "horizontal",
            text: ["", "PM₂.₅(aqi)"],
            textStyle: {
              fontWeight: "bolder",
              fontSize: 13
            },
            inRange: {
              color: [
                "rgb(0,228,0)",
                "rgb(255,255,0)",
                "rgb(255,216,0)",
                "rgb(255,0,0)",
                "rgb(153,0,76)",
                "rgb(126,0,35)"
              ]
            }
          }
        ],
        series: [
          {
            name: "pm2.5",
            type: "scatter",
            coordinateSystem: "bmap",
            visualMap: "station",
            data: this.convertData(this.stationData),
            symbolSize: 20,
            symbol: val => {
              //根据数据决定渲染图标
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
      this.bmap = this.mapChart //获取当前百度地图对象
        .getModel()
        .getComponent("bmap")
        .getBMap();
      this.bmap.setMapStyleV2({
        //设置自定义地图style
        styleId: "124b43db44a089beb32803ef10299f8c"
      });
    },
    clearChart() {
      if (this.mapChart && !this.mapChart.isDisposed()) {
        this.mapChart.clear(); //释放图形资源
        this.mapChart.dispose(); //释放图形资源
      }
    }
  },
  beforeDestroy() {
    this.clearChart();
  }
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
.showStationTip {
  .lenged_name {
    font-weight: 600;
  }
}
.el-select > .el-input {
  margin-top: -5px;
}
</style>
<style lang="scss" scoped>
.pm-tem-container {
  .map-container {
    position: relative;
    .map-chart-container {
      height: 1080px;
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
      background-color: rgba(255, 255, 255, 0.8);
      position: absolute;
      bottom: 30px;
      right: 20px;
      text-align: left;
      font-size: 14px;
      padding: 10px 15px 10px 5px;
      .dec_item {
        margin-left: 10px;
        h .dec_svg {
          float: left;
          margin-left: 20px;
          margin-right: 5px;
        }
      }
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
    height: 1080px;
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
