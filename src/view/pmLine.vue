<!--
 * @Descripttion: 
 * @Author: Jason
 * @Date: 2021-02-22 22:50:14
 * @LastEditTime: 2021-02-23 17:00:41
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
      <el-col :span="16"><div class="box-line"></div></el-col>
      <el-col :span="8"><div class="box-circle"></div></el-col>
    </el-row>
    <el-row class="box">
      <div class="tip">AQI</div>
      <el-col :span="16"><div class="box-line"></div></el-col>
      <el-col :span="8"><div class="box-circle"></div></el-col>
    </el-row>
  </div>
</template>
<script>
import { login } from "@/api/pmLine";
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
      date: ""
    };
  },
  mounted() {
    login().then(res => {
      console.log(res);
    });
    this.initChart();
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.container {
  width: auto;
  margin: 2rem 2rem;
  height: 50rem;
  background: rgb(255, 240, 255);
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
  }
  .box-line {
  }
  .box-circle {
  }
}
</style>
