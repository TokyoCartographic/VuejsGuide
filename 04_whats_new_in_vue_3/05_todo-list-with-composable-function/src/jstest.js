// ES6分割代入のテスト

const person = { name: "Natsumi" } // 元データ

// personName変数にperson.nameを代入
let { name: personName } = person
console.log(personName)

// personオブジェクトをnewPersonオブジェクトに代入
const { person: newPerson2 } = { person }
console.log(newPerson2.name)
/*
// 上の奇妙なやりかたを止めるとどうなるか
let { newPerson3 } = { person }
console.log("newPerson3.name: " + newPerson3.name)
*/
