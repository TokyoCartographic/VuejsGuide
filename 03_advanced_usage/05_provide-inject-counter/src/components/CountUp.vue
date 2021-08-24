<template>
  <button v-on:click="handleClick">+1</button>
</template>
<script>
export default {
  // counterContainer を注入する
  inject: ["counterContainer"],
  methods: {
    handleClick() {
      // this.counterContainerには
      // 注入されたデータが格納されている
      /*
      const container = this.counterContainer
      container.count++
      */
      this.counterContainer.count++
    }
  }
}
</script>
