<script>
import { commonSetup } from "./libs/commonSetup.js"
export default {
  name: "Grandchild",
  setup() {
    return commonSetup()
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
