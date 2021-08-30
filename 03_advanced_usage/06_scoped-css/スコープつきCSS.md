# スコープつき CSS

Vue には以前から CSS の有効範囲を自分のコンポーネント内に制限する**scoped**という属性がある。逆にいうとコンポーネントの`<style>`は、**scoped** 属性がないと外部のコンポーネントにまで影響を与えるということになる。

## スコープつき CSS の設定

スコープつき CSS は`<style>`ブロックに**scoped**を追加することで設定される。

MyComponent.vue

```js
<template>
  <p>Title:</p>
  <span class="color-blue">Hello!</span>
</template>
<style scoped>
.color-blue {
  color: blue;
}
p {
  font-weight: bold;
}
</style>
```

`<style>`ブロックで宣言された CSS は、このコンポーネントにだけ適用される。

OtherComponent.vue

```js
<template>
  <span class="color-blue">Goodbye!</span>
  <p>===============</p>
</template>

<style>
p {
  color: red;
}
</style>
```

このコンポーネントでは、`<style>` ブロックに scoped 属性がない。そのため`<template>`内の`<p>`に設定した CSS は他のコンポーネントにも影響する。画面をみるとわかるがこんな色付けになる。

- Title: 赤
- Hello! 青
- Goodbye! 黒
- ===== 赤

自前のコンポーネントのみでアプリケーションを構成することは少ない。他の UI コンポーネントを併用する場合、CSS の有効範囲についての課題が生じることもある。

以上
