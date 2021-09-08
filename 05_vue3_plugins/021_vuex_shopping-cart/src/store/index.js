import { createStore, createLogger } from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
// import shopping from "./modules/shopping" // シングルファイル
export default createStore({
  modules: {
    cart,
    products
    // shopping
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [createLogger()]
})
