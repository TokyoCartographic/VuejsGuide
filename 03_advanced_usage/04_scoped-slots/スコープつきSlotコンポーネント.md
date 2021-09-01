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
<template>
  <ChildComponent>
    <template v-slot:default="{ foo }">
      <p> {{ foo }} </p>
    </template>
  </ChildComponent>
</template>
```

**v-slot** の簡易記法は'**#**'になる（v-bind は'**:**'）。この他にもいろいろな省略記法があるみたいだ（[ドキュメント](https://v3.ja.vuejs.org/guide/component-slots.html)）。

slot コンテントが複数ある場合はどうするのだろう？簡易記法を使って書くとこんな感じになる。

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
<template>
  <ChildComponent>
    <template #default="slotProps">
      <p> {{ slotProps.foo }} </p>
      <p> {{ slotProps.bar }} </p>
    </template>
  </ChildComponent>
</template>
```

スコープつき slot は、親から渡されたものを子が表示するという Vue の基本的スタンスとは異なるふるまいをもつため理解しにくいところがある。しかしこれも必要性があるから存在するわけで、まあ世のなかひとつの原理原則だけではうまくゆかない場合があるということか。

slot は、vuetify などの UI コンポーネントライブラリを理解・操作するときなどに必須の知識になることがある。

以上
