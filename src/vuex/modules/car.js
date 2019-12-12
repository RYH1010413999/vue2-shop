const state = {
    number: 0,
    money: 0
}
const getters = {
    getNumber(state) {
        return state.number
    },
    getMoney(state) {
        return state.money
    },
}
const mutations = {
    updateNumber(state,data) {
        state.number = data;
    },
    updateMoney(state,data) {
        state.money = data;
    },
}
export default {
    state,
    getters,
    mutations
}