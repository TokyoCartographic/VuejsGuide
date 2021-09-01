<template>
  Hello {{ helloTarget }} !!
  <div v-for="item in items" :key="item.id">
    <div>{{ item.data1 }}</div>
    <div>{{ item.data2 }}</div>
    <div>{{ item.data3 }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      helloTarget: "World",
      items: [
        { id: 1, data1: "dataOne", data2: "dataTwo", data3: "dataThree" },
        { id: 2, data1: "dataOne", data2: "dataTwo", data3: "dataThree" },
        { id: 3, data1: "dataOne", data2: "dataTwo", data3: "dataThree" }
      ]
    }
  }
}
</script>
