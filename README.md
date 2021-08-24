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

  **注意：** WEB+DB の各ソースのプロジェクトフォルダは**vue-cli**ではなく**vite**を使って生成されています（package.json 参照）。そのため動かすときは以下のように入力します。

  ```shell
  yarn       // 各種モジュールのインストール
  yarn dev   // 開発サーバの起動（yarn serveではない）
  ```

  以上
