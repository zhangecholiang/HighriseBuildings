import { defineStore } from 'pinia'

export const useDict = defineStore({
	id: 'dist', state: () => {
		return {
			sqList: '', xqList: '', jzwxzlist: '', gcjzlblist: '',
		}
	}, getters: {}, actions: {
		setSqList (sqList) {
			this.sqList = sqList
		}, setXqList (xqList) {
			this.xqList = xqList
		}, setJzwxzlist (jzwxzlist) {
			this.jzwxzlist = jzwxzlist
		}, setGcjzlblist (gcjzlblist) {
			this.gcjzlblist = gcjzlblist
		},
	}, persist: true,
})