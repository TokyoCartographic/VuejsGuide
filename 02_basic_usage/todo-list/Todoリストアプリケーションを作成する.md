# Todo リストアプリケーションを作成する

Vue3 を使って簡単な Todo アプリケーションを作成する。

（\* 以下の記述は新規にプロジェクトフォルダから作成するときのものになっている。このフォルダで以下を実行してはいけない。）

## 機能

- Todo をリスト表示する
- Todo を追加できる
- Todo を完了にさせる
- Todo をフィルタリング表示できる

この Web アプリでは Vue3 の新機能は使っていない。Vue2 のときからあった機能で実現する。ただしすべて Vue2 とまったく同じ記述では Vue3 では動作しないので要注意。それを以下でみてゆく。

## プロジェクトの作成

vue-cli でもよいが、Vue3 を使う前提なので Vite を使ってプロジェクトを作成する。

```shell
npm init vite
```

`Ok to proceed? (y)`でエンターキーを押すとプロジェクト名の入力が促される。
その後どのフレームワークを使うかの選択画面になる。

```
    vanilla
>   vue
    react
    preact
    lit-element
    svelte
```

矢印キーを押し**vue**を選びエンターすると今度は js 版か TypeScript 版かの選択が表示される。

```
>   vue
    vue-ts
```

今回は JavaScript を使うので vue のところでエンターを押すとすぐにプロジェクトフォルダが作成される。作成されたフォルダに移動し必要なモジュールをインストールする。

```shell
cd todo-list
yarn
```

インストールが終われば、開発サーバを起動してみる。

```shell
yarn dev
```

開発サーバが立ち上がれば指定された `url:ポート`にアクセスしてみるとひな形の Web アプリが立ち上がる。

```
localhost:3000
```

この時点でのプロジェクトフォルダの内容は以下のようなものになる。

```
node_modules   // 各種モジュール・ライブラリフォルダ
src            // ソースフォルダ
    components // 各種コンポーネントフォルダ
        HelloWorld.vue // サンプルVueコンポーネント
    App.vue    // 最初に表示されるコンポーネント
    main.js    // 最初に実行されるプログラム
.gitignore     // GitHubにアップしないもの
index.html     // 公開用index.htmlの元になるhtmlファイル
package.json   // インストールされたモジュールのリストほか
yarn.lock      // インストールされたモジュールの依存モジュールも含む詳細リスト
```

## プログラム・コンポーネントの確認

まずひな型として作成された Vue3 プログラムとコンポーネントの内容を見てみる。

### main.js

最初に実行される main.js は Vue3 の基本的なものになっている（Vue2 とは異なる）。

```js
import { createApp } from "vue"
import App from "./App.vue"
createApp(App).mount("#app")
```

### App.vue

最初に読み込まれるコンポーネント App.vue は、Vue2 と基本的に同じ **SFC**(Single File Component)だが、一部異なるところがある。

```js
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

`<script>`部分がなぜか先頭に来ていて、`<script setup>`になっている。これは Vue3 の新機能である setup 関数の記述を省略する簡易記法だ。通常は以下のようになる。setup 関数から return された値や関数が template 内で参照可能になる。`<script setup>`記法のときは当然ながら`return`も不要になる。

```js
<script>
  import HelloWorld from './components/HelloWorld.vue'
  export default {
    setup() {
      // 何らかの処理
      return {
        何らかのプロパティや関数
      }
    }
  }
</script>
```

あと**vite**のときはコンポーネントやライブラリのインポートのとき以下の記述法は動作しない。

```js
import HelloWorld from "@/components/HelloWorld.vue"
```

## HelloWorld.vue

実際の画面に表示されるコンポーネントは、すこし長いので一部省略して例示する。ちなみに表示画面で開発環境**VSCode**とプラグイン**Volar**が推奨されている。

```js
<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>
  <button type="button" @click="count++">count is: {{ count }}</button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
```

`<script>`部は、setup シンタックスシュガー記法になっている。この内側は Vue3 の**Composition API**に則って書かれている。
まず**vue**からプリミティブ値（文字列、数値）をリアクティブ化する関数**ref**が import され、プロパティ count が 0 で初期化されている。
親コンポーネントから引数で渡された文字列変数 **msg** を**defineProps**関数で登録している（defineProps は`<script setup>`のときは import なして使えるようだ）。ちなみに通常の記述法では以下のようになる。

```js
<script>
import { ref } from 'vue'
export default {
  props: {
    msg: {
      type: String
    }
  },
  setup() {
    const count = ref(0)
    return {
      count
    }
  }
}
</script>
```

`<template>`部では、親コンポーネントから**props**経由で受け取ったメッセージ文字列**msg**を**Mustache 記法**で表示している。またボタンが押されるたびにリアクティブなプロパティ**count**の値が増えると同時にその値をボタン上に表示する記述がある。一見したところ、この`<template>`は Vue2 のものと変わらないように見えるが、実は template 要素の直下に複数の要素が並列にあるこの記述法は**Vue2**ではエラーになる。**Vue3**の**Fragments**機能によりはじめてサポートされた。

`<style>`部は、`scoped`属性が追加されいる。これにより設定された CSS のセレクタの有効範囲はこのコンポーネント内に限定される。Vue3 では scoped CSS の仕様の更新があったようだ。（これは未調査：）

## ソースの編集

Todo リストの機能を実現するためのコンポーネントを作成する。
変更するソースは以下のもの。

- main.js
- App.vue

新規に作成および追加するソースは以下のものとなる。

- components/ToDoList.vue
- index.css (https://github.com/necolas/normalize.css)

削除するソース

- HelloWorld.vue

## main.js (new)

全体的にシンプルな汎用 CSS を適用する。normalize.css を index.css にリネームして追加。

```js
import { createApp } from "vue"
import App from "./App.vue"
import "./index.css"
createApp(App).mount("#app")
```

## App.vue (new)

新規に作成する components/ToDoList.vue を読み込むように変更。

```js
<template>
  <ToDoList />
</template>

<script>
import ToDoList from './components/ToDoList.vue'
export default {
  name: 'App',
  components: {
    ToDoList
  }
}
</script>
```

import したコンポーネントを`<template>`内で使えるように、プロパティ（オプション）**components**内に格納する。

## ToDoList.vue

本 Web アプリのメインの機能を実現するコンポーネント ToDoList.vue を追加する。

```js
<template>
  <input v-model="inputValue" />
  <button v-on:click="handleClick">ToDoを追加</button>
  <input v-model="filterValue" placeholder="フィルタテキスト" />
  <ul>
    <li
      v-for="todo in filteredTodoItems"
      v-bind:key="todo.id"
      class="todo-item"
      v-bind:class="{ done: todo.done }"
      v-on:click="todo.done = !todo.done"
    >
      <span v-if="todo.done">✓</span> {{ todo.text }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      todoItems: [
        {
          id: 1,
          done: false,
          text: "Go out to sea"
        },
        {
          id: 2,
          done: false,
          text: "Invite the first member"
        }
      ],
      filterValue: ""
    }
  },
  computed: {
    filteredTodoItems() {
      if (!this.filterValue) {
        return this.todoItems
      }
      return this.todoItems.filter((todo) => {
        return todo.text.includes(this.filterValue)
      })
    }
  },
  methods: {
    handleClick() {
      this.todoItems.push({
        id: this.todoItems.length + 1,
        done: false,
        text: this.inputValue
      })
      this.inputValue = ""
    }
  }
}
</script>

<style>
.todo-item.done {
  /* 背景を緑色にする */
  background-color: #3fb983;
  color: #ffffff;
}
</style>
```

### \<template>ブロックの説明

`<template>`内には、４つの主要 HTML 要素（**input**, **button**, **input**, **ul**）がある。それらに正規の HTML には存在しない属性（**v-model**, **v-on**, **v-for**, **v-bind**, **v-if**）が追加されている。それらは Vue 独自のもので**ディレクティブ**と呼ばれる。つまり`<template>`は純粋の HTML ではなく、さまざまな処理を行うための Vue のソースコードなのだ。

- **v-model** **data**オプションのプロパティと双方向に同期させる
- **v-on** イベントハンドラーの追加
- **v-for** template の反復表示
- **v-bind** 属性値のバインド
- **v-if** 条件の真偽値により表示・非表示を切り替える

### \<script>ブロックの説明

`export default {}`オブジェクト内のプロパティ**data**, **computed**, **methods**は、**Vue**では**オプション**と呼ばれ、それぞれの定められた目的に応じたプロパティ、メソッドが格納される。

- **data** コンポーネントのプロパティとしてリアクティブ性をもち`<template>`内で使用できる
- **computed** 算出プロパティと呼ばれ、計算結果やフィルタ結果を return する
- **methods** コンポーネント内で利用する各種メソッドを格納

このソースには出現しなかったが、Vue オブジェクトの初期化から破棄までの各時点ごとの**ライフサイクルもライフサイクルフックオプション**として規定されいて、重要な役割を持っている。よく使われるもに以下のようなものがある。

- **created** Vue インスタンスが初期化されたとき
- **mounted** Vue インスタンスがマウントされたとき（DOM が構築されたとき）
- **beforeDestroy** Vue インスタンスが破棄される直前

### \<style>ブロックの説明

ToDo アイテム項目がクリックされたら、動的に class="done"が追加される。そのときアイテムの背景色を緑色に変更するための設定。ブラウザは CSS が変わったらすぐに再レンダリングすることを利用している。

以上
