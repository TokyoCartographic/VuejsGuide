<script>
import { computed } from "vue"
import { useStore } from "vuex"
export default {
  setup() {
    const store = useStore()
    const count = computed(() => store.getters.count)
    return {
      count,
      users: computed(() => store.state.users),
      addUser: () => store.commit("addUser", { user: "user" + count.value })
    }
  }
}
</script>

<template>
  <h1>Hello Vuex</h1>
  <p>user counts: {{ count }}</p>
  <button @click="addUser">addUser</button>
  <ul>
    <li v-for="(user, index) in users" :key="index">{{ user }}</li>
  </ul>
</template>

<style scoped>
h1 {
  color: #42b983;
}
</style>
