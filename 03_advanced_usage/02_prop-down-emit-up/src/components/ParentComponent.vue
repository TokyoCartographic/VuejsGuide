<template>
  <ChildComponent
    v-bind:count="myCount"
    v-on:update="handleUpdate" />
</template>
<script>
import ChildComponent from './ChildComponent.vue'
export default {
  components: { ChildComponent },
  data() { return { myCount: 0 } },
  methods: {
    handleUpdate(newCount) {
      // 子コンポーネントから送信されたデータを
      // myCountに格納する
      this.myCount = newCount
    }
  }
}
</script>
