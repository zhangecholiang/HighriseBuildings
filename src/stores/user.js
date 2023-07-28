import { defineStore } from 'pinia'

export const useStore = defineStore({
	id: 'user',
	state: () => {
		return {
			token: '',
			userInfo: {}
		}
	},
	getters: {},
	actions: {
		setToken (val) {
			this.token = val
		},
		setUserInfo (val) {
			this.userInfo = val
		}
	}, persist: true
})