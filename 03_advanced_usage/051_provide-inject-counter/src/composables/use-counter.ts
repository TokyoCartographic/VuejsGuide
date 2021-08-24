import { reactive } from "vue"

export default function useCounter() {
  // 状態
  const state = reactive<{
    count: number
  }>({
    count: 0
  })

  // ロジック
  const increment = () => state.count++
  const decrement = () => state.count--

  return {
    state,
    increment,
    decrement
  }
}

// 追加
export type CounterStore = ReturnType<typeof useCounter>
