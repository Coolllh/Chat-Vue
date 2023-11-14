import router from "@/router";
import axios from "axios";
import { Message } from "element-ui";

//创建axios实例
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081', // 设置默认发送地址为后端端口
});

//添加拦截器，在每次ajax之前都会执行这个操作
axiosInstance.interceptors.request.use(function (config) {
    console.log("操作了")
    //从本地缓存获得token
    const token = window.localStorage.getItem('token')

    //如果存在将其加入请求头中
    if (token) {
        config.headers.token = token;
    }
    return config;
}, function (error) {


    return Promise.reject(error);//发生错误返回一个拒绝的promise对象
})

axiosInstance.interceptors.response.use(function (response) {
    return response
},
    function (error) {
        if (error.response.status === 401) {
            router.push({ path: "/login" }, () => { }, () => { })
            var msg = "登录超时,请重新登录"
            Message({
                message: msg,
                type: 'error',
                duration: 3000
            })
            localStorage.removeItem('token')
        }
        else if (error.response.status === 402) {
            router.push({ path: "/login" });
        }
        else if (error.response.status === 500) {
            var msg1 = '出现未知错误'
            Message({
                message: msg1,
                type: 'error',
                duration: 3000
            })
        }
    }
)

export default axiosInstance;