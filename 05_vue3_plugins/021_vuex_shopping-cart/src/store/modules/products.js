import shop from '../../api/shop'

// initial state
const state = {
  products: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllProducts({ commit }) {
    shop.getProducts(products => {
      commit('setProducts', products)
    })
  }
}

// mutations
const mutations = {
  setProducts(state, products) {
    state.products = products
  },

  decrementProductInventory(state, { id }) {
    const product = state.products.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
