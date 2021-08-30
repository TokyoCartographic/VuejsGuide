# TodoList コンポーネント分離版

02_basic_usage で紹介した todo-list アプリケーションは、メインのコンポーネントはひとつだけだったがそれぞれの目的に応じた２つのコンポーネントに分離する。

- ToDoItem 個別の ToDo
- ToDoList ToDo のリスト

## ToDoItem.vue

最初の版では、ToDo のリストは ToDoList 内の\<ul>タグ内で\<li>をループして表示していたが、それを ToDoItem.vue に分離している。

```js
<template>
  <li class="todo-item"
      v-bind:class="{'done': done}"
      v-on:click="handleClick">
    <span v-if="done">✓</span>
    <slot />
  </li>
</template>
<script>
export default {
  props: {
    done: {
      type: Boolean
    }
  },
  emits: ['toggle'], // 次章で説明します
  methods: {
    handleClick() {
      this.$emit('toggle')
    }
  }
}
</script>
```

このコンポーネントでの注目点は、ToDo のテキストは`<slot />`で親からもらっていることだ。

## ToDoList.vue の`<template>` （更新版）

```js
<template>
  <input v-model="inputValue">
  <button v-on:click="handleClick">
    ToDoを追加
  </button>
  <input
    v-model="filterValue"
    placeholder="フィルタテキスト">
  <ul>
    <ToDoItem
      v-for="todo in filteredTodoItems"
      v-bind:key="todo.id"
      v-bind:done="todo.done"
      v-on:toggle="todo.done = !todo.done">
      <b>{{ todo.text }}</b>
    </ToDoItem>
  </ul>
</template>
```

分離した ToDoItem を import し、filteredTodoItems の数だけループして表示している。
\<ToDoItem>タグで囲われている\<b>{{ todo.text }}\</b>が子コンポーネントの\<slot>で表示される。

この例では２つのコンポーネントに分離しているが、さらに分離することも可能だ。どこまで分離するのが適当かは、アプリケーション全体との関係で判断する必要がある。

以上
