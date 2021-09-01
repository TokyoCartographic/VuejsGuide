import { ref, computed } from "vue"
/**
 * 配列を入力テキストで絞り込みする機能を提供する
 * @param { Array } items 元になる配列
 * @param { Function } getItemText
 *   要素からテキストを取り出すためのコールバック関数
 * @return {String, Array} 抽出用テキスト、抽出された配列
 */
export const useTextFilter = (items, getItemText) => {
  const filterValue = ref('')
  const filteredItems = computed(() => {
    if (!filterValue.value) {
      return items
    }
    return items.filter(item => getItemText(item)
      .includes(filterValue.value))
  })
  return { filterValue, filteredItems }
}
