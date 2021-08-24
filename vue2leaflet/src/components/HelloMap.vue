<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default {
  name: "HelloMap",
  data() {
    return {
      myMap: null
    }
  },
  mounted() {
    this.myMap = L.map("map").setView([36.575, 135.984], 5)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.myMap)
  },
  beforeDestroy() {
    this.myMap.remove()
  }
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
