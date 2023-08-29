/**
 * deleteLabel(str)
 * @description 删除目标字符串中所有标签
 * @param {String} str 目标字符串
 * @returns 经过处理后的字符串
 */
import * as imageConversion from "image-conversion";
import { ElMessage } from "element-plus";

export function deleteLabel (str) {
    if (!str) return;
    return str.replace (/<[^<>]+>/g, "").replace (/&nbsp;/gi, "");
}

/**
 * 获取静态资源URL
 * @param path assets目录下的路径，例如"home/bg.png"
 * @returns string
 */
export function getImageUrl (path) {
    return import.meta.env.BASE_URL + "static/images/" + path;
}

/**
 * 根据属性数组去重
 * @param array 目标数组
 * @param uniProp 唯一值属性
 * @returns 返回去重数组
 */
export function uniqueArray (array, uniProp) {
    const map = new Map ();
    return array.filter ((item) => !map.has (item[uniProp]) && map.set (item[uniProp], 1));
}

// 图片上传
export function afterRead (file) {
    // 判断是图片
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        ElMessage.error ("图片只能是 JPG 或者 PNG 格式!");
        return false;
    }
    return new Promise ((resolve) => {
        // 压缩到100KB,这里的100就是要压缩的大小,可自定义
        imageConversion.compressAccurately (file, 500).then (res => {
            resolve (res);
        });
    });
}

// 滚动到未校验位置
export function elFormErrorScrollIntoView () {
    // 获取第一个校验错误的元素
    const element = document.querySelectorAll (".el-form-item__error")[0];
    // 滚动到错误元素对应位置
    element.scrollIntoView ({
        behavior: "smooth",
        block: "center"
    });
}