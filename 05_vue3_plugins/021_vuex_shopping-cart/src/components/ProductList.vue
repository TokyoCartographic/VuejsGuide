<template>
  <ul>
    <li class="products" v-for="product in products" v-bind:key="product.id">
      {{ product.title }} - {{ product.price }}
      <button
        :disabled="!product.inventory"
        class="buy-btn"
        @click="addProductToCart(product)"
      >
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
export default {
  setup() {
    const store = useStore()
    // store.dispatch("products/getAllProducts")
    store.dispatch("shopping/getAllProducts")
    return {
      /*
      products: computed(() => store.state.products.products),
      addProductToCart: (product) => store.dispatch("cart/addProductToCart", product)
      */
      products: computed(() => store.state.shopping.products),
      addProductToCart: (product) => store.dispatch("shopping/addProductToCart", product)

    }
  }
}
</script>

<style scoped>
.products {
  padding: 5px;
  display: flex;
  justify-content: space-between;
}
</style>
