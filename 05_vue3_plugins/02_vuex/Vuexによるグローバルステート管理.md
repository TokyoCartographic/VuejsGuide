# Vuex によるグローバルステート管理

[**Vuex**](https://next.vuex.vuejs.org/ja/index.html)は、アプリーケーション内の複数のページにまたがって利用されるステート（データ）を集中的に管理するためのプラグインだ。データの流れを明確にカテゴリー分けして整合性を保証している。（**Facebook** の **Flux**, **Redux** のアイデアを Evan さんがパクった？いや参考にしたもの。）

**Vue3**対応の**Vuex**はバージョン 4 以降となる。

![vuex概念図](vuex.png)

## Vuex の主な要素

上の概念図の緑の点線に含まれるものが Vuex だが、そこに次のキーワードがある。また実際のコードでもそれらのキーワードをもとに構成される。

### State

State はアプリケーションが扱うデータであり、アプリケーションの状態を示す。

### Actions

Actions はコンポーネントから呼び出され、mutation を通じて state を更新する。
必要に応じて WebAPI などの非同期の処理も行う。

### Mutations

state の更新を行う。mutation はいっさい非同期の処理は行わない。

## インストール

**Vue-cli** で **Vuex** を選択した場合は、Vue のバージョンに合う Vuex がインストールされ、初期化データが格納される。**Vite** でプロジェクトを作成した場合は自分でインストールする。

npm の場合

```shell
npm install vuex@4 --save
```

yarn の場合

```shell
yarn add vuex@4
```

# ストアの作成

**Vue-cli** で開始した場合は以下のソース src/store/index.js が作成される。**Vite** で開始したときはまず以下のソースを作成する。

```js
import { createStore } from "vuex"

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
})
```

**Vue3** では、やはり vue から **createStore** 関数をインポートしてそれを使ってストアを作成している。
ストアオブジェクト初期化の引数の中に、Vuex の主要なキーワードをキーとするオブジェクトがあることが見てとれる。modules は、Vuex の各データを分割して格納するためのもの。

## Vuex の有効化

Vuex の有効化はやはりエントリーポイントファイルの **main.js** で行われる。

```js
import { createApp } from "vue"
import App from "./App.vue"
import store from "./store" // <--
createApp(App).use(store).mount("#app")
```

Vue のインスタンスは src/store/index.js から返されたインスタンスを取り込んでいる。

以上
