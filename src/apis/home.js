import axios from "@/utils/axios.js";

//概况统计
export function getStatistics (loginid) {
    return axios ({
        url: "/api/jzwlargescreen/dpjzwxx",
        method: "get",
        params: {
            loginid: loginid
        }
    });
}

// 总数统计
export function getStatisticsTotal (loginid) {
    return axios ({
        url: "/api/jzwlargescreen/dpgxzs",
        method: "get",
        params: {
            csqLoginid: loginid
        }
    })
}