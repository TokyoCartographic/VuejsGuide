<template>
  <slot />
</template>
<script>
export default {
  data() {
    return {
      // カウンタを保持するデータを定義
      container: { count: 0 }
    }
  },
  provide() {
    const counterContainer = this.container
    // counterContainerという名前でデータを提供する
    return { counterContainer }
  }
}
</script>
