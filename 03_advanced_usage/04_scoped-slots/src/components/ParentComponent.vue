<template>
  <ChildComponent>
    <template v-slot:default="{ foo }">
      <p>{{ foo }}</p>
    </template>
    <!--
    <template #default="slotProps">
      <p>{{ slotProps.foo }}</p>
      <p>{{ slotProps.bar }}</p>
    </template>
    -->
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
