# Vue3 と TypeScript と leaflet

vue3leaflet のコードを使って Vue3 と TypeScript と leaflet の組み合わせを試みる。

Vue3 のプロジェクトを作成する。（vue-ts を選ぶ）

```shell
npm init vite vue3leaflet-ts
```

利用モジュールのインストール

```shell
cd vue3leaflet-ts
npm install
npm install leaflet --save
```

vue3leaflet の App.vue と components/HelloMap.vue をコピーする。`<script>`タグに`lang="ts"`属性はないまま。

VSCode で HelloMap.vue を見ると"AllowJs"を true にしなさいとワーニングが出ている。そこでプロジェクト直下の tsconfig.json に以下を追加する。

```json
"compilerOptions": {
    "allowJs": true
  },
```

index.html に以下の CSS を追加する。

```css
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
    }
  </style>
```

ワーニングは消えたので試しに開発サーバを立ち上げてみる。

```shell
yarn dev
```

エラーなく立ち上がり指定 URL（localhost:3000）にアクセスすると地図は表示された。

## TypeScript 化

HelloMap.vue の script ブロックを ts 化する。

```js
<script lang="ts">
import { defineComponent } from "vue"
import { map, tileLayer } from "leaflet"
import "leaflet/dist/leaflet.css"
import { onMounted, onBeforeUnmount } from "vue"

export default defineComponent({
  name: "HelloMap",
  setup() {
    let myMap = null

    onMounted(() => {
      myMap = map("map").setView([36.575, 135.984], 5)
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(myMap)
    })
    onBeforeUnmount(() => {
      myMap.remove()
    })
  }
})
</script>
```

vue から defineComponent 関数を import し実行し、export default するように記述する。
すると早速以下のエラーが出る。

```
モジュール'leaflet'の宣言ファイルがみつかりませんでした。
```

親切なことに以下を試してみたらというアドバイスまでしてくれる。

```shell
npm install --save-dev @types/leaflet
```

そのとおりに入力するとワーニングは消えた。別のところにワーニングが出ている。

```js
let myMap = null
```

```
変数 'myMap' は、型を決定できない一部の場所では、暗黙のうちに 'any' 型になります。
```

このまま放置して yarn dev してもエラーで落ちることはなかったが、とりあえず以下のようにしてワーニングを消す。

```js
let myMap: any = null
```

**any**は、任意の型なので何でも OK になるが、型を宣言した意味はなくなる（要調査）。ともかくこれで TypeScript 化はできたことになる。

以上
