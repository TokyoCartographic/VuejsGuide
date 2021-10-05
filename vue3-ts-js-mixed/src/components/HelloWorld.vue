<script>
import { map, tileLayer } from "leaflet"
import "leaflet/dist/leaflet.css"
import { ref, onMounted, watch } from "vue"
import PosDialog from "./PosDialog.vue"

export default {
  name: "HelloWorld",
  components: {
    PosDialog
  },
  setup() {
    const isDialogOpen = ref(false)
    const lonLat = ref("")
    onMounted(() => {
      const myMap = map("map").setView([36.575, 135.984], 5)
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(myMap)
      myMap.on("click", (e) => {
        lonLat.value = e.latlng.lng + " " + e.latlng.lat
        isDialogOpen.value = !isDialogOpen.value
      })
    })
    return {
      isDialogOpen,
      lonLat
    }
  }
}
</script>

<template>
  <div id="map"></div>
  <PosDialog :lonLat="lonLat" v-if="isDialogOpen" />
</template>

<style scoped>
#map {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}
</style>
