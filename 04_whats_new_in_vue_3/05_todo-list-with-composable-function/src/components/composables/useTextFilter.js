import { ref, computed } from "vue"
/**
 * 配列を入力テキストで絞り込みする機能を提供する
 * @param { Object } items 元になる配列（リアクティブオブジェクト）
 * @param { Function } getItemText
 *   要素からテキストを取り出すためのコールバック関数
 * @return {Object, Object} 抽出用テキスト(refオブジェクト)、抽出された配列(算出refオブジェクト)
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
