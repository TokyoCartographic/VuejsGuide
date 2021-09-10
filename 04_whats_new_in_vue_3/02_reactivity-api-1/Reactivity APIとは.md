# Reactivity API とは

**Vue** には、当初からリアクティブのしくみが組み込まれていた。**Vue3** では、リアクティブを管理するプログラムが **Reactivity API** として切り出された。Composition API を使ってコンポーネントを記述するときには、この Reactivity API を使用する必要がある。以下のものが主に使われる。

## reactive

**reactive**関数は、オブジェクトや配列をリアクティブ性をもつオブジェクト（**リアクティブオブジェクト**）に変換する。リアクティブオブジェクトの参照は通常のオブジェクト・配列と同じだ。

```js
import { reactive } from "vue"
const state = reactive({ num: 1 })
console.log(state.num)
```

## computed

**computed**関数は、算出値をリアクティブな状態で参照できるオブジェクト（**算出 ref オブジェクト**）に変換する。
ref 算出オブジェクトの値は".value"で参照する。

```js
import { computed } from "vue"
const tripleNum = computed(() => state.num * 3)
console.log(tripleNum.value)
```

computed 関数の引数は算出処理を行う無名関数となることが多い。

## ref

**ref**関数は、オブジェクト以外のプリミティブ値（文字列、数値、真偽値）をリアクティブ性を持つオブジェクト（**ref オブジェクト**）に変換する。
ref オブジェクトの値は".value"で参照する。

```js
import { ref } from "vue"
const num = ref(1)
console.log(num.value)
```

## isRef

**isRef**は、引数が ref オブジェクトかチェックする。

```js
const robj = ref("A")
console.log(isRef(robj)) // true
```

## toRefs

**toRefs**は、引数のリアクティブオブジェクトを、そのプロパティが ref オブジェクトに変換された通常のオブジェクトに変換する。

```js
const state = reactive({
  foo: 1
})

const stateAsRefs = toRefs(state)
console.log(isRef(stateAsRefs.foo)) // true
```

以上
