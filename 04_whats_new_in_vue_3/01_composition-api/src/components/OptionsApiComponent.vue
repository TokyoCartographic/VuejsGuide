<template>
  <button v-on:click="onCountUpClick">+1</button>
  Click Count: {{ state.count }}
</template>
<script>
export default {
  data() {
    return {
      //リアクティブな状態を保持するstateを定義
      state: {
        //ボタンのClick回数を保持するcountを定義
        count: 0
      }
    }
  },
  methods: {
    // ボタンのClickでcountの値をカウントアップする
    onCountUpClick() {
      this.state.count++
    }
  }
}
</script>
