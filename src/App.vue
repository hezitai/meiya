<!--
 * @Author: hhh
 * @Date: 2021-07-12 10:04:17
 * @LastEditTime: 2021-07-16 09:45:11
 * @LastEditors: hhh
 * @Description: 
 * @FilePath: /zk/newapp/src/App.vue
-->
<template>
  <div id="app">
    <Index></Index>
  </div>
</template>

<script>
import Index from './components/index.vue'
export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  /* margin-top: 60px; */
}
p{
  margin: 0;
  padding: 0;
}
</style>
