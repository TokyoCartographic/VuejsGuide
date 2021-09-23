<script>
import Parent from "./components/Parent.vue"
import { initStore } from "./store/store"
export default {
  components: {
    Parent
  },
  setup() {
    initStore()
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
  text-align: center;
  color: #2c3e50;
}
</style>
