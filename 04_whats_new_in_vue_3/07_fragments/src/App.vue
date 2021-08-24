<template>
  &lt;MyRow /&gt;<br>
  <table>
    <tbody>
      <tr><MyRow /></tr>
    </tbody>
  </table>
  <hr>
  &lt;MyMessage /&gt;<br>
  <MyMessage/>
</template>
<script>
import MyRow from "./components/MyRow.vue"
import MyMessage from "./components/MyMessage.vue"

export default {
  name: "App",
  components: {
    MyRow,
    MyMessage
  }
}
</script>
