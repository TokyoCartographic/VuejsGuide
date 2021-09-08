import { createStore, createLogger } from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
export default createStore({
  modules: {
    cart,
    products
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [createLogger()]
})
