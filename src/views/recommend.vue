<!--
 * @Author: hhh
 * @Date: 2021-07-12 10:51:30
 * @LastEditTime: 2021-07-20 15:48:54
 * @LastEditors: hhh
 * @Description: 
 * @FilePath: /zk/newapp/src/views/recommend.vue
-->
<template>
  <div id="recommend">
    <div class="recommend-top">
      <img class="back-img" src="../assets/01.png" alt="">
      <div class="recommend-top-top">
        <div class="recommend-top-top-left">
          <p class="text">{{userInfo.levelName}}</p>
          <p class="text2">VIP CLUB</p>
        </div>
        <div class="recommend-top-top-right">
          <img :src="userInfo.headImg" alt="">
        </div>
      </div>
      <div class="recommend-top-btm">
        <div class="recommend-top-btm-top">
          <p class="username">{{userInfo.nickName}}</p>
          <p class="userlevel" v-show="userInfo.levelId == 2">黄金用户</p>
          <p class="userlevel" v-show="userInfo.levelId == 1">钻石用户</p>
          <p class="userlevel" v-show="userInfo.levelId == 3">游客</p>
          <span class="deadline">{{userInfo.createTime}}</span>
        </div>
        <div class="recommend-top-btm-btm" @click="goLevel">
          去升级
        </div>
      </div>
    </div>
    <div class="recommend-btm">
      <img class="nodata" src="../assets/13.png" v-show="list.length == 0" alt="">
      <p class="nodata-p" v-show="list.length == 0">您还没有推荐</p>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" v-show="list.length != 0">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="list-item" v-for="(item, $index) in list" :key="$index">
            <div class="list-item-left" v-if="list">
              <div class="list-img">
                <img src="" alt="">
              </div>
              <div class="list-item-left-text" v-if="list">
                <p class="line1">{{item.nickName}}</p>
                <p class="line2">{{item.mobile}}</p>
              </div>
            </div>
            <div class="list-item-right" v-if="list">
              <p class="line1">{{item.levelName}}</p>
              <p class="line2">推荐时间:{{item.createTime}}</p>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import request from '../utils/request.js'
import { Dialog } from 'vant';
export default {
  name: "recommend",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      current: 0,
      userInfo: {},
    }
  },
  beforeMount() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (this.userInfo.mobile == '') {
      this.$router.replace({ path: '/404' })
    }
  },
  mounted() {
    this.onRefresh()
  },
  methods: {
    onLoad() {
      // this.list = [];
      // this.getRec();
      // this.current++;
      // console.log(this.current);
      // setTimeout(() => {
      if (this.refreshing) {
        this.list = [];
        this.getRec();
        this.refreshing = false;
      }

      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   this.loading = false;

      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.current++;
      console.log(this.current);
      this.getRec();
    },
    async getRec() {
      this.refreshing = true;
      this.loading = true;
      let a = { size: 10, current: this.current };
      let _this = this;
      let result = await request({
        url: "/my_info/getRec",
        method: "get",
        params: a
      });
      try {
        if (result.data.data.length < 10) {
          _this.current--;
          _this.list = [];
          _this.list = result.data.data
        } else {
          for (let i = 0; i < result.data.data.length; i++) {
            _this.list.push(result.data.data[i]);
          }
        }
        _this.refreshing = false;
        _this.loading = false;
        _this.finished = true;
      } catch (error) {
        console.log(error);
        Dialog.alert({
          message: error,
        }).then(() => { });
      }
    },
    goLevel() {
      this.$router.push({ path: "/viplevel" })
    }
  }
}
</script>
<style lang="less" scoped>
#recommend {
  width: 100%;
  height: 100%;
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
    .recommend-top-top-left {
      width: 4rem;
      height: 1rem;
      position: absolute;
      left: 0.6rem;
      top: 1.3rem;
      background: url("../assets/08.png") no-repeat center center;
      background-size: 100% 100%;
      .text {
        color: #cfbb8a;
        position: absolute;
        left: 1.55rem;
        top: 0.09rem;
      }
      .text2 {
        color: #cfbb8a;
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
      line-height: 0.6rem;
      cursor: pointer;
    }
  }
}
.recommend-btm {
  width: 100%;
  height: calc(100% - 5rem);
  overflow: auto;
  .nodata {
    width: 60%;
    // height: 60%;
  }
  .nodata-p {
    font-weight: 300;
    color: #4c4b4b;
    font-size: 14px;
  }
  .list-item {
    width: 100%;
    height: 1rem;
    border: 1px solid #ececec;
    position: relative;
    .list-item-left {
      display: flex;
      // justify-content: center;
      align-items: center;
      .list-img {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        background: #ccc;
        margin: 0.18rem 0.2rem 0 0.35rem;
      }
      .list-item-left-text {
        .line1 {
          margin: 0;
          margin-top: 0.2rem;
          color: #333333;
          font-size: 0.28rem;
          text-align: left;
        }
        .line2 {
          margin: 0;
          color: #8b7d5c;
          font-size: 0.25rem;
          text-align: left;
        }
      }
    }
    .list-item-right {
      position: absolute;
      // width: ;
      right: 0.3rem;
      top: 0.16rem;
      .line1 {
        margin: 0;
        text-align: right;
        font-size: 0.28rem;
        color: #333333;
      }
      .line2 {
        margin: 0;
        text-align: right;
        font-size: 0.22rem;
        color: #8b7d5c;
      }
    }
  }
}
</style>
