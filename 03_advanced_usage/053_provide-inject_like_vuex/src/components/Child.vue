<script>
import { computed } from "vue"
import { useStore } from "../store/store"
import Grandchild from "./Grandchild.vue"
export default {
  name: "Child",
  components: {
    Grandchild
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
