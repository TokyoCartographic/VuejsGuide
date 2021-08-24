<template>
  <CounterProvider>
    <CountUp />
    <RenderCount />
  </CounterProvider>
</template>
<script>
import CounterProvider from "./CounterProvider.vue"
import CountUp from "./CountUp.vue"
import RenderCount from "./RenderCount.vue"
export default {
  components: {
    CounterProvider,
    CountUp,
    RenderCount
  }
}
</script>