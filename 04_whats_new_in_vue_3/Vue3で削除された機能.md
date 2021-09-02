# Vue3 で削除された機能

Vue3 は Vue2 の機能拡張版だが、いくつかの Vue2 の機能は削除された。詳しくは本家サイトの[Breaking Changes / Removed APIs](https://v3.vuejs.org/guide/migration/introduction.html#other-minor-changes)を参照

## フィルタ

Vue2 にあった`<template>`内でのフィルタ構文は使えなくなった。

```vue
{{ message | capitalize }}
```

## $on(), $off(), $once()

イベントハンドラーを動的に登録するためのこれらの API は利用できなくなった。

## 関数型コンポーネント

Vue の高速化 Tips として紹介された以下の記述は Vue3 ではサポートされない。

```html
<template functional> </template>
```

以上
