# Vue.js ガイド

このフォルダには、Vue.js の復習と Vue3 の新機能の理解のためのドキュメントとソースファイルがあります。

- 入門のためのドキュメント
  - Vue による開発準備.md
  - なぜ Vue3 なのか.md
- leaflet のサンプル
  - vue2leaflet
  - vue3leaflet
- 雑誌「WEB+DB プレス」120 号のダウンロードしたサンプルソース

  - 02_basic_usage
  - 03_advanced_usage
  - 04_whats_new_in_vue_3

  WEB+DB のソースは記事のソースの断片ではなく Vue プロジェクトとして構成されているため実際に動かして確認することができます。

- Vue3 プラグインその他のサンプル
  - 05_vue3_plugins

## 注意

WEB+DB の各ソースのプロジェクトフォルダは**vue-cli**ではなく**vite**を使って生成されています（package.json 参照）。そのため dev サーバを動かすときは、各プロジェクトフォルダ内で以下のように入力します。

```shell
yarn       // 各種モジュールのインストール（最初に１回だけ）
yarn dev   // 開発サーバの起動（yarn serveではない）
```

今回は npm ではなく yarn を使うので、プロジェクトフォルダ内の package-lock.json はあらかじめ削除しておく（yarn.lock とバッティングするので）。

以上
