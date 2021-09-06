<script>
import { ref, computed } from "vue"
import { useStore } from "vuex"
export default {
  setup(props) {
    const store = useStore()
    const users = computed(() => {
      return store.state.users.length
    })
    const count = computed(() => {
      return store.state.users.length
    })
    const addUser = () => {
      store.commit("addUser", { user: "user" + count.value })
    }
    return {
      users,
      count,
      addUser
      /*
      users: computed(() => store.state.users),
      count: computed(() => store.state.users.length),
      addUser: () => store.commit("addUser", { user: "user" + count.value })
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
    <li v-for="user in users">{{ user }}</li>
  </ul>
</template>

<style scoped>
h1 {
  color: #42b983;
}
</style>
