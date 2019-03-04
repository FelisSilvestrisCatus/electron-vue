import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        token: null,
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            localStorage.token = data.token;
            localStorage.user = JSON.stringify(data.user);
            state.token = data.token;
            state.user = data.user;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.token = null;
            state.user = null;
        }
    }
})
