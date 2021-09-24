<script>
import { commonSetup } from "./libs/commonSetup.js"
import Child from "./Child.vue"
export default {
  name: "Parent",
  components: {
    Child
  },
  setup() {
    return commonSetup()
  }
}
</script>

<template>
  <div class="parent">
    <p class="title">Parent Component</p>
    <div class="container">
      <div class="items">
        {{ count }}
      </div>
      <div class="items">
        <button @click="updateCount">update</button>
      </div>
    </div>
    <Child />
  </div>
</template>

<style scoped>
.parent {
  width: 99%;
  height: 320px;
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
