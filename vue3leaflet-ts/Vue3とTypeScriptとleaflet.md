# Vue3 と TypeScript と leaflet

Vue3 と TypeScript と leaflet の組み合わせを試みる。

Vue3 のプロジェクトを作成する。（vue-ts を選ぶ）

```shell
npm init vite vue3leaflet-ts
```

利用モジュールのインストール

```shell
cd vue3leaflet-ts
npm install
npm install leaflet --save
```

vue3leaflet の App.vue と components/HelloMap.vue をコピーする。`<script>`タグに`lang="ts"`属性はないまま。

VSCode で HelloMap.vue を見ると"AllowJs"を true にしなさいとワーニングが出ている。そこでプロジェクト直下の tsconfig.json に以下を追加する。

```json
"compilerOptions": {
    "allowJs": true
  },
```

index.html に以下の CSS を追加する。

```css
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
    }
  </style>
```

ワーニングは消えたので試しに開発サーバを立ち上げてみる。

```shell
yarn dev
```

エラーなく立ち上がり指定 URL（localhost:3000）にアクセスすると地図は表示された。

以上
