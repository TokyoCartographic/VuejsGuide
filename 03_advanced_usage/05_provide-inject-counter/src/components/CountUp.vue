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
      this.counterContainer.count++
    }
  }
}
</script>
