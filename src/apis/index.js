import axios from "@/utils/axios";

// token
export function getToken() {
    return axios({
        url: "http://kfq.kejin.net.cn:8001/api20220708/api/login/getToken?loginName=kjdeveloper&passWord=1114kskj%408498",
        method: "get"
    });
}

// 图片上传
export function uploadImg(data) {
    return axios({
        url: "http://kfq.kejin.net.cn:8222/api/FileSet/uploadimage",
        method: "post",
        data
    });
}

// token查
export function getTokenuser(params) {
    return axios({
        url: "http://kfq.kejin.net.cn:8002/api20220708/api/login/getUserInfo?token=" + params,
        method: "get"
    });
}