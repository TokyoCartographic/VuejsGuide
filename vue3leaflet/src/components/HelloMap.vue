<template>
  <div id="map"></div>
</template>

<script>
import { map, tileLayer } from "leaflet"
import "leaflet/dist/leaflet.css"
import { onMounted, onBeforeUnmount } from "vue"

export default {
  name: "HelloMap",
  setup() {
    let myMap = null

    onMounted(() => {
      myMap = map("map").setView([36.575, 135.984], 5)
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(myMap)
      // console.log("myMap:", myMap)
      // console.log(myMap.getCenter())
    })
    onBeforeUnmount(() => {
      myMap.remove()
    })
  },
}
</script>

<style scoped>
#map {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}
</style>
