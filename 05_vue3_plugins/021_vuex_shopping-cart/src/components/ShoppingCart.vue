<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!cartProducts.length">
      <i class="message">Please add some products to cart.</i>
    </p>
    <ul>
      <li v-for="product in cartProducts" v-bind:key="product.id">
        {{ product.title }} - {{ product.price }} x {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ cartTotalPrice }}</p>
    <div>
      <button :disabled="!cartProducts.length" @click="checkout(cartProducts)">
        Checkout
      </button>
      <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"

export default {
  setup() {
    const store = useStore()
    return {
      /*
      cartProducts: computed(() => store.getters["cart/cartProducts"]),
      cartTotalPrice: computed(() => store.getters["cart/cartTotalPrice"]),
      checkoutStatus: computed(() => store.state.cart.checkoutStatus),
      checkout: (products) => store.dispatch("cart/checkout", products)
      */
      cartProducts: computed(() => store.getters["shopping/cartProducts"]),
      cartTotalPrice: computed(() => store.getters["shopping/cartTotalPrice"]),
      checkoutStatus: computed(() => store.state.shopping.checkoutStatus),
      checkout: (products) => store.dispatch("shopping/checkout", products)

    }
  }
}
</script>

<style scoped>
h2 {
  color: coral;
}
p {
  font-weight: bold;
}
.message {
  color: dimgray;
  font-weight: normal;
}
</style>
