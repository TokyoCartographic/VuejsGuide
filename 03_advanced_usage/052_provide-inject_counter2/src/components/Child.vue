<script>
import { ref, inject } from "vue"
import Grandchild from "./Grandchild.vue"
export default {
  name: "Child",
  components: {
    Grandchild
  },
  setup() {
    // const count = ref(0)
    const count = inject("count") // 親と同期する
    // injectしたデータのときこの関数は動作しない
    const updateCount = () => {
      count.value++
    }
    return {
      count,
      updateCount
    }
  }
}
</script>

<template>
  <div class="child">
    <p class="title">Child Component</p>
    <div class="container">
      <div class="items">
        {{ count }}
      </div>
      <div class="items">
        <button @click="updateCount">update</button>
      </div>
    </div>
    <Grandchild />
  </div>
</template>

<style scoped>
.child {
  width: 80%;
  height: 210px;
  border: 1px solid silver;
}
.container {
  display: flex;
  justify-content: center;
  align-content: center;
}
.items {
  margin: 1em;
}
</style>
