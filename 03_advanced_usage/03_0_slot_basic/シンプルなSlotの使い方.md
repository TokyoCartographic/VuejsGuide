# シンプルな Slot の使い方

slot コンポーネントは、親コンポーネントから子コンポーネントのなかに一部のプリミティブ値や HTML 要素をはめ込む（slot する）機能を持つ。

親コンポーネントから子コンポーネントへのデータを渡すときには props 経由で行うが、もう少し大きなものを渡すときは slot を使うことになるのかな？

サンプルの子コンポーネント ChildComponent.vue は、h1 要素ひとつだけもち、その下に親から渡されるものを格納表示するための slot 要素をもつ。

```vue
<template>
  <h1>Child Component</h1>
  <slot />
</template>
```

サンプルの親コンポーネント ParentComponent は、import した ChildComponent コンポーネントのタグの間に `<span>`要素と`<button>`要素が記述されている。これが子コンポーネントの`<slot />`に表示される。

```vue
<template>
  <ChildComponent>
    <span>押して：</span>
    <button @click="onClick">ボタン</button>
  </ChildComponent>
</template>
```

以上
