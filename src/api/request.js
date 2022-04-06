//二次封装axios
import axios from "axios";
//引入进度条
import nProgress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
import store from "@/store";

const requests = axios.create({
    //基础路径
    baseURL: "/api",
    //代表请求超时为5S
    timeout: 5000,
})
//请求拦截器，在发送请求前做事
requests.interceptors.request.use((config) => {
    if(store.state.detail.uuid_token){
        //请求头添加一个字段，用来做游客id识别
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //需要携带token给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
        // console.log(config.headers.token)
    }
    //进度条开始动
    nProgress.start();
    return config;
})
//相应拦截器
requests.interceptors.response.use((res) => {
    //进度条结束
    nProgress.done();
    //响应成功的回调
    return res.data;
}, (error) => {
    //响应失败的回调
    return Promise.reject(error);
})

export default requests





