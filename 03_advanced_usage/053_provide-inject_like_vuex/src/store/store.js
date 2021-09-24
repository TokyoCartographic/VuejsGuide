import { computed, inject, provide, reactive } from "vue";
/**
 * storeを初期化しprovideする
 */
export const initStore = () => {
  // State
  const state = reactive({
    count: 0
  })
  // Getters
  const getCount = computed(() => state.count);
  // Actions
  const updateCount = () => {
    state.count++
  }
  // Provides
  provide("getCount", getCount) // 算出refオブジェクト
  provide("updateCount", updateCount) // 関数
}

/**
 * injectされた値をもつオブジェクトを返す
 * @return {Object} object
 */
export const useStore = () => ({
  getCount: inject("getCount"),
  updateCount: inject("updateCount")
})