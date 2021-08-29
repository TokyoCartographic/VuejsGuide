# 名前つき Slot コンポーネント

親コンポーネントは、slot コンポーネントを利用し、あらかじめ親コンポーネントで用意したコンテンツを子コンポーネントに挿入することができる。子コンポーネントに複数の`<slot />`を使用したいときはどうしたら良いのか？そんなときは slot に name 属性を追加して識別する。

サンプルの子コンポーネント ModalDialog.vue は 2 つの slot を持つ。そのため片方に name 属性を与えている。もうひとつのほうは default の slot コンテントということになる。

```js
<template>
  <dialog open>
    <h1>
      <!-- ここにタイトルを表示 -->
      <slot name="title" />
    </h1>
    <div>
      <!-- ここにダイアログの内容を表示 -->
      <slot />
    </div>
  </dialog>
</template>
```

親コンポーネントのほうは、名前つきのスロットコンテントは`<template>`で囲い、**v-slot**ディレクティブで名前を指定する。子コンポーネントタグで囲まれたその他の部分が default コンテントとなる。

```js
<template>
  <ModalDialog>
    <template v-slot:title>
      <span style="color: red;">タイトル（赤）</span>
    </template>

    <p>1. ダイアログの内容</p>
    <p>2. ダイアログの内容</p>
  </ModalDialog>
</template>
```

以上
