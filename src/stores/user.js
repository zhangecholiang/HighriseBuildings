import { defineStore } from "pinia";

export const useStore = defineStore ({
    id: "user",
    state: () => {
        return {
            token: "",
            userInfo: {},
            csqLoginid: "",
        };
    },
    getters: {},
    actions: {
        setToken (val) {
            this.token = val;
        },
        setUserInfo (val) {
            this.userInfo = val;
        },
        setCsqLoginid (val) {
            this.csqLoginid = val;
        }
    },
    persist: true
});