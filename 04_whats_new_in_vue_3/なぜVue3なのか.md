# なぜ Vue3 なのか

個人ベースのプロジェクトとして始まった **Vuejs** は、現在では巨大 IT 企業のフレームワーク **Angular**, **React** などに負けないくらいのユーザを獲得している（特に日本においては）。その **Vue** が **2020.9** に**Version 3** に生まれ変わった。**TypeScript** のサポート、パフォーマンスの高速化、プログラムサイズのダイエットなどの性能向上とは別に、**Vue2** までに明らかになった重要な課題の克服がその最大の目的であった。

## Vue の何が問題だったのか

以前から、Web フロントエンドの３大フレームワークはざっと以下のように位置付けられてきた。

- **Angular** 大規模開発
- **React** 中規模開発
- **Vue** 小規模開発

なぜ **Vue** は比較的小さな規模のソフトウェアの開発にしか向いていないのか？
その理由は以下の２つが困難であることだ。

- 論理的なコードの編成
- ロジックの抽出・共通化

それらを難しくしているのは、**Vue** の特徴でもありまた手掛けやすさの理由でもある**Options API**だ。
**Options API**では各プロパティ（**data**, **computed**, **mounted**, **methods** など）ごとにデータおよびコードを配置することが要求される。そのためデータ・コードは分散することになり、またそれらのプロパティ内に隔離されてしまう。
また**Vue**はロジック共有機能が弱いため、ロジックをなんとか共有するため **Vue2** 時代までは以下のようなアプローチ取らざるを得なかった。

- 関数として外に出し、import して利用する
- **Mixin** 化する
- **Vuex**プラグイン を利用する

## Vue3 Composition API による対応

上記の課題に対応するため**Vue3** では**Composition API**が導入された。

先に**Vue2**で書かれたシンプルなコンポーネントを見てから**Vue3**に書かれたものを見てみる。

### Vue2 の例

components/UserName_vue2.vue

```js
<template>
  <div>
    <h1>Hello</h1>
    <div>I am {{fullName}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firstName: "Evan",
      lastName: "You"
    }
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
}
</script>
```

### Vue3 の例

上の例を **Vue3**の**Composition API**を使って書き直すと以下のようになる。

componemts/UserName_vue3.vue

```js
<template>
  <div>
    <h1>Hello</h1>
    <div>I am {{fullName}}</div>
  </div>
</template>

<script>
import { ref } from "vue"
import { useFullName } from "./composables/createFullName"
export default {
  setup() {
    const firstName = ref("Evan")
    const lastName = ref("You")
    const fullName = useFullName(firstName, lastName)

    return { fullName }
  }
}
</script>
```

**vue** からリアクティブの機能（**ref**, **reactive**, **computed** など）やライフサイクルフック（**onMounted** など）は関数として import して利用される。
そして**setup** 関数内ですべての処理が実行されている。**setup**は **Vue3** で導入された新しいオプション（**Vue2** での**created**相当？）で、ここで値に対する操作を自由にまとめることができる。**setup** から return されたものが `template` 内で使用することができる。

composables/createFullName.js

```js
import { computed } from "vue"

export const useFullName = (firstName, lastName) => {
  return computed(() => `${firstName.value} ${lastName.value}`)
}
```

この関数は import することであらゆるコンポーネントで容易に利用できる。またこの関数は Vue の **computed** の機能を持つためリアクティブ性が保たれる。つまりシンプルさを保ったままロジックを使いまわすことが可能となる。

**Vue3**には**Options API**のサポートも継続している。小規模なアプリケーションを除き、あえて全面的に**Options API**を適用することは避けるべきだ。しかし強引に**Composition API**を適用する必要性もメリットもない。

また**Composition API**を採用した場合、**setup** 関数内が混みあうことが想定される。それをどう論理的に構成（設計）するかが問われることになる。

あとは **TypeScript** を使ってコード書くかが検討課題になる（実際多くの Vue3 のサンプルコードは TypeScript になっている）。しかしそれはまた別の話。

#### リンク

[本家サイト：Vue 3 の新機能と変更点ガイド](https://v3.ja.vuejs.org/guide/migration/introduction.html#%E6%A6%82%E8%A6%81)

#### 参考

- Vuejs ビギナーズガイド 3.x 対応 （C&R 研究所）
- 現場で使える Vue.js 3.x 実践ガイド（C&R 研究所）
- 最新 Vue.js3 入門 （WEB+DB PRESS 120）

以上
