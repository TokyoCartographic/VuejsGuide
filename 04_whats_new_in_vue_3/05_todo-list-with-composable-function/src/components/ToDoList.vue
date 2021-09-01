<template>
  <input v-model="inputValue" />
  <button v-on:click="handleClick">ToDoを追加</button>
  <input v-model="filterValue" placeholder="フィルタテキスト" />
  <ul>
    <li
      v-for="todo in filteredTodoItems"
      v-bind:key="todo.id"
      class="todo-item"
      v-bind:class="{ done: todo.done }"
      v-on:click="todo.done = !todo.done"
    >
      <span v-if="todo.done">✓</span> {{ todo.text }}
    </li>
  </ul>
</template>
<script>
import { ref, reactive } from "vue"
import { useTextFilter } from "./composables/useTextFilter.js"

export default {
  setup() {
    // ToDoリスト初期値
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
    const { filterValue, filteredItems: filteredTodoItems } = useTextFilter(
      todoItems,
      (todo) => todo.text
    )

    return {
      inputValue,
      filterValue,
      filteredTodoItems,
      handleClick
    }
  }
}
</script>

<style>
.todo-item.done {
  /* 背景を緑色にする */
  background-color: #3fb983;
  color: #ffffff;
}
</style>
