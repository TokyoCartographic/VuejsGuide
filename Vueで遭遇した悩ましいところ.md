# Vueで遭遇した悩ましいところ

## 親子コンポーネント間のデータやりとり

親コンポーネントから子コンポーネントにデータを渡すときはパラメータを使うのが普通だ。

```js
<fileSelector
  v-bind:clickedTarget="clickedTarget"
/>
```
ところが子のほうではpropsデータclickedTargetが空になっていた。なぜか？
ここでclikedTargetは空のオブジェクト（refオブジェクト）として初期化され、for-inで表示されたボタンが押下されたら、そのオブジェクトをclickedTargetに代入していた。

```js
let clickedTarget = reactive({})
const btnClick = (item) => {
  clickedTarget = item
}
```

ここでは単なる代入はダメ。setup内に以下のように記述すると値は期待通り渡された。

```js
const clickedTarget = reactive({})
const btnClick = (item) => {
  Object.assign(clickedTarget, item)
}
```


## 兄弟コンポーネント間のデータやりとり

カプセル化に近いコンポーネント間のデータのやりとりは通常以下の方法がある。兄弟間のデータ受け渡しはどれを使えば良いのか？

### 親から子

プロパティにより子にデータを渡す。
親からそれぞれの子に同じプロパティを渡せば、結果的に兄弟は同じものを手にすることができる。

### 子から親

イベントの値としてデータを親に渡す。
子は自分のプロパティをなんらかの時点で親にイベント経由で渡し、親はイベントを受信したら別の子に渡すプロパティを更新する。

### Vuex

状態データ管理用プラグインを使う。

### mixin

mixinを使い共有する。

### provide/inject

親側でprovideし子側でinjectして使う。

以上
