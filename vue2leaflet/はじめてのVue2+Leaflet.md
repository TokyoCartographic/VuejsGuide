# はじめての Vue2+Leaflet

Vue2 コンポーネントを使った超シンプルな地図表示 Web アプリを作ります。
従来の伝統的手法ではたったひとつの html ファイルで実現できる内容ですが、ものがたりはここから始まります。

## プロジェクトの作成

まず@vue/cli を使いプロジェクトフォルダを作成します。

```shell
vue create vue2leaflet
```

最初の選択で**Vue 2**を選びます。

```
Default ([Vue 2] babel, eslint)
```

しばらく待つとフォルダ vue2leaflet が作成されます。

次に **leaflet** を追加インストールします。（leaflet は公開用データに含めるためオプション"**--dev**"はつけない。）

```shell
cd vue3leaflet
yarn add leaflet
```

## プロジェクトフォルダ

プロジェクトフォルダの内訳はおおむね以下のようなものです。

```
vue2leaflet
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

このプロジェクトフォルダを **Visual Studio Code** で開く（あるいはドラッグ＆ドロップ）して、編集を開始します。

## ソースコードの確認と編集

**vue-cli** により作成されたひな型のソースコードをちょっと見てから、不要なものを削除し、ソースコードに必要な編集を加えます。

### main.js

この Web アプリで最初に読み込まれ実行される **main.js** は **Vue2** を使ったときの典型的な内容です。

```js
import Vue from "vue"
import App from "./App.vue"

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount("#app")
```

**App.vue** コンポーネントを描画する設定をした Vue のオブジェクトを作成し、それを **index.html** 内の以下の要素にマウントしています。ここでは**main.js**は変更の必要はありません。

```html
<div id="app"></div>
```

### App.vue

**App.vue** コンポーネントは、HelloMap コンポーネントを読み込み表示しています。

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

ひな型として作成された**App.vue**を上記のように変更します。このようにひとつのソースファイルに`<template>`、`<script>`、`<style>`などを記述し、拡張子を`.vue`としたものが**シングルファイルコンポーネント**（**S**ingle **F**ile **C**omponent）と呼ばれ、Vue のプログラムのメインの構成要素となります。

### HelloMap.vue

地図を表示するコンポーネント HelloMap.vue を新規に作成します。**Vue2** ではコンポーネント内のプログラム部分は **Options API** と呼ばれる形式に則って作成します。

```js
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
```

**Vue2** では、**data**, **mounted**, **beforeDestroy**, **methods** などの機能ごとのプロパティ（オプション）に分類された場所に対応するデータや処理が記述されます（そのため**Options API**と呼ばれる）。プロパティ（オプション）は、このサンプルにあるものだけでなく多くの種類があります。それらの使い方を覚えるのが Vue 習得の第一歩になります。

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
このフォルダ内のデータを公開用サーバにアップします。

以上
