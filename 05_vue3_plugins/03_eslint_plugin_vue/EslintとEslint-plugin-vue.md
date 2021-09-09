# Eslint と Eslint-plugin-vue

Linter は、プログラムの静的検証（シンタックスエラーの検出）ツール。

- [Eslint](https://eslint.org/) JavaScript の静的検証ツール。
- [Eslint-plugin-vue](https://eslint.vuejs.org/) .vue ファイルの静的検証ツール。

これらは Vue プログラムを作成するときのほぼ必須ツールになる（eslint-plugin-vue は日本人が作っているらしい）。

Vue-cli でプロジェクトを作るとき Manually select features で Linter / Formatter にチェックを入れると導入される。
Vite で始めたときは、自分でインストールする。

```shell
yarn add eslint eslint-plugin-vue
```

## 設定ファイル

Vue-cli でプロジェクトを生成したとき、Standart Eslint config を選択すると以下のファイル**.eslintrc.js**が作成される。
Vite のときは、プロジェクトフォルダ直下に同一内容のファイルを作成する。

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
}
```

**extends**内の**plugin:vue/vue3-\***のルール名によって検査のレベルが異なる。

- "plugin:vue/vue3-essential" 最低限のエラーチェック
- "plugin:vue/vue3-strongly-recommended" 読みやすさ開発のしやすさの改善
- "plugin:vue/vue3-recommended" 開発者コミュニティの標準

ルールの詳細は本家サイトの[Available rules](https://eslint.vuejs.org/rules/)にある。

## ルールの適用を停止

ときどきルールが煩わしいときがある。そんなときは以下のいずれかの方法でルールの適用を停止する。

### 全体

**rules**エントリで個別ルール名の値を**off**にする。

```js
rules: {
  "vue/require-explicit-emits": "off"
}
```

Vue3 の新機能の**events**オプションの記述がないときのエラー・ワーニングを表示しないようにしている。

### 個別

特定の`<template>`ブロックのコードのエラー表示を停止するときは`<!-- eslint-disable -->`を使う。

```html
<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div a="1" b="2" c="3" d="4"></div>
</template>
```

特定の`<script>`ブロック内のエラー表示の停止は Eslint のルールに従えばよい？

```js
/* eslint-disable-next-line */
```

以上
