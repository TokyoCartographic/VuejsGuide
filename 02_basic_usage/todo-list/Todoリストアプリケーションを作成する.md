# Todo リストアプリケーションを作成する

簡単な Todo アプリケーションを Vue3 を使って作成する。作成する Web アプリケーションの形式は **SPA**（**S**ingle **P**age **A**pplication）で、複数のコンポーネントから構成される。

（\* 以下の記述は新規にプロジェクトフォルダから作成するときのものになっているので、追試するときはこのフォルダ以外のところで実行すること。）

## 機能

- Todo をリスト表示する
- Todo を追加できる
- Todo を完了にさせる
- Todo をフィルタリング表示できる

この Web アプリでは Vue3 の新機能はほとんど使っていない。Vue2 のときからあった機能で実現する。ただしすべて Vue2 とまったく同じ記述法では Vue3 では動作しないものがあるので注意が必要だ。それを以下で順番に見てゆく。

## プロジェクトの作成

**Vue-cli** でもよいが、Vue3 を使う前提なので **Vite** を使ってプロジェクトを作成してみる。

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

インストールが終われば、アプリケーションのひな型が準備されるので開発サーバを起動してみる。

```shell
yarn dev
```

開発サーバが立ち上がれば指定された `url:ポート番号`にアクセスするとひな形の Web アプリーションが立ち上がる。

```
localhost:3000
```

この時点でのプロジェクトフォルダの構成と内容は以下のようなものになる。

```
node_modules   // 各種モジュール・ライブラリフォルダ
src            // ソースフォルダ
    components // 各種コンポーネントフォルダ
        HelloWorld.vue // サンプルVueコンポーネント
    App.vue    // 最初に表示されるコンポーネント
    main.js    // エントリーポイント（最初に実行されるプログラム）
.gitignore     // GitHubにアップしないもの
index.html     // 公開用index.htmlの元になるhtmlファイル
package.json   // インストールされたモジュールのリストほか
vite.config.js // viteの設定ファイル
yarn.lock      // インストールされたモジュールバージョンやその依存モジュールも含む詳細リスト
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

最初に読み込まれるコンポーネント App.vue は、Vue2 と基本的に同じ **SFC**だが、一部異なるところがある。SFC (**S**ingle **F**ile **C**omponent) とは、Vue 独自のコンポーネントの形式で、`<template>`、`<script>`、`<style>`の部分（ブロック）を１つのファイルに格納し、拡張子を"**.vue**"としたもの。

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

`<script>`部分がなぜか先頭に来ていて、`<script setup>`になっている。これは Vue3 の新機能である setup 関数の記述を省略する簡易記法だ。通常の記法では以下のようになる。setup 関数から return された値や関数が template 内で参照可能になる。`<script setup>`記法のときは当然ながら`return`も不要になるようだ。

```js
<script>
  import HelloWorld from './components/HelloWorld.vue'
  export default {
    components: { HelloWorld },
    setup() {
      // 何らかの処理
      return {
        何らかのプロパティや関数
      }
    }
  }
</script>
```

あと**Vite**のときはコンポーネントやライブラリのインポートのとき以下の記述法では動作しない。（`@/`が`./src/`を指すという設定が Vite の設定にないため。）

```js
import HelloWorld from "@/components/HelloWorld.vue"
```

## HelloWorld.vue

実際の画面に表示されるコンポーネントのソースコードはすこし長いので一部省略して例示する。ちなみに表示画面では開発環境**VSCode**とプラグイン**Volar**が推奨されている。

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

`<script>`ブロックは、こちらも setup 属性を追加したシンタックスシュガー記法になっている。この内側は Vue3 の**Composition API**に則って書かれている。
まず**vue**からプリミティブ値（文字列、数値、真偽値など）をリアクティブ化する関数**ref**が import され、プロパティ count が 0 で初期化されている。
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

`<template>`ブロックでは、親コンポーネントから**props**経由で受け取ったメッセージ文字列**msg**を**Mustache 記法**で表示している。またボタンが押されるたびにリアクティブなプロパティ**count**の値が増えると同時にその値をボタン上に表示する記述がある。一見したところ、この`<template>`は Vue2 のものと変わらないように見えるが、実は template 要素の直下に複数の要素が並列にあるこの記述法は**Vue2**ではエラーになる。**Vue3**の**Fragments**機能によりはじめてサポートされた。

`<style>`ブロックは、`scoped`属性が追加されいる。これにより設定された CSS のセレクタの有効範囲はこのコンポーネント内に限定される。Vue3 では scoped CSS の仕様の更新があったようだ。（これは未調査：）

## ソースの編集

Todo リストの機能を実現するためのコンポーネントを作成する。
変更対象となるソースは以下のもの。

- main.js
- App.vue

新規に作成および追加するソースは以下のものとなる。

- components/ToDoList.vue
- index.css (https://github.com/necolas/normalize.css)

削除するソース

- HelloWorld.vue

## main.js (new)

アプリ全体にシンプルな汎用 CSS を適用する。normalize.css を index.css にリネームして追加。

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

import したコンポーネントを`<template>`内で使えるように、プロパティ（オプション）**components**内に格納する。でも setup シンタックスシュガー記法を使えば極端に短く書くことができそう。

```vue
<script setup>
import ToDoList from "./components/ToDoList.vue"
</script>
```

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

`<template>`内には、４つの主要 HTML 要素（**input**, **button**, **input**, **ul**）がある。それらに正規の HTML には存在しない属性（**v-model**, **v-on**, **v-for**, **v-bind**, **v-if**）が追加されている。それらは Vue 独自のもので「**ディレクティブ**」と呼ばれる。つまり`<template>`は純粋の HTML ではなく、さまざまな処理を行うための Vue のソースコードなのだ。

- **v-model** data オプションのプロパティと双方向に同期させる
- **v-on** イベントハンドラーを追加する（簡易記法： `@click=`）
- **v-for** template の反復表示を行う
- **v-bind** 属性値をバインドする（簡易記法： `:key=`）
- **v-if** 条件の真偽値により表示・非表示を切り替える

### \<script>ブロックの説明

`export default {}`オブジェクト内のプロパティ**data**, **computed**, **methods**は、**Vue**では「**オプション**」と呼ばれ、それぞれの定められた目的に応じたプロパティやメソッドが格納される。

- **data** コンポーネントのプロパティとしてリアクティブ性をもち`<template>`内で使用できる
- **computed** 算出プロパティと呼ばれ、計算結果やフィルタ結果を return する
- **methods** コンポーネント内で利用する各種メソッドを格納

このソースには出現しなかったが、Vue オブジェクトの初期化から破棄までの各時点ごとの**ライフサイクルもライフサイクルフックオプション**として規定されいて、重要な役割を持っている。よく使われるもに以下のようなものがある。それらの時点に必要な処理コードをオプション内に追加する。

- **created** Vue インスタンスが初期化されたとき
- **mounted** Vue インスタンスがマウントされたとき（DOM が構築されたとき）
- **beforeDestroy** Vue インスタンスが破棄される直前

### \<style>ブロックの説明

`<template>`で ToDo アイテム項目がクリックされたら、動的に class="done"が追加される。そのときアイテムの背景色を緑色に変更するための設定。これは、ほばすべてのブラウザが CSS が変わったらすぐに再レンダリングを開始する機能を持つことを利用するテクニックでよく使われる。

## テスト

本番開発においては、プログラムの実装前または実装中または実装後にテストプログラムを作成し関数・コンポーネントが期待する動作・結果になるかを確認する。

## 開発サーバによる確認

上記のソースが完成したら、最初のひな型のときと同様に開発サーバを立ち上げて表示・動作を確認する。

```shell
yarn dev
```

サーバの立ち上げのときにエラーが出れば、エラー内容を確認しソースコードを修正する。

## 公開用データの作成

表示・動作の確認が終わったら公開用データを作成する。この処理の途中でエラーがでたらソースコードに戻り修正を加える。

```shell
yarn build
```

**build** 処理が正常に終われば、プロジェクトフォルダ直下に **dist** フォルダが作成され、その下に公開用データが格納される。

Todo リストの公開用データ：

```shell
_assets/index.33e876dd.js
_assets/style.e418f0e1.css
favicon.ico
index.html
```

作成されたデータを見てみると、その多くは圧縮（ミニファイ）されている。その目的は Web サーバからのダウンロード時間をできるだけ短縮することだが、またソースコードを覗き見られるのを防ぐこともある。Web の牧歌的時代では、HTML, CSS, JavaScript がすべて丸見えだった。

ただし、難読化はされているとはいえ、最終的に出力されたものは、html と css と JavaScript である。なぜなら Web ブラウザがレンダリングできるものは 30 年前も現在も基本的には変わっていないからだ。

それらのすべてをまとめて公開用 Web サーバにアップロードする。

以上
