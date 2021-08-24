<template>
  <button v-on:click="show = !show">表示切替</button>
  <transition name="fade">
    <div v-if="show">Awesome Transition</div>
  </transition>
</template>
<script>
export default {
  data() { return { show: true } }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 500ms ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
