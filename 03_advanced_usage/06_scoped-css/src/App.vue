<template>
  <MyComponent/>
  <OtherComponent/>
</template>
<script>
import MyComponent from "./components/MyComponent.vue"
import OtherComponent from "./components/OtherComponent.vue"

export default {
  name: "App",
  components: {
    MyComponent,
    OtherComponent
  }
}
</script>