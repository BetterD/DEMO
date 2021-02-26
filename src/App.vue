<!--
 * @Descripttion: 
 * @Author: Jason
 * @Date: 2021-02-22 22:26:00
 * @LastEditTime: 2021-02-27 01:11:22
-->
<template>
  <div id="app">
    <div class="view demo_view_resize" :style="{ height: wHeight + 'px' }">
      <router-view />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "App",
  data() {
    return {
      wHeight: 1080
    };
  },
  mounted() {
    // 页面尺寸自适应
    this.wHeight = ($(window).height() * 1920) / $(window).width();
    $(".demo_view_resize").css(
      "transform",
      "scale(" + $(window).width() / 1920 + ")"
    );
    $(window).resize(() => {
      this.wHeight = ($(window).height() * 1920) / $(window).width();
      $(".demo_view_resize").css(
        "transform",
        "scale(" + $(window).width() / 1920 + ")"
      );
    });
  },
  created() {
    $("html").css("overflow", "hidden");
  },
  beforeDestroy() {
    $("html").css("overflow", "visible");
  }
};
</script>

<style lang="scss">
body {
  margin: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.view {
  width: 1920px;
  height: 1080px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  transform-origin: 0% 0%;
}
</style>
