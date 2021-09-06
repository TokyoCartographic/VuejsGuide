<script>
import { computed } from "vue"
import { useStore } from "vuex"
export default {
  setup() {
    const store = useStore()
    const users = computed(() => store.state.users)
    const count = computed(() => store.state.users.length)
    const addUser = () =>
      store.commit("addUser", { user: "user" + count.value })

    return {
      users,
      count,
      addUser
      /*
      users: computed(() => store.state.users), // OK
      count: computed(() => store.state.users.length), // NG
      addUser: () => store.commit("addUser", { user: "user" + count.value }) // OK
      */
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
