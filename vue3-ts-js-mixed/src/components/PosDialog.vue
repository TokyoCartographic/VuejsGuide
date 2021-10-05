<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "PosDialog",
  props: {
    lonLat: {
      type: String,
      default: "Hello Dialog"
    }
  }
})
</script>

<template>
  <teleport to="body">
    <dialog id="dialog" open>{{ lonLat }}</dialog>
  </teleport>
</template>

<style scoped>
#dialog {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  width: 260px;
  height: 46px;
  background-color: rgba(224, 255, 255, 0.8);
  z-index: 1000;
}
</style>
