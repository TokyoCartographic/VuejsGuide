# Todo リストアプリケーションを改良する

todo-list プロジェクトで作成した Web アプリケーションの動きにすこし改良を試みる。

## 改良対象箇所

バージョン１のものは、Todo 項目を抽出するときフィルター入力欄の入力文字がひとつでも変わると即座に全 Todo 項目配列をループして、ひとつでもマッチするものがあれば次々と抽出リストに表示する。
ある程度タイムラグをおいてまとまった文字列が入力されるのを待ってから抽出にゆくようにする。

## watch オプション

プロパティの変化を監視する watch オプションを採用して実現する。

```js
  watch: {
    // filterValueの値の変更を監視しfilteredTodoItemsを再計算する
    filterValue() {
      this.updateFilteredTodoItems()
    },
    // 配列todoItemsの値の変更を監視しfilteredTodoItemsを再計算する
    todoItems: {
      handler() {
        this.updateFilteredTodoItems()
      },
      deep: true// 深く監視するオプション
    }
  }
```

watch オプション内に指定された各プロパティが変化したら指定した処理（ここではどちらの場合も updateFilteredTodoItems）を実行する。この例では filterValue 文字列の変化と todoItems 配列の変化を監視している。配列 todoItems の変化をキャッチするためには、単純なプリミティブ値の変化のときとは異なり、handler()と deep: true が必要になる。

## 配列処理メソッド

watch で変化を検知したら実行するメソッド updateFilteredTodoItems では、即座に処理を実行せず指定時間（この場合 500ms）待ってから行うようにしている。

```js
// filteredTodoItemsに再計算した配列を与える
updateFilteredTodoItems: _.debounce(function () {
  this.filteredTodoItems = this.filterValue
    ? this.todoItems.filter((todo) => todo.text.includes(this.filterValue))
    : this.todoItems
}, 500)
```

このメソッドのコードは少し見通しが悪いので分割して説明する。まず lodash の debounce の記述法はこうなる。

```js
_.debounce(callback, wait)
```

最初の引数は、callback 関数で第２引数は待ち時間（マイクロ秒）だ。これがわかってしまうと上のコードはなんとなく意味がわかる。

500ms 後に実行されるコールバックが無名関数として渡されている。コールバックでは３項演算子と Es6 の配列処理機能を使い以下の処理が行われている。Es5 で書くとこんな感じになる。

```js
if (this.filterValue) {
  this.filteredTodoItems = []
  this.todoItems.forEach((todo) => {
    if (todo.text.indexOf(this.filterValue) > -1) {
      this.filteredTodoItems.push(todo)
    }
  })
} else {
  this.filteredTodoItems = this.todoItems
}
```

## 外部ユーティリティライブラリ Lodash

上記メソッドでは遅延処理を行うため、ちょっと前の定番のユーティリティライブラリの [lodash](https://lodash.com) の**debounce**を利用している。そのためあらかじめ lodash をインストールしておく必要がある。

```shell
yarn add lodash
```

updateFilteredTodoItems が含まれるコンポーネント TodDoList.vue に lodash を import する。

```js
import _ from "lodash"
```

ただし **lodash** には大量の便利機能が含まれているため、とりあえず入れておこうという安易な考えでインストールすると大量の使用しないプログラムが入ることになる。Es5 の時代とは違い必要な機能を Es6 の機能を使うことで比較容易に作成できることもあるので、事前にその必要性を吟味する。また必要な機能のみの分割インストールができないか調べてみる必要もある。

以上
