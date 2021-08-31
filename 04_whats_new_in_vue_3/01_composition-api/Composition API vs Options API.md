# Composition API vs Options API

Vue3 で導入された Composition API は、従来の Vue のプログラム作成上の制限を緩和しより高精度なプログラム構成を可能とすることを目的としている。Composition API に対し従来の構成法は Options API と呼ばれることとなった。

ボタンを押すたびに数字が増えて行く機能を、Options API と Composition API で作成し、比較してみる。

## Options API では

Vue2 までの普通の書き方（Options API）ではこうなる。

```js
<template>
  <button v-on:click="onCountUpClick">+1</button>
  Click Count: {{ state.count }}
</template>

<script>
export default {
  data() {
    return {
      state: {
        count: 0
      }
    }
  },
  methods: {
    onCountUpClick() {
      this.state.count++
    }
  }
}
</script>
```

Vue2 の経験者には、data オプションも、methods オプションも当たり前の存在であり、何の違和感もない。

- data: このオプション内のデータはこのコンポーネントのプロパティでリアクティブ性を持つ
- methods: このオプション内にこのコンポーネントのデータを処理するメソッドを格納する

## Composition API では

Vue3 で登場した Composition API を使って書くとこうなる。

```js
<template>
  <button v-on:click="onCountUpClick">+1</button>
  Click Count: {{ state.count }}
</template>

<script>
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      count: 0
    })
    const onCountUpClick = () => state.count++
    return {
      state,
      onCountUpClick
    }
  }
}
</script>
```

vue から import している **reactive** は、オブジクト（または配列）にリアクティブ性を与えるための関数だ。

コンポーネントの中にある **setup** は、Vue3 から導入されたオプションになる。（皮肉なことに、Options API の弊害をなくすために新しいオプションが追加されたことになる。）

この **setup** オプションのなかに、プロパティデータ、各種メソッドやライフサイクルフックなどの多くが記述される。

setup 関数から return されたものが、`<template>`で利用できるようになる。

なお、setup 内では**this**は使えない。なぜなら setup 内の this はコンポーネントのインスタンスを参照できないため。

## 念のため

この API 比較アプリは、Vue3 の上で動いている。つまり Options API も普通に動いている。Vue3 では Composition API が Options API に置き換わったわけではない。

以上
