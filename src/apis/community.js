import axios from "@/utils/axios.js";

// 小区列表
export function getCommunityList(params) {
    return axios({
        url: "/api/jzw/xqshow",
        method: "post",
        data: params
    });
}

// 新增小区
export function addCommunity(params) {
    return axios({
        url: "/api/jzw/xqzjxg",
        method: "post",
        data: params
    });
}

// 查看小区
export function getCommunity(params) {
    return axios({
        url: "/api/jzw/zqdetail?bh=" + params,
        method: "get",
    });
}

// 删除小区
export function deleteCommunity(params) {
    return axios({
        url: "/api/jzw/xqsc?bh=" + params,
        method: "get",
    });
}