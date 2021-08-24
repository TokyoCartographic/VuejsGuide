import { reactive, computed } from 'vue'
// リアクティブなオブジェクト
const state = reactive({ num: 1 })
// state.num の3倍の数を持つ算出refオブジェクト
const tripleNum = computed(() => state.num * 3)

console.log(state.num) // 1 が出力される
console.log(tripleNum.value) // 3 が出力される

// state.num の値を変更する
state.num = 5
console.log(tripleNum.value) // 15 が出力される
