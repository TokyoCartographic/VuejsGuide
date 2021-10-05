# TypeScript と JavaScript のコンポーネントを混ぜて使う

TypeScript ベースのプロジェクトで JavaScript の SFC（単一ファイルコンポーネント）を使ってみる。

まずは tsconfig.json で以下の設定を追加する。

```json
  "compilerOptions": {
    "allowJs": true
  },
```

## TypeScript のコンポーネント

App.vue と PosDialog.vue は TypeScript ベースになっている。

### App.vue

```js
<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue"
</script>

<template>
  <HelloWorld />
</template>
```

### PosDialog.vue

```js
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
```

## JavaScript のコンポーネント

HelloWorld.vue は JavaScript ベースになっている。このコンポーネントでは上記の TypeScript ベースのコンポーネント PosDialog を import し表示している。

### HelloWorld.vue

```js
<script>
import { map, tileLayer } from "leaflet"
import "leaflet/dist/leaflet.css"
import { ref, onMounted } from "vue"
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
```

このコンポーネントは外部ライブラリ leaflet を使っている。ところが、このコンポーネントは JavaScript ベースなので leaflet の定義がないというエラーが発生しない。

以上
