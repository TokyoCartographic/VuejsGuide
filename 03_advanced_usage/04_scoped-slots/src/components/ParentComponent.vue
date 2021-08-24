<template>
  <ChildComponent>
    <template v-slot:default="{ foo }">
      <p> {{ foo }} </p>
    </template>
  </ChildComponent>
</template>
<script>
import ChildComponent from "./ChildComponent.vue"
export default {
  components: {
    ChildComponent
  }
}
</script>