<!--
 * @Descripttion: 
 * @Author: Jason
 * @Date: 2021-02-22 22:26:00
 * @LastEditTime: 2021-02-24 10:15:05
-->
<template>
  <div id="app" class="view-resize">
    <router-view />
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
