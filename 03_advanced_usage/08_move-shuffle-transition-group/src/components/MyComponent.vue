<template>
  <button v-on:click="shuffle">シャッフル</button>
  <transition-group name="fliplist">
    <div v-for="e in list" v-bind:key="e">
      {{ e }}
    </div>
  </transition-group>
</template>
<script>
export default {
  data() { return { list: [1, 2, 3, 4, 5] } },
  methods: {
    shuffle() {
      // リストをシャッフル
      const list = this.list
      for (let i = list.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * (i + 1))
        ;([list[k], list[i]] = [list[i], list[k]])
      }
    }
  }
}
</script>
<style>
.fliplist-move {
  transition: transform 1s;
}
</style>
