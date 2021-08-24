# はじめての Vue3+Leaflet

**Vue3** コンポーネントを使った超シンプルな地図表示 Web アプリを作ります。

## プロジェクトの作成

**vue-cli**(@vue/cli) を使いプロジェクトフォルダを作成します。

```shell
vue create vue3leaflet
```

最初の選択で矢印キーで**Vue 3**を選び、エンターキーを押します。

```
Default (Vue 3) ([Vue 3] babel, eslint)
```

しばらく待つとフォルダ vue3leaflet が作成されます。

次に **leaflet** を追加インストールします。（leaflet は公開用データに含めるためオプション"**--dev**"はつけない。）

```shell
cd vue3leaflet
yarn add leaflet
```

## プロジェクトフォルダ

プロジェクトフォルダの内訳はおおむね以下のようなものになります。

```
vue3leaflet
  > node_modules　// 各種モジュールフォルダ
  > public
    index.html
  src             // ソースコードフォルダ
    > assets
  components      // コンポーネントフォルダ
    HelloMap.vue
  App.vue
  main.js         // エントリーポイントファイル
  .gitignore
  babel.config.js
  package.json
  README.md
  yarn.lock
```

## ソースコードの確認と編集

**vue-cli** により作成されたひな型のソースコードを見てみます。
不要のものは削除し、必要なソースを編集してあります。

### main.js

エントリーポイントファイル**main.js** は **Vue2** のときとは変わっています。**createApp** 関数を **vue** からインポートしています。
**Vue2** のときより見た目はシンプルです。

```js
import { createApp } from "vue"
import App from "./App.vue"

createApp(App).mount("#app")
```

### App.vue

**App.vue** コンポーネントは、**components** プロパティ（オプション）を持つことも含め **Vue2** とまったく同じです。
つまり **Vue3** でも **Vue2**までの**Options API**記法も機能することがわかります。

```js
<template>
  <HelloMap />
</template>

<script>
import HelloMap from "./components/HelloMap.vue"
export default {
  name: "App",
  components: {
    HelloMap
  }
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
```

### HelloMap.vue

地図を表示するコンポーネント **HelloMap.vue** の`<script>`部分は、**Vue2** 版とはかなり異なります。
ここに **Vue3** で導入された**Composition API**の特徴がよく出ています。

```js
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
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(myMap)
    })
    onBeforeUnmount(() => {
      myMap.remove()
    })
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
```

**setup** 関数の中にほとんどの処理が記述されています。**Vue2** のライフサイクル・オプション **mounted** は **onMounted**関数に、**beforeDestroy** は **onBeforeUnmount**関数に置き換えられています。

また、**Vue2** ではよく見られたキーワード**this** が見あたりません。

ちなみに、**leaflet** から **map**, **tileLayer** を import して使用しているところが目新しい感じがしますが、実はこれは **Vue3** とは関係なく、**Vue2** 版でも同じように動きます。

## 開発サーバの起動とブラウザでの確認

現在開発しているマシンでローカル開発サーバを起動します。

```shell
yarn serve
```

エラーが表示されなかったら、プラウザで上記で指定された URL にアクセスします。

```url
http://localhost:8080
```

## 公開用データの作成

ブラウザ上での表示に問題なければ、ソースコードや表示用データを統合・圧縮してデプロイ用データを作成します。

```shell
yarn build
```

build に成功するとプロジェクトフォルダ内にフォルダ **dist** が作成されます。
このフォルダ内のデータを公開サーバにアップします。

以上
