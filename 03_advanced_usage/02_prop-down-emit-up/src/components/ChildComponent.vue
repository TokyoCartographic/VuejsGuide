<template>
  カウント: {{ count }}
  <button v-on:click="handleClick">+1</button>
</template>
<script>
export default {
  props: { count: { type: Number } },
  emits: ['update'], // 次章で説明します
  methods: {
    handleClick() {
      const newCount = this.count + 1
      //カスタムイベントを発行し、データを送信する
      this.$emit('update', newCount)
    }
  }
}
</script>
