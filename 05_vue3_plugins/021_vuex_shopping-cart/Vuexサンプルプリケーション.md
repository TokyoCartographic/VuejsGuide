# Vuex サンプルプリケーション

**Vuex** のもうすこし本格的な使用例がないかなと探したところ、灯台下暗しで本家にサンプルがいくつかあった。そのなかのショッピングカートのサンプルをコピーして動かそうとしたらサーバーとの連携もあるみたいでうまくゆかない。他をあたろうとしたところ、ネット上でこのソースを元にサーバなしで動かして紹介しているサイトがあった。それを参考にさせていただくことにした。ただしそのサイトでは Options API を使っているので、一歩一歩 Composition API への置き換えつつできれば本家のソースも活かすよう試みる（勉強になる～）。

## プロジェクトフォルダの作成

普通 GitHub に公開されているものは、ソースをダウンロードし、解凍したフォルダで yarn（または npm install）すればそれで OK という場合が多いが今回は諸事情によりそうもゆかないことがわかったのでゼロから始める。

```shell
npm init vite
:
cd 021_vuex_shopping-cart
yarn
yarn add vuex@4.0.2 // 現時点の最新バージョン
```

これで必要なモジュールは揃った。あとは少しづつ本家の Composition API のソースと参考サイトのソースを取り込んでゆく。

### main.js

Vite でプロジェクトを作成したので必要な設定を main.js に加える。

- vuex を利用する
- global.css を利用する

```js
import { createApp } from "vue"
import App from "./App.vue"
import store from "./store"
import "./assets/global.css"

createApp(App).use(store).mount("#app")
```

### store/index.js

ストアオブジェクトの構成は本家サンプルでは modules を使ったより複雑なものになっている。

```
> store
    index.js
    > modules
       cart.js
       products.js
```

ストアは必ず後から肥大化するので最初から modules を使うべきという人もいる。しかし今のところは以下の空の index.js にしておく。

```js
import { createStore } from "vuex"
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
})
```

### src/App.vue

App.vue は商品リストとカートリストの両方のコンポーネントを表示している。

```js
<template>
  <div id="app">
    <h1>Shopping Cart Example</h1>
    <hr />
    <h2>Products</h2>
    <ProductList />
    <hr />
    <ShoppingCart />
  </div>
</template>
<script setup>
import ProductList from "./components/ProductList.vue"
import ShoppingCart from "./components/ShoppingCart.vue"
</script>
```

### src/api/shop.js

今回はサーバを使わないので、商品のデータと購買処理関数を shop.js に準備する。

```js
/**
 * Mocking client-server processing
 */
const _products = [
  { id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2 },
  { id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10 },
  { id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5 }
]

export default {
  // 商品情報を取得する
  getProducts(cb) {
    setTimeout(() => cb(_products), 100)
  },
  // 購入を実行した時に処理が成功したか失敗したかをランダムに制御する
  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      Math.random() > 0.5 || navigator.userAgent.indexOf("PhantomJS") > -1
        ? cb()
        : errorCb()
    }, 100)
  }
}
```

### ストアの作成

先に空だった store/index.js を書き換える。

```js
export default createStore({
  state: {
    products: [],
    items: []
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    pushProductToCart(state, product) {
      state.items.push({
        id: product.id,
        quantity: 1
      })
    },
    incrementItemQuantity(state, { id }) {
      const cartItem = state.items.find((item) => item.id === id)
      cartItem.quantity++
    },
    decrementProductIventory(state, { id }) {
      const product = state.products.find((product) => product.id === id)
      product.inventory--
    }
  },
  actions: {
    getAllProducts({ commit }) {
      shop.getProducts((products) => {
        commit("setProducts", products)
      })
    },
    addProductToCart({ state, commit }, product) {
      const cartItem = state.items.find((item) => item.id === product.id)
      if (!cartItem) {
        commit("pushProductToCart", product)
      } else {
        commit("incrementItemQuantity", cartItem)
      }
      commit("decrementProductIventory", product)
    }
  },
  getters: {
    cartProducts: (state) => {
      return state.items.map((item) => {
        const product = state.products.find((product) => product.id === item.id)
        return {
          title: product.title,
          price: product.price,
          quantity: item.quantity
        }
      })
    }
  }
})
```

**mutations**, **actions**など Vuex のメインのキーの他に**getters**というキーがある。
**getters**は以下を目的としている。

- ストアの算出プロパティ（集計、フィルタリングなど）
- ストアへの唯一のアクセスパスとして使う

### 商品リスト components/ProductList.vue

App.vue で読み込まれ最初に表示されるコンポーネント ProductList.vue を Vue3 化する。

```js
<template>
  <ul>
    <li class="products" v-for="product in products" v-bind:key="product.id">
      {{ product.title }} - {{ product.price }}
      <button class="buy-btn" v-on:click="addProductToCart(product)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
export default {
  setup() {
    const store = useStore()
    store.dispatch("getAllProducts")
    return {
      products: computed(() => store.state.products),
      addProductToCart: (product) => store.dispatch("addProductToCart", product)
    }
  }
}
</script>

<style scoped>
.products {
  padding: 5px;
  display: flex;
  justify-content: space-between;
}
</style>
```

上の例では、store を取得したあとに action 関数**getAllProducts**を呼び出している。またボタンが押されたとき、store の action 関数**addProductToCart**を呼び出している。

### ショッピングカート components/ShoppingCart.vue

購買候補リストは store.getters で取得した cartProducts を表示する。

```js
<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!cartProducts.length">
      <i>Please add some products to cart.</i>
    </p>
    <ul>
      <li v-for="product in cartProducts" v-bind:key="product.id">
        {{ product.title }} - {{ product.price }} x {{ product.quantity }}
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
export default {
  setup() {
    const store = useStore()
    return {
      cartProducts: computed(() => store.getters.cartProducts)
    }
  }
}
</script>
```

ここで参考サイトでは、下の例のように computed オプションと getters のユーティリティ関数 mapGetters を使っていた。Composition API では上のようになる。Composition API のときこれが**store.getters**を使うときの標準的な記法になる。

```js
import { mapGetters } from "vuex"
export default {
  computed: mapGetters(["cartProducts"])
}
```

## ストアのモジュール分割

参考サイトでは、理解しやすいよう store/index.js ひとつでストアを構成していた。しかし先に述べたように肥大化しがちなストアを Vuex 本家にならって modules 分割を試みる。

（work in progress）

## 参照

- [Vuex 本家サンプル](https://github.com/vuejs/vuex/tree/4.0/examples/composition)

- [【vue.js】ショッピングカートを作って Vuex を理解](https://reffect.co.jp/vue/vue-js-shopping-cart-example)
