<script>
import Parent from "./components/Parent.vue"
import { initStore } from "./store/store"
export default {
  components: {
    Parent
  },
  setup() {
    initStore() // ここで初期化する
  }
}
</script>

<template>
  <Parent />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
