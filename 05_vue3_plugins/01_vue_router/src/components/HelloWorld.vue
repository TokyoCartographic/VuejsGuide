<script setup>
defineProps({
  msg: String
})
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="links">
    <router-link to="/geographer"
      ><span class="picname">Geographer</span></router-link
    >
    <router-link to="/standinglady"
      ><span class="picname">StandingLady</span></router-link
    >
  </div>
  <div id="picture_frame">
    <router-view></router-view>
  </div>
</template>

<style scoped>
h1 {
  color: blue;
}
.links {
  display: flex;
  justify-content: space-around;
}
.picname {
  font-size: 126%;
  color: crimson;
}
#picture_frame {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
