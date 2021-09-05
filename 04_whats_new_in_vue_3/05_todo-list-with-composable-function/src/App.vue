<template>
  <!-- ToDoListを使用する -->
  <ToDoList />
</template>
<script>
// ToDoList.vueをインポート
// import ToDoList from "./components/ToDoList.vue"
import ToDoList from "./components/ToDoList_test.vue"

export default {
  name: "App",
  components: {
    // ToDoListを<template>で使用できるようにする
    ToDoList
  }
}
</script>
