<!--
 * @Author: hhh
 * @Date: 2021-07-16 14:03:43
 * @LastEditTime: 2021-07-20 20:06:20
 * @LastEditors: hhh
 * @Description: 
 * @FilePath: /zk/newapp/src/views/vipLevel.vue
-->
<template>
  <div id="vipLevel">
    <div class="recommend-top">
      <!-- <img class="back-img" v-show="userInfo.levelId == 2" src="../assets/01.png" alt="">
      <img class="back-img" v-show="userInfo.levelId == 1 || userInfo.levelId == 3" src="../assets/06.png" alt=""> -->
      <img class="back-img" src="../assets/01.png" alt="">
      <div class="recommend-top-top">
        <div class="recommend-top-top-left" :class="{goldVip:userInfo.levelId == 2}">
          <p class="text" :class="{goldtext:userInfo.levelId == 2}">艺赞尊贵会员</p>
          <p class="text2" :class="{goldtext:userInfo.levelId == 2}">VIP CLUB</p>
        </div>
        <div class="recommend-top-top-right">
          <img :src="userInfo.headImg" alt="">
        </div>
      </div>
      <div class="recommend-top-btm">
        <div class="recommend-top-btm-top">
          <p class="username">{{userInfo.nickName}}</p>
          <!-- <p class="userlevel">黄金用户</p> -->
          <span class="deadline">{{userInfo.createTime}}</span>
        </div>
      </div>
    </div>
    <div class="viplevel-btm">
      <div class="viplevel-btm-item">
        <p class="title">
          <!-- <img src="../assets/02.png" alt=""> -->
          <span class="title-span">{{list[0].name}}</span>
        </p>
        <ul v-if="list[0]">
          <!-- <li>权益一：获得10口牙销售权，原价：9800元，冰点价：4800元</li>
          <li>权益一：获得10口牙销售权，原价：9800元，冰点价：4800元</li>
          <li>权益一：获得10口牙销售权，原价：9800元，冰点价：4800元</li>
          <li>权益一：获得10口牙销售权，原价：9800元，冰点价：4800元</li>
          <li>权益一：获得10口牙销售权，原价：9800元，冰点价：4800元</li>
          <li>权益一：获得10口牙销售权，原价：9800元，冰点价：4800元</li> -->
          <li>{{list[0].rightsExplain}}</li>
        </ul>
        <div class="btn-box">
          <img class="btn" v-if="userInfo.level == list[1].level" src="../assets/11.png" alt="">
          <img class="btn" v-if="userInfo.level != 1 &&userInfo.level > list[1].level" src="../assets/12.png" alt="">
        </div>

      </div>
      <div class="viplevel-btm-item">
        <p class="title">
          <!-- <img src="../assets/07.png" alt=""> -->
          <span class="title-span">{{list[1].name}}</span>
        </p>
        <ul v-if="list[1]">
          <!-- <li>权益一：获得10口牙销售权，原价：9800元，冰点价：4800元</li>
          <li>权益一：获得10口牙销售权，原价：9800元，冰点价：4800元</li>
          <li>权益一：获得10口牙销售权，原价：9800元，冰点价：4800元</li>
          <li>权益一：获得10口牙销售权，原价：9800元，冰点价：4800元</li>
          <li>权益一：获得10口牙销售权，原价：9800元，冰点价：4800元</li>
          <li>权益一：获得10口牙销售权，原价：9800元，冰点价：4800元</li> -->
          <li>{{list[1].rightsExplain}}</li>
        </ul>
        <div class="btn-box">
          <img class="btn" v-if="userInfo.level == list[1].level" src="../assets/11.png" alt="">
          <img class="btn" v-if="userInfo.level != 1 &&userInfo.level > list[1].level" src="../assets/12.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import request from '../utils/request.js'
export default {
  name: 'vipLevel',
  data() {
    return {
      list: [],
    }
  },
  beforeMount() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (this.userInfo.mobile == '') {
      this.$router.replace({ path: '/404' })
    }
  },
  mounted() {
    this.levelInfo()
  },
  methods: {
    async levelInfo() {
      let _this = this;
      let result = await request({
        url: "/level_info/queryData",
        method: "get",
      });
      try {
        console.log(result.data);
        _this.list = result.data.data;
      } catch (error) {
        console.log(error);
        Dialog.alert({
          message: error,
        }).then(() => { });
      }
    },
  }
}
</script>
<style lang="less" scoped>
#vipLevel {
  width: 100%;
  height: 100%;
  .goldtext {
    color: #cfbb8a !important;
  }
  .recommend-top {
    width: 100%;
    border: 1px solid #3e404d;
    margin: 0;
    padding: 0;
    /* background: url("../assets/01.png") no-repeat center center;
  background-size: 101% 100%; */
    height: 5rem;
    position: relative;
    .back-img {
      width: 100%;
      height: 6rem;
      z-index: 1;
      top: -1rem;
      position: absolute;
      left: 0;
    }
    .recommend-top-top {
      z-index: 2;
      width: 100%;
      height: 2.5rem;
      position: relative;
      .goldVip {
        background: url("../assets/08.png") no-repeat center center;
        background-size: 100% 100%;
      }
      .normalVip {
        background: url("../assets/09.png") no-repeat center center;
        background-size: 100% 100%;
      }
      .recommend-top-top-left {
        width: 4rem;
        height: 1rem;
        position: absolute;
        left: 0.6rem;
        top: 1.3rem;
        background: url("../assets/09.png") no-repeat center center;
        background-size: 100% 100%;
        .text {
          // color: #cfbb8a;
          color: #c1c1c1;
          position: absolute;
          width: 1.8rem;
          left: 1.3rem;
          top: 0.09rem;
          font-size: 12px;
        }
        .goldtext {
          color: #cfbb8a !important;
        }
        .text2 {
          // color: #cfbb8a;
          color: #c1c1c1;
          position: absolute;
          left: 1.7rem;
          top: 0.5rem;
          font-size: 0.1rem;
        }
      }
      .recommend-top-top-right {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: #ccc;
        position: absolute;
        right: 0.7rem;
        top: 1.2rem;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
    }
    .recommend-top-btm {
      width: 100%;
      z-index: 2;
      height: 2.1rem;
      position: relative;
      .recommend-top-btm-top {
        width: 100%;
        z-index: 2;
        p {
          margin: 0;
          text-align: left;
          // margin-top: 0.2rem;
          margin-left: 0.55rem;
        }
        .username {
          color: #67655d;
          font-size: 0.4rem;
          font-weight: 600;
          margin-top: 0.2rem;
        }
        .userlevel {
          color: #67655d;
          font-size: 0.22rem;
          font-weight: 600;
        }
        .deadline {
          color: #8b7d5c;
          font-size: 0.18rem;
          position: absolute;
          top: 0.17rem;
          right: 0.5rem;
        }
      }
      .recommend-top-btm-btm {
        width: 2.4rem;
        height: 0.5rem;
        border-radius: 1rem;
        background: #cfbb8a;
        color: #333333;
        text-align: center;
        position: absolute;
        bottom: 0.6rem;
        left: 2.5rem;
        cursor: pointer;
      }
    }
  }
  .viplevel-btm {
    width: 100%;
    display: flex;
    justify-content: space-around;
    overflow: auto;
    padding-bottom: 1rem;
    .viplevel-btm-item {
      width: 3.3rem;
      background: url("../assets/04.png") no-repeat center center;
      background-size: 100% 100%;
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      .title {
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        margin-top: 0.08rem;
        img {
          width: 80%;
        }
        .title-span {
          color: #cfbb8a;
          display: block;
          width: 1.3rem;
          font-size: 12px;
          margin: 0.15rem 0;
          position: relative;
        }
        .title-span:before {
          content: "";
          display: block;
          width: 0.8rem;
          height: 0.03rem;
          background: #cfbb8a;
          position:absolute;
          left: -.7rem;
          top:.15rem;
          border-top-left-radius: 100%;
          border-bottom-left-radius: 100%;
        }
        .title-span:after {
          content: "";
          display: block;
          width: 0.8rem;
          height: 0.03rem;
          background: #cfbb8a;
          position:absolute;
          right: -.7rem;
          top:.15rem;
          border-top-right-radius: 100%;
          border-bottom-right-radius: 100%;
        }
      }
      ul {
        width: calc(100% - 0.2rem);
        padding: 0 0.1rem;
        margin: 0;
        li {
          //   padding: 0;
          margin: 0;
          width: calc(100% - 0.3rem);
          text-align: left;
          color: #333333;
          font-size: 12px;
          padding: 0 0 0 0.4rem;
          //   text-indent: .2rem;
          position: relative;
          //   -webkit-text-size-adjust: 100%;
          //   transform: scale(0.82);
        }
        li:after {
          content: "";
          position: absolute;
          width: 0.1rem;
          height: 0.1rem;
          background: #333333;
          border-radius: 50%;
          left: 0.1rem;
          top: 0.1rem;
        }
      }
      .btn-box {
        margin: 0.2rem 0;
        width: 100%;
        height: 0.4rem;
        display: flex;
        justify-content: center;
        .btn {
          width: 1.8rem;
          height: 0.4rem;
          // border:20px;
          display: block;
        }
      }
    }
  }
}
</style>
