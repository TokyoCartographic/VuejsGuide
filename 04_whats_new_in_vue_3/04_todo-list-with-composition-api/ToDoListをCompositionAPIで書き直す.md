# ToDoList を CompositionAPI で書き直す

Options API で書かれた ToDoList アプリケーションを Composition API を使って書き直す。Vue2 のものを Vue3 で書き直すわけではないので、変更は多岐にわたるということはなく、基本的に変更箇所は components/ToDoList.vue の`<script>`ブロックだけになる。`<template>`と`<style>`ブロックに変更はない。

`<script>`ブロック内の主な変更は、data, computed オプションからの Vue3 の Reactivity API への置き換えになる。

```js
<script>
import { ref, reactive, computed } from "vue"
export default {
  setup() {
    // 元となるToDoリスト
    const todoItems = reactive([
      { id: 1, done: false, text: "Go out to sea" },
      { id: 2, done: false, text: "Invite the first member" }
    ])

    // ToDoの追加関連の定義
    const inputValue = ref("")
    const handleClick = () => {
      const id = todoItems.length + 1
      todoItems.push({ id, done: false, text: inputValue.value })
      inputValue.value = ""
    }

    // ToDoリストの絞り込み関連の定義
    const filterValue = ref("")
    const filteredTodoItems = computed(() => {
      if (!filterValue.value) {
        return todoItems
      }
      return todoItems.filter((todo) => todo.text.includes(filterValue.value))
    })
    return {
      inputValue,
      filterValue,
      filteredTodoItems,
      handleClick
    }
  }
}
</script>
```

以上
