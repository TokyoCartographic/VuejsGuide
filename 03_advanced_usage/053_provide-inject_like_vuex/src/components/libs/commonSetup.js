import { computed } from "vue"
import { useStore } from "../../store/store.js"
/**
 * 共通初期化
 * @returns {Object} object & function
 * @desc 各コンポーネント（親、子、孫）のsetupが同じ内容であるため集約
 */
export const commonSetup = () => {
  const store = useStore()
  const count = computed(() => store.getCount.value)
  const updateCount = () => {
    store.updateCount()
  }
  return {
    count,
    updateCount
  }
}
