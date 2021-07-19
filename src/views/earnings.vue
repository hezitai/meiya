<!--
 * @Author: hhh
 * @Date: 2021-07-12 10:51:30
 * @LastEditTime: 2021-07-19 19:38:51
 * @LastEditors: hhh
 * @Description: 
 * @FilePath: /zk/newapp/src/views/earnings.vue
-->
<template>
  <div id="earnings">
    <!--  v-model="isLoading" -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!--  @load="onLoad"  v-model="loading"-->
      <van-list :finished="finished" v-model="loading" finished-text="没有更多了" @load="onLoad">
        <div class="list-item" v-for="(item, $index) in list" :key="$index">
          <div class="list-item-left">
            <div class="list-img">
              <img :src="item.srcHeadImg" alt="">
            </div>
            <div class="list-item-left-text">
              <p class="line1">{{item.srcUserName}}</p>
              <p class="line2">{{item.srcUserMobile}}</p>
            </div>
          </div>
          <div class="list-item-right">
            <p class="line1" style="color:#FFB700" v-show="item.type == 1">推荐收益</p>
            <p class="line1" style="color:#F53030" v-show="item.type == 2">提成收益</p>
            <p class="line1" style="color:#009EF9" v-show="item.type == 2">奖励收益</p>
            <p class="line2">{{item.money}}元</p>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { Toast } from 'vant';
import request from '../utils/request.js'
export default {
  name: "earnings",
  data() {
    return {
      count: 0,
      refreshing: false,
      list: [],
      loading: false,
      finished: false,
      current: 0,
      userInfo:{},
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
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.current++;
      this.loading = true;
      this.getRec();
    },
    async getRec() {
      this.refreshing = true;
      this.loading = true;
      let a = { size: 10, current: this.current };
      let _this = this;
      let result = await request({
        url: "my_income/queryData",
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
      }
    },
  }
}
</script>
<style lang="less" scoped>
#earnings {
  width: 100%;
  height: calc(100% - 1rem);
  padding-top: 1rem;
}
.list-item {
  display: flex;
  width: 100%;
  height: 1rem;
  border: 1px solid #ececec;
  position: relative;
  /* background: red; */
  border-bottom: 1px solid #ccc;
  .list-item-left {
    display: flex;
    // justify-content: center;
    align-items: center;
    .list-img {
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 50%;
      background: #ccc;
      margin: 0.1rem 0.2rem 0 0.35rem;
      img{
        width: 100%;
      }
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
</style>
