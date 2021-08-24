<template>
  <input v-model="inputValue">
  <button v-on:click="handleClick">
    ToDoを追加
  </button>
  <input
    v-model="filterValue"
    placeholder="フィルタテキスト">
  <ul>
    <li
      v-for="todo in filteredTodoItems"
      v-bind:key="todo.id"
      class="todo-item"
      v-bind:class="{'done': todo.done}"
      v-on:click="todo.done = !todo.done">
      <span v-if="todo.done">✓</span> {{ todo.text }}
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      inputValue: '',
      todoItems: [
        {
          id: 1,
          done: false,
          text: 'Go out to sea'
        },
        {
          id: 2,
          done: false,
          text: 'Invite the first member'
        }
      ],
      filterValue: '',
    }
  },
  computed: {
    filteredTodoItems() {
      if (!this.filterValue) {
        return this.todoItems
      }
      return this.todoItems.filter((todo) => {
        return todo.text.includes(this.filterValue)
      })
    }
  },
  methods: {
    handleClick() {
      this.todoItems.push({
        id: this.todoItems.length + 1,
        done: false,
        text: this.inputValue
      })
      this.inputValue = ''
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
