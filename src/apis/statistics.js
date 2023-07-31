import axios from "@/utils/axios.js";

// 统计列表
export function getStatisticsList (params) {
	return axios({
		             url: "/api/jzw/lrtjList",
		             method: "post",
		             data: params
	             });
}