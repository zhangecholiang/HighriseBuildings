import axios from "@/utils/axios.js";

// 检查列表
export function getcheckList (params) {
	return axios({
		             url: "/api/jzw/jzwjcinit",
		             method: "post",
		             data: params
	             });
}

// 新增检查
export function addcheck (params) {
	return axios({
		             url: "/api/jzw/xzjcjzwjc",
		             method: "post",
		             data: params
	             });
}

// 获取检查详情
export function getcheckDetail (bh) {
	return axios({
		             url: "/api/jzw/jzwdetail?bh=" + bh,
		             method: "get",
	             });
}

// 删除
export function delcheck (params) {
	return axios({
		             url: "/api/jzw/jzwdelete?bh=" + params,
		             method: "get",
	             });
}

// 获取楼栋
export function getbuild (csqLoginid, xqbh) {
	return axios({
		             url: `/api/jzw/jzwlh?csqLoginid=${csqLoginid}&xqbh=${xqbh}`,
		             method: "get",
	             });
}

// 获取楼栋信息
export function getbuildinfo (csqLoginid, xqbh, lh) {
	return axios({
		             url: "/api/jzw/jzwfhbh?csqLoginid=" + csqLoginid + "&xqbh=" + xqbh + "&lh=" + lh,
		             method: "get",
	             });
}

// 审核状态
export function checkstatus (bh, shzt, yhdj) {
	return axios({
		             url: "/api/jzw/jzwjcxxsh?bh=" + bh + "&shzt=" + shzt + "&yhdj=" + yhdj,
		             method: "post",
	             });
}