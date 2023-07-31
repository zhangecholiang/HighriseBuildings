import axios from "axios";
import { useStore } from "@/stores/user.js";

// 创建一个 Axios 实例
const HttpRequest = axios.create({
	                                 baseURL: "http://kfq.kejin.net.cn:8001/api20220708", // 设置基本的 API 地址
	                                 timeout: 5000 // 设置请求超时时间
                                 });
// 请求拦截器
HttpRequest.interceptors.request.use(config => {
	const store = useStore();
	// 在请求发送之前可以做一些处理，例如添加请求头等
	if (store.token) {
		config.headers.Authorization = `${store.token}`;
	} else {
		config.headers.Authorization = localStorage.getItem("token");
	}
	return config;
}, error => {
	// 处理请求错误
	return Promise.reject(error);
});

// 响应拦截器
HttpRequest.interceptors.response.use(response => {
	// 对响应数据进行处理
	return response.data;
}, error => {
	// 处理响应错误
	return Promise.reject(error);
});

export default HttpRequest;