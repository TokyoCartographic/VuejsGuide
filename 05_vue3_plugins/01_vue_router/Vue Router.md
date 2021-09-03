# Vue Router

SPA(Single Page Application)では、URL に応じて表示するコンポーネントを切り替えるルーティングと呼ばれる機能がほぼ必須になる。Vue では [Vue Router](https://next.router.vuejs.org) がその公式のプラグインだ。

Vue3 に対応している Vue Router は、バージョン 4 以上のものなので、ネットを調べるときはバージョンに注意する。

## インストール

**Vue-cli** で vue-router を選択すれば、Vue Router はインストールされ、初期設定ファイルも作成される。

**Vite** を使った場合は、Vue3 対応の vue-router(V.4 以上) を自分でインストールする必要がある。

npm の場合

```shell
npm install vue-router@4
```

yarn の場合

```shell
yarn add vue-router@4
```

## URL とコンポーネントのマッピング

src フォルダの router フォルダ内の ルート定義 index.js に URL とコンポーネントの設定を記述する。（Vite で開始したときは src/router フォルダも index.js も存在しないので作成する）
ルート定義の書き方も Vue2 のときとすこし変更されている。

```js
import { createRouter, createWebHistory } from "vue-router"

import Geographer from "../components/views/Geographer.vue"
import StandingLady from "../components/views/StandingLady.vue"

const routes = [
  {
    path: "/geographer",
    name: "geographer",
    component: Geographer
  },
  {
    path: "/standinglady",
    name: "standinglady",
    component: StandingLady
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

"vue-router"から createRouter と createWebHistory 関数をインポートして使用する。

## Vue Router の有効化

ルート定義は、main.js で読み込み有効化する。

```js
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router" // <--ここに注目

createApp(App).use(router).mount("#app")
```

`import router from "./router"`は、先に作成した router/index.js がエクスポートしたオブジェクトをインポートすることを意味する。また最後の１行は以下３行と同じ意味だ。

```js
const app = createApp(App)
app.use(router)
app.mount("#app")
```

## ルーティング

```js
<template>
  <h1>{{ msg }}</h1>
  <div class="links">
    <router-link to="/geographer">
      <span class="picname">Geographer</span>
    </router-link>
    <router-link to="/standinglady">
      <span class="picname">StandingLady</span>
    </router-link>
  </div>
  <div id="picture_frame">
    <router-view></router-view>
  </div>
</template>
```

`<template>`内でのルートの変更には`<router-link>`コンポーネントを使う。
`<router-link>`の`to`属性でルート先を設定し、クリックされたら遷移する。ルート先はルート定義（router/index.js）の path プロパティで設定したものを使う。

遷移先のコンポーネントは`<router-view>`コンポーネントのところに表示される。

## 表示コンポーネント

サンプルで切り替えて表示しているコンポーネントは`<template>`のみの非常に単純なものだ。

```js
<template>
  <figure>
    <img src="/pictures/geographer.jpg" />
    <figcaption>Geographer</figcaption>
  </figure>
</template>
```

`<figure>`は画像とキャプションを表示するための HTML5 の要素。

## その他

ルーティングは Vue2 のときと同様プログラムからも行うことができる。Vue2 のときは以下のオブジェクトを利用した。

- this.$route
- this.$router

Vue3 では"vue"から useRoute と useRouter 関数をインポートして使用する。useRoute は this.$routeに、useRouterはthis.$router にそれぞれ対応している。

```js
<template>
  <router-view></router-view>
  <button v-on:click="returnHome">Home</button>
</template>

<script>
import { useRoute, useRouter } from "vue-router"

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    const returnHome = () => {
      console.log(route.path) // 現在のpathを表示
      router.push("/") // ルートに移動
    }

    return {
      returnHome
    }
  }
}
</script>
```

以上
