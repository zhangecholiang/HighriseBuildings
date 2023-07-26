import axios from "@/utils/axios.js";

// 新增建筑物
export function addBuilding (params) {
	return axios({
		url: "/api/jzw/jzwgl", method: "post", data: params
	});
}

// 建筑物列表
export function getBuildingList (params) {
	return axios({
		url: "/api/jzw/jzwglList", method: "post", data: params
	});
}

// 编辑建筑物
export function editBuilding (params) {
	return axios({
		url: "/api/jzw/jzwbjDetail?bh=" + params, method: "get",
	});
}

// 删除建筑物
export function deleteBuilding (params) {
	return axios({
		url: "/api/jzw/jzwsc?bh=" + params, method: "get",
	});
}