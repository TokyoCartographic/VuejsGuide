// import { createStore, createLogger } from 'vuex'
// import cart from './modules/cart'
// import products from './modules/products'
import { createStore } from "vuex"
import shop from "../api/shop.js"
/*
export default createStore({
  modules: {
    cart,
    products
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
*/
export default createStore({
  state: {
    products: [],
    items: []
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    pushProductToCart(state, product) {
      state.items.push({
        id: product.id,
        quantity: 1
      })
    },
    incrementItemQuantity(state, { id }) {
      const cartItem = state.items.find(item => item.id === id);
      cartItem.quantity++;
    },
    decrementProductIventory(state, { id }) {
      const product = state.products.find(product => product.id === id)
      product.inventory--;
    }
  },
  actions: {
    getAllProducts({ commit }) {
      shop.getProducts(products => {
        commit('setProducts', products)
      })
    },
    addProductToCart({ state, commit }, product) {
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit('pushProductToCart', product)
      } else {
        commit('incrementItemQuantity', cartItem);
      }
      commit('decrementProductIventory', product)
    }
  },
  getters: {
    cartProducts: state => {
      return state.items.map(item => {
        const product = state.products.find(product => product.id === item.id)
        return {
          title: product.title,
          price: product.price,
          quantity: item.quantity
        }
      })
    }
  }
})
