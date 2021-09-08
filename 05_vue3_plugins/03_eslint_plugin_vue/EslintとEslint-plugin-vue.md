# EslintとEslint-plugin-vue

Linterは、プログラムの静的検証（シンタックスエラーの検出）ツール。

- Eslint JavaScriptの静的検証ツール。
- Eslint-plugin-vue .vueファイルの静的検証ツール。

これらはVueプログラムを作成するときのほぼ必須ツールになる（eslint-plugin-vueは日本人が作っているみたい）。

Vue-cliでプロジェクトを作るときManually select featuresでLinter / Formatterにチェックを入れると導入される。
Viteで始めたときは、自分でインストールする。

```shell
yarn add eslint eslint-plugin-vue
```

## 設定ファイル

Vue-cliでプロジェクトを生成したとき、Standart Eslint configを選択すると以下のファイル**.eslintrc.js**が作成される。
Viteのときは、プロジェクトフォルダ直下に同一内容のファイルを作成する。

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    // 'plugin:vue/vue3-recommended',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
```



以上
