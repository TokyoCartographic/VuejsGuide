# スコープつき Slot コンポーネント

親コンポーネントが指定する slot コンテントの一部に子コンポーネントからのデータを使いたいときもある。そんなときは、スコープつき Slot を使う。

サンプル子コンポーネント ChildComponent では、slot の属性 foo に"Hello World"文字列をバインドしている。親コンポーネントに使ってもらうためのものだ。

```js
<template>
  <h1> Message </h1>
  <slot v-bind:foo="'Hello World'" />
</template>
```

サンプル親コンポーネント ParentComponent では`<template>`の **v-slot** ディレクティブでスロットプロパティ **foo** を受け取っている。

```js
<ChildComponent>
  <template v-slot:default="{ foo }">
    <p> {{ foo }} </p>
  </template>
</ChildComponent>
```

**v-slot** の簡易記法は'**#**'になる。この他にも省略記法がいろいろあるみたいだ（[ドキュメント](https://v3.ja.vuejs.org/guide/component-slots.html)）。

複数ある場合はどうするのだろう？簡易記法を使って書くとこんな感じになる。

子コンポーネント

```js
<template>
  <h1> Message </h1>
  <slot
    :foo="'Hello World'"
    :bar="'こんにちは！'"
   />
</template>
```

親コンポーネント

```js
<ChildComponent>
  <template #default="slotProps">
    <p> {{ slotProps.foo }} </p>
    <p> {{ slotProps.bar }} </p>
  </template>
</ChildComponent>
```

slot は、vuetify などの UI コンポーネントライブラリを操作するときなどに必須の知識になることがある。

以上
