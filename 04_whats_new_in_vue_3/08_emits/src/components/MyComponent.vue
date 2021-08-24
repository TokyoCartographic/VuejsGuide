<template>
  <button v-on:click="notifyMessage('hello')">notifyMessage</button>
  <button v-on:click="handleClick">handleClick</button>
</template>
<script>
export default {
  // emitsオプション
  // 発行するカスタムイベント名を定義する
  // emits: ['notify', 'click'],
  emits: {
    // カスタムイベント'notify'で送信する
    // データは string でなければなりません
    notify(value) {
      return typeof value === 'string'
    },
    // カスタムイベント'click'は
    // 引数を与えてはいけません
    click() {
      return arguments.length === 0
    },
  },
  methods: {
    notifyMessage(message) {
      // カスタムイベント'notify'を発行
      this.$emit('notify', message)
    },
    handleClick() {
      // カスタムイベント'click'を発行
      this.$emit('click')
    }
  }
}
</script>
