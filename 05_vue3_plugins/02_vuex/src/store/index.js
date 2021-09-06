import { createStore } from "vuex"
const store = createStore({
  state() {
    return {
      users: []
    }

  },
  mutations: {
    addUser(state, payload) {
      state.users.push(payload.user)
    }
  }
})
export default store
