
<template>
  <button v-on:click="onCountUpClick">+1</button>
  Click Count: {{ state.count }}
</template>
<script>
// `reactive`については次項で紹介します
import { reactive } from 'vue'
export default {
  setup() {
    // リアクティブな状態を保持するstateを定義
    const state = reactive({
      // ボタンのClick回数を保持するcountを定義
      count: 0
    })
    // ボタンのClickでcountの値をカウントアップする
    const onCountUpClick = () => state.count++

    // <template>で使うプロパティ、関数を返す
    return {
      state,
      onCountUpClick
    }
  }
}
</script>
