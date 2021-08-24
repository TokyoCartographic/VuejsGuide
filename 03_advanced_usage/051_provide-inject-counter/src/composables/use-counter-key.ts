import { InjectionKey } from "vue"
import { CounterStore } from "./use-counter"

const CounterKey: InjectionKey<CounterStore> = Symbol("CounterStore")
export default CounterKey
