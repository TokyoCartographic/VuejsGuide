# ToDoList を CompositionAPI+関数で書き直す

ToDoList から、再利用可能な機能（ここでは ToDo リストの絞り込み機能）を抽出し分離する。
これもリファクタリングの次の一歩といえる。

## 分離した関数モジュール

```js
import { ref, computed } from "vue"
/**
 * 配列を入力テキストで絞り込みする機能を提供する
 * @param { Array } items 元になる配列
 * @param { Function } getItemText 要素からテキストを取り出すためのコールバック関数
 * @return {String, Array} 抽出用テキスト、抽出されたref算出オブジェクト（配列）
 */
export const useTextFilter = (items, getItemText) => {
  const filterValue = ref("")
  const filteredItems = computed(() => {
    if (!filterValue.value) {
      return items
    }
    return items.filter((item) => getItemText(item).includes(filterValue.value))
  })
  return { filterValue, filteredItems }
}
```

## コンポーネントでの利用

ToDoList コンポーネントでは外部関数を以下のように利用する。

```js
import { useTextFilter } from "./composables/useTextFilter.js"

export default {
  setup() {
    // ToDoリストの絞り込み関連の定義
    const { filterValue, filteredItems: filteredTodoItems } = useTextFilter(
      todoItems, // ToDo配列
      (todo) => todo.text // コールバック関数（todo.textを返す）
    )
    return {
      inputValue,
      filterValue,
      filteredTodoItems,
      handleClick
    }
  }
}
```

外部関数 useTextFilter とコンポーネント ToDoList の setup 内の動きの正確な関連がよく理解できないなあ。

以上
