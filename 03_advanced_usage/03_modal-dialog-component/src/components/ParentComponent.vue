<template>
  <ModalDialog>
    <template v-slot:title>
      <span style="color: red;">タイトル（赤）</span>
    </template>

    <p>1. ダイアログの内容</p>
    <p>2. ダイアログの内容</p>
  </ModalDialog>
</template>
<script>
import ModalDialog from "./ModalDialog.vue"
export default {
  components: {
    ModalDialog
  }
}
</script>