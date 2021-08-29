<template>
  <ChildComponent>
    <span>押して：</span>
    <button @click="onClick">ボタン</button>
  </ChildComponent>
</template>
<script>
import ChildComponent from "./ChildComponent.vue"
export default {
  components: { ChildComponent },
  methods: {
    onClick() {
      alert("押したな！")
    }
  }
}
</script>
