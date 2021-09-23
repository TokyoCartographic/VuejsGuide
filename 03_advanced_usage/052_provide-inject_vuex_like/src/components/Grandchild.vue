<script>
import { ref, inject } from "vue"
export default {
  name: "Grandchild",
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
  <div class="grandchild">
    <p class="title">Grandchild Component</p>
    <div class="container">
      <div class="items">
        {{ count }}
      </div>
      <div class="items">
        <button @click="updateCount">update</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grandchild {
  width: 60%;
  height: 100px;
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
