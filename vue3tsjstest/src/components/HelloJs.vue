<template>
  <teleport to="body">
    <div class="dialog">
      <p>{{ message }}</p>
      <p>{{ today }}</p>
    </div>
  </teleport>
</template>

<script>
import { ref } from "vue"
import { getYMD } from "../libs/getYMD.js"
export default {
  setup() {
    const message = ref("Hello JavaScript")
    const today = getYMD()
    return {
      message,
      today
    }
  }
}
</script>

<style scoped>
.dialog {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 266px;
  height: 60px;
  border: 2px solid silver;
  border-radius: 5px;
  background-color: azure;
  display: flex;
  justify-content: center;
  align-items: center;
}
p {
  color: rgb(2, 2, 151);
  font-weight: bold;
  margin: 0 6px;
}
</style>
