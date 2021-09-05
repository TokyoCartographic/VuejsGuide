import { computed } from "vue"
/**
 * 現在のToDO配列の数を返す
 * @param { Object } items 元になる配列（リアクティブオブジェクト）
 * @return { Object } itemCount （配列数の算出refオブジェクト）
 */
export const todoItemCount = (items) => {
  return computed(() => {
    return items.length
  })
}
