import { computed } from "vue"
/**
 * 現在のToDO配列の数を返す
 * @param { Array } items 元になる配列
 * @return {Number} itemCount 配列数refオブジェクト
 */
export const todoItemCount = (items) => {
  return computed(() => {
    return items.length
  })
}
