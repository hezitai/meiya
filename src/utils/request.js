/*
 * @Author: hhh
 * @Date: 2021-07-12 10:10:35
 * @LastEditTime: 2021-07-19 19:09:18
 * @LastEditors: hhh
 * @Description: 
 * @FilePath: /zk/newapp/src/utils/request.js
 */
import axios from "axios";
// axios.defaults.withCredentials = true;
axios.defaults.timeout = 20000;
if (process.env !== "production") {
    axios.defaults.baseURL = "http://zkj.idverify.net/";
}
// if (process.env.VUE_APP_FLAG === "buildtest") {
//     axios.defaults.baseURL = "http://shyc.dccnet.com.cn/res/network";
// }
// if (process.env.VUE_APP_FLAG === "prod") {
//     axios.defaults.baseURL = "http://shyc.dccnet.com.cn/res/network";
// }
axios.interceptors.request.use(function(config) {
    // let token = localStorage.getItem('local_token')

    // console.log(location.href.split('?')[1].split('=')[1])
    // let token = location.href.split('?')[1].split('=')[1];
    let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjcG5fbWFya2V0IiwiTE9HSU5fVVNFUiI6eyJpZCI6IjE5In0sImlhdCI6MTYyNjY3NjczMSwiZXhwIjoxNjI2NzYzMTMxfQ.PRz-pIaCJyThrudYHonAoxllUAjyfLtD6hX8nxS4FAg"
        // console.log('token', token)
    if (token) {
        config.headers['YZ_AUTH_TOKEN'] = token;
        //   config.headers['userId'] = localStorage.getItem('userId')
        //   Vue.prototype.$RoleId = localStorage.getItem('role_id') == 1 ? true : false
    }
    // showFullScreenLoading()
    // debugger
    return config
})
axios.defaults.headers.post["Content-Type"] = "application/json";

function request(options) {
    return axios(options)
        .then(res => {
            return res;
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

export default request;

// async getJsonDate(row) {
// let _this = this;
//     let result = await request({
//         url: "/json/index.json",
//         method: "get"
//     });
//     // console.log(result, "result");
//     try {
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// }