<!--
 * @Author: hhh
 * @Date: 2021-07-12 10:51:30
 * @LastEditTime: 2021-07-19 19:38:37
 * @LastEditors: hhh
 * @Description: 
 * @FilePath: /zk/newapp/src/views/center.vue
-->
<template>
  <div id="center">
    <div class="top">
      <div class="head-img">
        <img :src="userInfo.headImg" alt="">
        <span class="vip-icon">
          <span class="vip-level">{{userInfo.levelId}}</span>
        </span>
      </div>

      <div class="user-info">
        <p class="user-name">{{userInfo.name}}</p>
        <p class="user-phone">手机号:{{userInfo.mobile}}</p>
        <p class="exclusive-code" @click="getRecUrl">专属邀请码</p>
      </div>
    </div>
    <div class="content">
      <div class="get-vip">
        <p class="title">升级享受更多权益</p>
        <span class="upgrade" @click="upgrade">升级黄钻</span>
      </div>
    </div>
  </div>
</template>
<script>
import request from '../utils/request.js'
import { ImagePreview } from 'vant';
export default {
  name: "center",
  data() {
    return {
      userInfo: {},
    }
  },
  beforeMount() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (this.userInfo.mobile == '') {
      this.$router.replace({ path: '/404' })
    }
  },
  mounted() { },
  methods: {
    upgrade() {
      this.$router.push({ path: "/viplevel" })
    },
    async getRecUrl() {
      let _this = this;
      let result = await request({
        url: "/my_info/getRecUrl",
        method: "get",
      });
      try {
        console.log(result.data.data);
        ImagePreview([result.data.data]);
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
<style lang="less" scoped>
#center {
  width: 100%;
  height: 100%;
  // padding-top:1rem;
  .top {
    height: 3.5rem;
    width: 100%;
    background: #3e404d;
    // display: flex;
    position: relative;
    .head-img {
      width: 1.1rem;
      height: 1.1rem;
      border-radius: 50%;
      background: #ccc;
      position: absolute;
      left: 0.4rem;
      top: 1.4rem;
      img {
        width: 100%;
        border-radius: 50%;
      }
      .vip-icon {
        background: url("../assets/05.png") no-repeat center center;
        background-size: 100% 100%;
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        top: 0.7rem;
        left: 0.7rem;
        .vip-level {
          position: absolute;
          left: 0.35rem;
          top: 0.23rem;
          color: #905630;
          font-size: 12px;
        }
      }
    }
    .user-info {
      position: absolute;
      left: 1.85rem;
      top: 1.5rem;
      text-align: left;
      .user-name {
        color: #fff;
        font-size: 14px;
      }
      .user-phone {
        color: #e3e3e3;
        font-size: 12px;
        margin-top: 0.1rem;
      }
      .exclusive-code {
        width: 2.5rem;
        height: 0.5rem;
        border-radius: 14px;
        border: 1px solid #d5c5ac;
        color: #e3e3e3;
        font-size: 12px;
        text-align: center;
        line-height: 0.55rem;
        margin-top: 0.15rem;
        // margin-left: .2rem;
      }
    }
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    .get-vip {
      margin-top: 0.3rem;
      width: 90%;
      height: 1rem;
      background: url("../assets/03.png") no-repeat center center;
      background-size: 100% 100%;
      position: relative;
      .title {
        font-size: 16px;
        font-weight: 600;
        color: #905630;
        position: absolute;
        left: 1rem;
        top: 0.26rem;
      }
      .upgrade {
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
        background: url("../assets/10.png") no-repeat center center;
        background-size: 100% 100%;
        width: 2rem;
        height: 0.6rem;
        display: block;
        line-height: 0.6rem;
        text-align: center;
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
      }
    }
  }
}
</style>
