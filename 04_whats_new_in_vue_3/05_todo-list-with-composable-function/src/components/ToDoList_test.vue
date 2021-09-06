<template>
  <h1>ToDo List ( {{ todoCount }}件)</h1>
  <input v-model="inputValue" placeholder="やることを追加" />
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
      <span v-if="todo.done">✓</span>
      {{ todo.text }}
      <button
        class="delete-item-btn"
        v-if="todo.done"
        v-on:click="deleteToDo(todo.id)"
      >
        Del
      </button>
    </li>
  </ul>
</template>
<script>
import { ref, reactive, computed } from "vue"
import { todoItemCount } from "./composables/todoItemCount.js"
import { useTextFilter } from "./composables/useTextFilter.js"

export default {
  setup() {
    // ToDoリスト初期値
    const todoItems = reactive([
      { id: 1, done: false, text: "Go out to sea" },
      { id: 2, done: false, text: "Invite the first member" }
    ])
    // ToDoリストの件数
    const todoCount = todoItemCount(todoItems)
    // ToDoの追加関連の定義
    const inputValue = ref("")
    const handleClick = () => {
      // 追加ToDo欄空のときは何もしない
      if (!inputValue.value) {
        return
      }
      const id = todoItems.length + 1
      todoItems.push({ id, done: false, text: inputValue.value })
      inputValue.value = ""
    }
    // Todoの削除
    const deleteToDo = (id) => {
      const delIndex = todoItems.findIndex((item) => {
        return item.id === id
      })
      if (delIndex > -1) {
        todoItems.splice(delIndex, 1)
      }
    }

    // ToDoリストの絞り込み関連の定義
    const { filterValue, filteredItems: filteredTodoItems } = useTextFilter(
      todoItems,
      (todo) => todo.text
    )
    /* これでは動作しない
    const { filterValue, filteredTodoItems } = useTextFilter(
      todoItems,
      (todo) => todo.text
    )
    */
    return {
      inputValue,
      filterValue,
      filteredTodoItems,
      handleClick,
      todoCount,
      deleteToDo
    }
  }
}
</script>

<style scoped>
.todo-item {
  display: flex;
}
.todo-item.done {
  /* 背景を緑色にする */
  background-color: #3fb983;
  color: #ffffff;
}
.delete-item-btn {
  border: 1px solid silver;
  margin: 0 10px;
  padding: 0;
  width: 100px;
}
</style>
