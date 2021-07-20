<!--
 * @Author: hhh
 * @Date: 2021-07-12 10:31:43
 * @LastEditTime: 2021-07-19 20:19:52
 * @LastEditors: hhh
 * @Description: 
 * @FilePath: /zk/newapp/src/components/index.vue
-->
<template>
  <div id="index">
    <div class="header">
      <van-nav-bar class="header-content" :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" @change="onChange" route>
      <van-tabbar-item replace to="/recommend" name="recommend">我的推荐</van-tabbar-item>
      <van-tabbar-item replace to="/earnings" name="earnings">收益</van-tabbar-item>
      <van-tabbar-item replace to="/center" name="center">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Notify } from 'vant';
import { Toast } from 'vant';
import { Dialog } from 'vant';
import request from '../utils/request.js'
export default {
  name: 'index',
  data() {
    return {
      active: 0,
      title: '',
    }
  },
  mounted() {
    this.my_info();
  },
  methods: {
    onChange(index) {
      this.$router.push({ path: index })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    async my_info(row) {
      let _this = this;
      let result = await request({
        url: "/my_info/get",
        method: "get"
      });
      // console.log(result, "result");
      try {
        console.log(result);
        localStorage.setItem('userInfo', JSON.stringify(result.data.data));
        // alert(result.data)
      } catch (error) {
        Dialog.alert({
          message: error,
        }).then(() => {});
        localStorage.setItem('userInfo', '');
      }
    }
  },
  watch: {

    $route(to, from) {
      //   console.log(to);
      this.title = to.meta.title
    }
  },
}
</script>
<style lang="less" scoped>
#index {
  width: 100%;
  height: 100%;
}
.content {
  //   background: #f0f0f0;
  width: 100%;
  height: calc(100% - 50px);
}
.header {
  position: fixed;
  width: 100%;
  z-index: 3;
  background: #3e404d;
  //   height: 46px;
  top: 0;
  .header-content {
    background: rgba(0, 0, 0, 0);
    color: #ffffff;
    /deep/ .van-nav-bar__title {
      color: #ffffff;
    }
    /deep/ .van-icon-arrow-left {
      color: #ffffff;
    }
    /deep/ .van-nav-bar__text {
      color: #ffffff;
      display: none;
    }
  }
  /deep/ .van-hairline--bottom::after {
    border-bottom-width: 0px;
  }
}
</style>
