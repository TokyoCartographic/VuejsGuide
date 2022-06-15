# Vue で遭遇した悩ましいところ

## 親子コンポーネント間のデータやりとり

親コンポーネントから子コンポーネントにデータを渡すときはパラメータを使うのが普通だ。

```js
<fileSelector v-bind:clickedTarget="clickedTarget" />
```

ところが子のほうでは props データ clickedTarget が空になっていた。なぜか？
ここで clickedTarget は空のオブジェクト（ref オブジェクト）として初期化され、for-in で表示されたボタンが押下されたら、そのオブジェクトを clickedTarget に代入していた。

```js
let clickedTarget = reactive({})
const btnClick = (item) => {
  clickedTarget = item
}
```

ここでは単なる代入はダメ。setup 内に以下のように記述すると値は期待通り渡された。

```js
const clickedTarget = reactive({})
const btnClick = (item) => {
  Object.assign(clickedTarget, item)
}
```

## Proxyオブジェクトを普通のオブジェクトにしたい

Vue3のreactiveなオブジェクトはProxyオブジェクトになっている。普通はそのまま普通のオブジェクトのようにしてアクセス・参照できる。しかしどうしても生のオブジェクトが必要なときもある。そのときは以下のようなやりかたがある。

```ts
const vreactobj = reactive({a: 1})
```

いちばんプリミティブで一番確実な方法（ネストしたオブジェクトでも動作）：

```ts
const rawobj = JSON.parse(JSON.strigify(vreactobj))
```

**Object.assign**を使う。

```ts
const rawobj = Object.assign({}, vreactobj)
```


ES6の**スプレッド構文**を使う。

```ts
const rawobj = { ...vreactobj }
```

**Object.assign**や**スプレッド構文**はネストしていないオブジェクトのときのみ利用できる。

## 兄弟コンポーネント間のデータやりとり

カプセル化したオブジェクトに近い Vue のコンポーネント（SFC）間のデータのやりとりは通常以下の方法がある。

兄弟間のデータ受け渡しについても以下のいずれかの方法を採用することになる（うまくゆかない場合もあるが）。

### 親から子

親はプロパティにより子にデータを渡す。子は props オプションでそのデータを受け取る。

親からそれぞれの子に同じプロパティを渡せば、結果的に兄弟は同じものを手にすることができる。（注意：親から props 経由で渡されたデータは子は更新してはならない）

### 子から親

子からの親へのデータはイベントのプロパティ（値）として渡す。親はそれをイベントリスナで受け取る。

子は自分のプロパティをなんらかの時点で親にイベント経由で渡し、親はイベントを受信したら別の子に渡すプロパティを更新する。

### Vuex

vue の状態データ管理用プラグインを使う。vuex はコンポーネント間での状態データの共有を目的とするプラグインだ。これを使う場合の主な選択肢は、以下の２つ。

- あるコンポーネントで生成・取得したデータを vuex に登録する。
- 最初にいちどだけ生成・取得すればよいものは、最初から vuex 側で登録しておく。

### mixin

mixin を使い共有する。mixin に書かれたオプションはそれを import し mixins:[]に登録したコンポーネントにマージされる。

mixin で登録されたプロパティはそれを import したどのコンポーネントからも利用できることになる。

Vue3 以降 mixin はその曖昧さからアンチパターンと言われ使用が推奨されいない。Vue3 では、mixin の課題を克服するため Composition API が導入されたとも言える。

### provide/inject

親側で provide し子側で inject して使う。親側で provide しておけば、その下のすべてのコンポーネント（子や兄弟や孫までも）が自由にそのデータにアクセスできる。

この場合も親側でデータを provide すれば、子供たちは inject することでそれらを使うことができる。

以上
