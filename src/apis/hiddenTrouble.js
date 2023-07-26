import axios from "@/utils/axios.js";

// 隐患列表
export function getHiddenDangerList (data) {
	return axios({
		url: "/api/jzw/yhglList", method: "post", data
	});
}

// 整改
export function getRectification (bh, jcxm) {
	return axios({
		url: "/api/jzw/yhzgDetail?bh=" + bh + "&jcxm=" + jcxm, method: "get",
	});
}

// 提交整改
export function submitRectification (data) {
	return axios({
		url: "/api/jzw/yhzg", method: "post", data
	});
}