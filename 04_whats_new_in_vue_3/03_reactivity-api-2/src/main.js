import { ref, computed } from 'vue'
const num = ref(1)
// num.value の3倍の数を持つ算出refオブジェクト
const tripleNum = computed(() => num.value * 3)

console.log(num.value) // 1 が出力される
console.log(tripleNum.value) // 3 が出力される

// num の値を変更する
num.value  = 5
console.log(tripleNum.value) // 15 が出力される
