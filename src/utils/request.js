/*
 * @Author: hhh
 * @Date: 2021-07-12 10:10:35
 * @LastEditTime: 2021-07-20 14:52:08
 * @LastEditors: hhh
 * @Description: 
 * @FilePath: /zk/newapp/src/utils/request.js
 */
import axios from "axios";
// axios.defaults.withCredentials = true;
axios.defaults.timeout = 20000;
if (process.env !== "production") {
    // axios.defaults.baseURL = "http://zkj.idverify.net/api/";
    axios.defaults.baseURL = 'http://192.168.21.121:8082/api';
}
// if (process.env.VUE_APP_FLAG === "buildtest") {
//     axios.defaults.baseURL = "http://shyc.dccnet.com.cn/res/network";
// }
// if (process.env.VUE_APP_FLAG === "prod") {
//     axios.defaults.baseURL = "http://shyc.dccnet.com.cn/res/network";
// }
axios.interceptors.request.use(function(config) {
    // console.log(location.href.split('?')[1].split('=')[1])
    // let token = location.href.split('?')[1].split('=')[1];
    let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjcG5fbWFya2V0IiwiTE9HSU5fVVNFUiI6eyJpZCI6IjE5In0sImlhdCI6MTYyNjc2MTQ3MiwiZXhwIjoxNjI2ODQ3ODcyfQ.-VBDjshYhIfwCGCJ6xJTgGID7c7-oqO81rXakGqlWjQ"
        // console.log('token', token)
    if (token) {
        config.headers['YZ-AUTH-TOKEN'] = token;
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