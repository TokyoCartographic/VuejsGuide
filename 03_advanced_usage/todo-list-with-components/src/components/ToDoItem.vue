<template>
  <li class="todo-item"
      v-bind:class="{'done': done}"
      v-on:click="handleClick">
    <span v-if="done">✓</span>
    <!-- {{text}}を<slot/>に置き換え -->
    <slot />
  </li>
</template>
<script>
export default {
  props: {
    // `text` Propは使用しないので削除する
    // text: { type: String },
    /** ToDoの完了ステータスを指定するProp */
    done: {
      // done は 真偽値 でなければなりません
      type: Boolean
    }
  },
  emits: ['toggle'], // 次章で説明します
  methods: {
    /** <li>のclickイベントを処理 */
    handleClick() {
      // カスタムイベント'toggle'を発行
      this.$emit('toggle')
    }
  }
}
</script>
