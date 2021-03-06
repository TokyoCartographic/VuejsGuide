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

参考サイトでは、理解しやすいよう store/index.js ストアをひとつにまとめていた。しかし先に述べたように、肥大化しがちなストアの分割は今後必須になるため、Vuex 本家にならって **modules**への分割する。ストアの分離はおおむね以下の手順を踏む。

### store/index.js の変更（１）

単独の**index.js**のときは、ストアの定義とオブジェクトの作成がすべてその中で行われたが、vuex の各プロパティ（state, mutations, actions, getters）をカテゴリ別のファイルに分離する（ここでは**products.js**と**cart.js**）。

商品関連のステートデータは**modules/products.js**ファイルに格納する。

```js
import shop from "../../api/shop"

// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllProducts({ commit }) {
    shop.getProducts((products) => {
      commit("setProducts", products)
    })
  }
}

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products
  },
  decrementProductInventory(state, { id }) {
    const product = state.all.find((product) => product.id === id)
    product.inventory--
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
```

すべてを store/index.js ファイルに記述したときと少し異なるところは、各プロパティ（state など）ごとに独立したオブジェクトとしていることだ。（これが単なるオブジェクトの記述法の違いなのかはまだ不詳。追記: テストプログラムを書くときにそれぞれを別個に import してテストが実行できるようにかもしれないな。）
最後に**namespaced**プロパティを**true**にした上で、各プロパティを export する。

ショッピングカート関連のデータは**modules/cart.js**ファイルに格納する。

```js
// initial state
// shape: [{ id, quantity }]
const state = {
  items: [],
  checkoutStatus: null
}

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(
        (product) => product.id === id
      )
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  },
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

// actions
const actions = {
  checkout({ commit, state }, products) {
    const savedCartItems = [...state.items]
    commit("setCheckoutStatus", null)
    // empty cart
    commit("setCartItems", { items: [] })
    shop.buyProducts(
      products,
      () => commit("setCheckoutStatus", "successful"),
      () => {
        commit("setCheckoutStatus", "failed")
        // rollback to the cart saved before sending the request
        commit("setCartItems", { items: savedCartItems })
      }
    )
  },
  addProductToCart({ state, commit }, product) {
    commit("setCheckoutStatus", null)
    if (product.inventory > 0) {
      const cartItem = state.items.find((item) => item.id === product.id)
      if (!cartItem) {
        commit("pushProductToCart", { id: product.id })
      } else {
        commit("incrementItemQuantity", cartItem)
      }
      // remove 1 item from stock
      commit(
        "products/decrementProductInventory",
        { id: product.id },
        { root: true }
      )
    }
  }
}

// mutations
const mutations = {
  pushProductToCart(state, { id }) {
    state.items.push({
      id,
      quantity: 1
    })
  },
  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find((item) => item.id === id)
    cartItem.quantity++
  },
  setCartItems(state, { items }) {
    state.items = items
  },
  setCheckoutStatus(state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
```

このソースで見慣れないところは、**getters** プロパティの各引数が **state** だけでなく、**getters** や **rootState** が渡されているところだ。これが Vuex4 の新機能かな（要[ドキュメント](https://next.vuex.vuejs.org/ja/guide/getters.html#%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9)チェック）？また各機能の実装が少し高度になっているので難解な感じだ。
最後にこちらも products.js 同様に各プロパティを個別に export している。

### store/index.js の変更 （２）

次に分割して作成したストアデータを使用するように**index.js**を修正する。

```js
import { createStore, createLogger } from "vuex"
import cart from "./modules/cart"
import products from "./modules/products"
export default createStore({
  modules: {
    cart,
    products
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [createLogger()]
})
```

こちらはすっきりと整理された。

### コンポーネントからのアクセス

クライアントコンポーネントから複数のモジュールに分割された vuex の**action**関数、**getters**プロパティへの参照はシングルストアのときとはすこし異なる。
store/index.js の**modules**に設定したキーを action 関数名、getters プロパティの前に付けて呼び出す（参照する）必要がある。components フォルダの SFC ソースは modules 対応に変更済になっている。

#### **■ vuex のステートデータの参照**

以前はすべて getters 経由で行っていたが、getters の設定なしで取得する場合

```js
const all = computed(() => store.state.products.all)
```

これはモジュール products の all プロパティを取得している。

#### **■ Action**

```js
store.dispatch("products/getAllProducts")
```

これはモジュール products のアクション関数 getAllProducts を"**products/getAllProducts**"をアクション名として呼び出している。

#### **■ getters**

getters にストアの computed 的役割をもたせて設定されたもの

```js
const cartProducts = computed(() => store.getters["cart/cartProducts"])
```

こちらはモジュール cart のプロパティ cartProducts を"**cart/cartProducts**"をキー名として取得している。

## 参照

- [Vuex 本家サンプル](https://github.com/vuejs/vuex/tree/4.0/examples/composition)

- [【vue.js】ショッピングカートを作って Vuex を理解](https://reffect.co.jp/vue/vue-js-shopping-cart-example)

- [JavaScript ES6（ECMAScript 2015）で追加された機能](https://www.webdesignleaves.com/pr/jquery/javaascript_02.html)
