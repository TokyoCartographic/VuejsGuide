# transition-group によるアニメーション

`<transition-group>`によりリストのように複数の項目の位置をアニメーション的に移動することができる。

## MyComponent の`<template>`

`<transition>`のときと同様に、アニメーション効果を与えたい要素を`<transition-group>`で囲っている。また name 属性に値"fliplist"を与えている。

```js
<template>
  <button v-on:click="shuffle">シャッフル</button>
  <transition-group name="fliplist">
    <div v-for="e in list" v-bind:key="e">
      {{ e }}
    </div>
  </transition-group>
</template>
```

## MyComponent の`<script>`

「シャッフル」ボタンが押されると実行されるメソッド shuffle では、list 配列の要素をランダムに並べ変えているだけだ。

```js
<script>
export default {
  data() { return { list: [1, 2, 3, 4, 5] } },
  methods: {
    shuffle() {
      // リストをシャッフル
      const list = this.list
      for (let i = list.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * (i + 1))
        ;([list[k], list[i]] = [list[i], list[k]])
      }
    }
  }
}
</script>
```

## MyComponent の`<style>`

`<transition>`のときとは異なり、シンプルな class "fliplist-move" を設定している。

```css
<style>
.fliplist-move {
  transition: transform 1s;
}
</style>
```

## 参照

くわしくは以下を参照

- [リストのトランジション](https://v3.ja.vuejs.org/guide/transitions-list.html#%E3%83%AA%E3%82%B9%E3%83%88%E3%81%AE-enter-leave-%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%99%E3%82%B7%E3%83%A7%E3%83%B3)

以上
