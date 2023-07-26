import { defineStore } from 'pinia'

export const useStore = defineStore({
	id: 'user', state: () => {
		return {
			token: ''
		}
	}, getters: {}, actions: {
		setToken (val) {
			this.token = val
		}
	}, persist: true
})