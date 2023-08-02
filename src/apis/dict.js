import axios from "@/utils/axios.js";
import http from "@/utils/axios8001.js";

// 树菜单
export function getTreeMenu(pid) {
    return http.post(`/api/dict/bindTree/${pid}`);
}

// 村社区
export function getVillage() {
    return axios.get(`/api/common/getcsq`);
}

// 小区
export function getCommunity(csqLoginid) {
    return axios.get(`/api/common/getxq`, {params: {csqLoginid}});
}