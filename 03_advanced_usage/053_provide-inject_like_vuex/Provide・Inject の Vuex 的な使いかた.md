# Provide/Inject の Vuex 的な使いかた

provide/inject を利用すると親子関係にあるコンポーネント間のデータ共有が可能だ。ということは、アプリ全体を包括する App コンポーネントで provide すれば、アプリ全体の（グローバルな）コンポーネントでデータ・情報の共有が可能ということになる。Vue にはすでにグローバルに状態を共有するプラグイン vuex が存在する。Vue3 から本格的に利用可能となった provide/inject を使えば vuex と同等のことができる。

052 で紹介したテスト用アプリを改造して確認してみよう。

## 初期化モジュール

初期化モジュール store.js はふたつの関数をもつ。

- initStore

  カウンター値 count 初期化し、その算出 ref オブジェクトと、その値を更新する関数を provide する。

- useStore

  上記の initStore で provide されたものを inject した値をもつオブジェクトを返す。

store/store.js

```js
import { computed, inject, provide, reactive } from "vue"
/**
 * storeを初期化しprovideする
 */
export const initStore = () => {
  // State
  const state = reactive({
    count: 0
  })
  // Getters
  const getCount = computed(() => state.count)
  // Actions
  const updateCount = () => {
    state.count++
  }
  // Provides
  provide("getCount", getCount) // 算出refオブジェクト
  provide("updateCount", updateCount) // 関数
}

/**
 * injectされた値をもつオブジェクトを返す
 * @return {Object} object
 */
export const useStore = () => ({
  getCount: inject("getCount"),
  updateCount: inject("updateCount")
})
```

## App.vue での初期化

ルートコンポーネントの App.vue で store の初期化を行う。

```js
<script>
import Parent from "./components/Parent.vue"
import { initStore } from "./store/store"
export default {
  components: {
    Parent
  },
  setup() {
    initStore() // ここで初期化する
  }
}
</script>

<template>
  <Parent />
</template>
```

## Parent.vue

親コンポーネントでは今度は provide は行わない。setup 内の処理は 3 つのコンポーネントで共通なので分離し commonSetup.js に集約した。

```js
<script>
import { commonSetup } from "./libs/commonSetup.js"
import Child from "./Child.vue"
export default {
  name: "Parent",
  components: {
    Child
  },
  setup() {
    return commonSetup()
  }
}
</script>

<template>
  <div class="parent">
    <p class="title">Parent Component</p>
    <div class="container">
      <div class="items">
        {{ count }}
      </div>
      <div class="items">
        <button v-on:click="updateCount">update</button>
      </div>
    </div>
    <Child />
  </div>
</template>
```

commonSetup.js の内容は以下のとおり。

```js
import { computed } from "vue"
import { useStore } from "../../store/store.js"
/**
 * 共通初期化
 * @returns {Object} object & function
 * @desc 各コンポーネント（親、子、孫）のsetupが同じ内容であるため集約
 */
export const commonSetup = () => {
  const store = useStore() // injectデータを持つオブジェクトを取得
  const count = computed(() => store.getCount.value)
  const updateCount = () => {
    store.updateCount()
  }
  return {
    count,
    updateCount
  }
}
```

store.js から useStore 関数 を import し、store オブジェクトを取得する。store オブジェクトの getCount プロパティから参照 ref オブジェクトを生成。store オブジェクトの updateCount 関数を実行する関数 updateCount を作成し、return している。

## 結果

こんどは、どのコンポーネントの update ボタンを押しても数値はインクリメント（更新）される。これは updateCount 関数の中では、provide された initStore 内で宣言された関数が実行されるからかな？

今回は vuex を利用したときと同じ名前のフォルダ src/store に store.js を格納したが、vuex と併用するときは、別の名称にしたほうがよいかも。

## 参考

- [Provide/Inject API With Vue 3](https://www.thisdot.co/blog/provide-inject-api-with-vue-3)
