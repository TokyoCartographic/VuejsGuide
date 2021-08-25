# Todoリストアプリケーションを作成する

Vue3を使って簡単なTodoアプリケーションを作成する。

## 機能

- Todoをリスト表示する
- Todoを追加できる
- Todoを完了にさせる
- Todoをフィルタリング表示できる
  
このWebアプリではVue3の新機能は使っていない。Vue2のときからあった機能で実現する。

## プロジェクトの作成

vue-cliでもよいが、Vue3を使う前提なのでViteを使ってプロジェクトを作成する。

```shell
npm init vite
```

`Ok to proceed? (y)`でエンターキーを押すとプロジェクト名の入力が促される。
その後どのフレームワークを使うかの選択画面になる。

```
>   vanilla
    vue
    react
    preact
    lit-element
    svelte
```
矢印キーを押し**vue**を選びエンターすると今度はjs版かTypeScript版かの選択が表示される。

```
>   vue
    vue-ts
```
今回はJavaScriptを使うのでvueのところでエンターを押すとすぐにプロジェクトフォルダが作成される。作成されたフォルダに移動し必要なモジュールをインストールする。

```shell
cd todo-list
yarn
```

インストールが終われば、開発サーバを起動してみる。

```shell
yarn dev
```
開発サーバが立ち上がれば指定されたurl:ポートにアクセスしてみるとひな形のWebアプリが立ち上がる。

```
localhost:3000
```

この時点でのプロジェクトフォルダの内容は以下のようなものになる。

```
node_modules
public
src
    assets
    components
        HelloWorld.vue
    App.vue
    main.js
.gitignore
index.html
package.json
vite.config.js
yarn.lock
```
