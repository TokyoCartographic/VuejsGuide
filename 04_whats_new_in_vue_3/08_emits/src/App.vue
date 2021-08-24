<template>
  <MyComponent
    v-on:notify="handleNotify"
    v-on:click="handleClick"
  />
</template>
<script>
import MyComponent from "./components/MyComponent.vue"

export default {
  name: "App",
  components: {
    MyComponent
  },
  methods:{
    handleNotify(data) {
      alert(`notifyが発行されました。データ「${data}」を受け取りました。`)
    },
    handleClick() {
      alert(`clickが発行されました。`)
    }
  }
}
</script>
