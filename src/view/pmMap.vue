<!--
 * @Descripttion: 
 * @Author: Jason
 * @Date: 2021-02-25 16:07:40
 * @LastEditTime: 2021-02-26 00:28:09
-->

<template>
  <div class="container">
    <el-row>
      <el-col :span="19">
        <div class="map-container">
          <div class="map-chart-container"></div>
          <div class="map-title">
            <div class="map-titlt-top">
              江苏省气温+PM<font class="small-font">2.5</font>实况分布
            </div>
            <div class="map-titlt-bottom">2020-07-29 00时</div>
          </div>
          <div class="data-type-contorl">
            <el-row>
              <el-col :span="8"
                ><div class="lable-container">
                  <div class="switch-container">
                    站点 ：
                    <el-switch v-model="form.station" active-color="#13ce66">
                    </el-switch>
                  </div></div
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
      <el-col :span="5"> <div class="menu-container">222</div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "pmMap",
  data() {
    return {
      form: {
        station: "",
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
      ]
    };
  },
  mounted() {},
  methods: {},
  beforeDestroy() {}
};
</script>
<style>
.el-input__inner {
  border: none;
}
</style>
<style lang="scss" scoped>
.container {
  .map-container {
    height: 100vh;
    background: yellow;
    .map-title {
      float: left;
      margin-top: 10px;
      margin-left: 10px;
      .map-titlt-top {
        padding: 5px 25px;
        font-size: 13px;
        font-weight: bold;
        background-color: white;
        border-radius: 10px 0 0 0;
        .small-font {
          font-size: 8px;
        }
      }
      .map-titlt-bottom {
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 2px 10px;
        background-color: rgba(74, 79, 84, 0.8);
        border-radius: 0 0 10px 0;
      }
    }
    .data-type-contorl {
      float: right;
      width: 300px;
      padding-top: 10px;
      // float: right;
      .lable-container {
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
  .menu-container {
    height: 100vh;
    background-color: red;
  }
}
</style>
