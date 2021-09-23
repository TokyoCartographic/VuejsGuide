import { computed, inject, provide, reactive } from "vue";

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
  provide("getCount", getCount);
  provide("updateCount", updateCount);
}

export const useStore = () => ({
  getCount: inject("getCount"),
  updateCount: inject("updateCount")
});