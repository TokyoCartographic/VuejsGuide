<script>
import { computed } from "vue"
import Child from "./Child.vue"
import { useStore } from "../store/store"
export default {
  name: "Parent",
  components: {
    Child
  },
  setup() {
    const store = useStore()
    const count = computed(() => store.getCount.value)
    const updateCount = () => {
      store.updateCount()
    }
    return {
      count,
      updateCount
    }
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
