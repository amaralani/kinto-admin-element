import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        username: '',
        password: '',
        url: '',
        isLoggedIn : false
    },
    getters: {
        authorization: state => {
            return window.btoa(state.username + ":" + state.password);
        }
    },
    mutations: {
        login(state, payload) {
            state.username = payload.username;
            state.password = payload.password;
            state.url = payload.url;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.username = '';
            state.password = '';
            state.url = '';
            state.isLoggedIn = false;
        }
    }
});

export default store
