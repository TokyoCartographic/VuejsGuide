# transition によるちょっとしたアニメーション

<transition>コンポーネントを使うと比較的容易にちょっとしたアニメーション効果を実現できる。

- アニメーション効果を加えたい要素を<transition>タグで囲う。
- 対応する CSS を`<style>`に追加する。

# サンプル MyComponent.vue の`<template>`と`<script>`

```js
<template>
  <button v-on:click="show = !show">表示切替</button>
  <transition name="fade">
    <div v-if="show">Awesome Transition</div>
  </transition>
</template>
<script>
export default {
  data() { return { show: true } }
}
</script>
```

アニメーション効果を与えたい div 要素を`<transition>`タグで囲っている。また`<transition>`には **name**属性を追加しその値を”fade”としている。

# サンプル MyComponent の`<style>`

```css
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 500ms ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

`<template>`で`<transition>`に与えられた name 属性を元に遷移方向および状態に応じて動的に class が設定される。その class に CSS のルールを当てはめることでアニメーション効果を実現している。

### class 命名ルール

アニメーション用の class 名は次の構造を持っている。

```text
name属性値-遷移方向-状態
```

- name 属性値(デフォルト: 'v')
- 遷移方向
  - enter 非表示から表示
  - leave 表示から非表示
  - appear 初期描画
- 状態
  - from 開始状態
  - active 遷移中
  - to 終了状態

`<transition name="fade">`に囲まれた HTML 要素が、非表示から表示に切り替えられる際、その開始状態のとき付与される class は以下のものになる。

```html
class="fade-enter-from"
```

## 参照

詳しくは次のドキュメントを参照

- [単一要素/コンポーネントのトランジション](https://v3.ja.vuejs.org/guide/transitions-enterleave.html#%E5%8D%98%E4%B8%80%E8%A6%81%E7%B4%A0-%E3%82%B3%E3%83%B3%E3%83%9B%E3%82%9A%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%99%E3%82%B7%E3%83%A7%E3%83%B3)

以上
