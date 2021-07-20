<!--
 * @Author: hhh
 * @Date: 2021-07-20 15:01:27
 * @LastEditTime: 2021-07-20 15:08:15
 * @LastEditors: hhh
 * @Description: 
 * @FilePath: /zk/newapp/src/views/qrcode.vue
-->
<template>
  <div id="qrcode">
    <!-- <img src="" alt=""> -->
    <div id="qrcodes" ref="qrcodes"></div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import request from '../utils/request.js'
export default {
  name: 'qrcode',
  data() {
    return {

    }
  },
  mounted() { 
      this.getRecUrl()
  },
  methods: {
    async getRecUrl() {
      let _this = this;
      let result = await request({
        url: "/my_info/getRecUrl",
        method: "get",
      });
      try {
        console.log(result.data.data.recUrl);
        // let qrcode = new QRCode("test", {
        //   text: result.data.data.recUrl,
        //   // width: 128,
        //   // height: 128,
        //   colorDark: "#000000",
        //   colorLight: "#ffffff",
        //   // correctLevel: QRCode.CorrectLevel.H
        // });
        // console.log(qrcode)
        // ImagePreview([qrcode]);
        this.qrCode(result.data.data.recUrl)
      } catch (error) {
        console.log(error);
        Dialog.alert({
          message: error,
        }).then(() => { });
      }
    },
    qrCode(url) {
      let qrcode = new QRCode('qrcodes', {
        // width: 150, //图像宽度
        // height: 150, //图像高度
        colorDark: "#000000", //前景色
        colorLight: "#ffffff", //背景色
        typeNumber: 4,
        correctLevel: QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      })
      qrcode.clear() //清除二维码 
      qrcode.makeCode(url) //生成另一个新的二维码
    }
  }
}
</script>
<style lang="less" scoped>
#qrcode {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 80%;
    height: 80%;
  }
}
</style>
