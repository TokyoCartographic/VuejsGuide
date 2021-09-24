# Provide/Inject の Vue3 的な使いかた

provide/inject の 051 での紹介は、Options API 記法のものだったので、Composition API で書いてみる。

３つのコンポーネント（親、子、孫）を用意し、親が子を import し、子が孫を import するかたちにする。

親コンポーネントでカウンター値 count の初期化を行い、その値を provide する。また、ボタンが押されると値が増加する関数 updateCount を作成する。

Parent.vue

```js
<script>
import { ref, provide, computed } from "vue"
import Child from "./Child.vue"
export default {
  name: "Parent",
  components: {
    Child
  },
  setup() {
    const count = ref(0)
    provide(
      "count",
      computed(() => count.value) // リアクティブにするため
    )
    // provide("count", count.value) // これでは同期しない
    const updateCount = () => {
      count.value++
    }
    return {
      count,
      updateCount
    }
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

<style scoped>
.parent {
  width: 99%;
  height: 320px;
  border: 1px solid silver;
}
.container {
  display: flex;
  justify-content: center;
  align-content: center;
}
.items {
  margin: 1em;
}
</style>
```

子と孫のコンポーネントは、親が provide した値 count を inject し表示する。親の count 値が変化したら子・孫の count 値も自動的に変化する。

Child.vue

```js
import { ref, inject } from "vue"
import Grandchild from "./Grandchild.vue"
export default {
  name: "Child",
  components: {
    Grandchild
  },
  setup() {
    const count = inject("count") // 親と同期する
    const updateCount = () => {
      count.value++
    }
    return {
      count,
      updateCount
    }
  }
}
```

ただし、子・孫のほうの"update"ボタンを押しても値は変わらない。親から提供された count は算出 ref オブジェクトであるため。

以上
