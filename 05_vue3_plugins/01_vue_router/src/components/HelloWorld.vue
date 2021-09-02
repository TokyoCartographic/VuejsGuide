<script setup>
defineProps({
  msg: String
})
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="links">
    <router-link to="/geographer">Geographer</router-link>
    <router-link to="/standinglady">StandingLady</router-link>
  </div>
</template>

<style scoped>
h1 {
  color: blue;
}
</style>
